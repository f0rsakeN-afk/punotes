import { ArrowLeft, Calendar, Github, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "f0rsaken-afk";
const GITHUB_REPO = process.env.GITHUB_REPO || "punotes-content";

async function getReadmeData(slug: string) {
    const readme = await prisma.readme.findUnique({
        where: { slug },
    });

    if (!readme) return null;

    try {
        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${readme.githubPath}`;
        const resp = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3.raw",
            },
        });
        return {
            ...readme,
            content: resp.data,
        };
    } catch (error) {
        console.error("Error fetching readme from GitHub:", error);
        return null;
    }
}

export default async function ReadmePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getReadmeData(slug);

    if (!data) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
            <Link href="javascript:history.back()">
                <Button variant="ghost" className="mb-8 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Notes
                </Button>
            </Link>

            <MotionHeader className="space-y-6 mb-12">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{data.branch}</Badge>
                    <Badge variant="outline">Semester {data.semester}</Badge>
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
                    {data.title}
                </h1>

                <div className="flex items-center gap-6 text-sm text-muted-foreground border-y py-4 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>By PuNotes Admin</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        <span>Stored on GitHub</span>
                    </div>
                </div>
            </MotionHeader>

            <div className="prose prose-slate dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-a:text-primary prose-img:rounded-3xl max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {data.content}
                </ReactMarkdown>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-sm text-muted-foreground italic">
                    Found an error? Let us know or contribute to the repo.
                </p>
            </div>
        </div>
    );
}

// Minimal motion wrapper for RSC
function MotionHeader({ children, className }: any) {
    return <div className={className}>{children}</div>
}
