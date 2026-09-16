import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cacheGet, cacheSet, buildCacheKey } from "@/lib/cache";
import { rateLimiters } from "@/lib/rateLimit";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";
import { z } from "zod";

interface SearchResult {
  type: "NOTES" | "SYLLABUS" | "PYQ";
  id: string;
  title: string;
  branch: string;
  semester: string;
  url: string;
  createdAt: string;
  subject?: string;
}

export async function GET(req: NextRequest) {
  try {
    // Rate limit: 60 requests per minute (abuse protection for a public endpoint)
    const rateLimit = await rateLimiters.lenient(req);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMITED },
        { status: 429, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.reset) } }
      );
    }

    // Public endpoint — results contain only public listing data.
    // No auth check: every keystroke used to pay a Stack verification roundtrip.

    const { searchParams } = new URL(req.url);
    const rawQ = searchParams.get("q") || "";
    // Zod validation for search query
    const querySchema = z.string().min(2).max(100).regex(/^[^<>]*$/, "Invalid query");
    const queryResult = querySchema.safeParse(rawQ.trim());
    if (!queryResult.success) {
      return NextResponse.json({ results: [], message: "Query too short or invalid" });
    }
    const query = queryResult.data.toLowerCase().trim();

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [], message: "Query too short" });
    }

    // Normalized cache key (lowercase)
    const normalizedQuery = query.toLowerCase();
    const queryCacheKey = buildCacheKey("search:query", normalizedQuery);

    // Try query-specific cache first
    const queryCached = await cacheGet<SearchResult[]>(queryCacheKey);
    if (queryCached) {
      return NextResponse.json(
        { results: queryCached, total: queryCached.length, cached: true },
        { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
      );
    }

    // Push filter to DB with index-aware contains (insensitive) and limit 20
    const [notes, syllabus, pyqs] = await Promise.all([
      prisma.notes.findMany({
        where: {
          OR: [
            { name: { contains: normalizedQuery, mode: "insensitive" } },
            { subject: { contains: normalizedQuery, mode: "insensitive" } },
            { branch: { contains: normalizedQuery, mode: "insensitive" } },
          ],
        },
        select: { id: true, name: true, subject: true, branch: true, semester: true, url: true, createdAt: true },
        take: 20,
      }),
      prisma.syllabus.findMany({
        where: {
          OR: [
            { branch: { contains: normalizedQuery, mode: "insensitive" } },
            { semester: { contains: normalizedQuery, mode: "insensitive" } },
          ],
        },
        select: { id: true, branch: true, semester: true, url: true, createdAt: true, fileSize: true },
        take: 20,
      }),
      prisma.pYQ.findMany({
        where: {
          OR: [
            { branch: { contains: normalizedQuery, mode: "insensitive" } },
            { year: { contains: normalizedQuery, mode: "insensitive" } },
            { semester: { contains: normalizedQuery, mode: "insensitive" } },
          ],
        },
        select: { id: true, branch: true, semester: true, url: true, createdAt: true, year: true },
        take: 20,
      }),
    ]);

    const results: SearchResult[] = [
      ...notes.map((n) => ({ type: "NOTES" as const, id: n.id, title: n.name, subject: n.subject, branch: n.branch, semester: n.semester, url: n.url, createdAt: n.createdAt.toISOString() })),
      ...syllabus.map((s) => ({ type: "SYLLABUS" as const, id: s.id, title: `Syllabus - ${s.branch} - Sem ${s.semester}`, branch: s.branch, semester: s.semester, url: s.url, createdAt: s.createdAt.toISOString() })),
      ...pyqs.map((p) => ({ type: "PYQ" as const, id: p.id, title: `PYQ - ${p.branch} - ${p.year}`, branch: p.branch, semester: p.semester, url: p.url, createdAt: p.createdAt.toISOString() })),
    ].slice(0, 20);
    const limitedResults = results;

    // Cache this specific query result for 10 minutes
    await cacheSet(queryCacheKey, limitedResults, { expire: 600 });

    return NextResponse.json(
      { results: limitedResults, total: results.length, cached: false },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
    );
  } catch (error) {
    console.error("Search error:", sanitizeError(error));
    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}
