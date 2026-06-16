import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/handler/",
          "/admin/",
          "/submissions",
          "/upload",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/handler/",
          "/admin/",
          "/submissions",
          "/upload",
        ],
      },
    ],
    sitemap: "https://punotes.vercel.app/sitemap.xml",
    host: "https://punotes.vercel.app",
  };
}