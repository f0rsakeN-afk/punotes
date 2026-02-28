import { MetadataRoute } from "next";

const BASE_URL = "https://punotes.vercel.app";

const branches = [
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "BCA",
  "BIT",
];

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/pdfs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/syllabus`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pyqs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const branchRoutes: MetadataRoute.Sitemap = branches.map((branch) => ({
    url: `${BASE_URL}/pdfs/${encodeURIComponent(branch)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const semesterRoutes: MetadataRoute.Sitemap = branches.flatMap((branch) =>
    semesters.map((sem) => ({
      url: `${BASE_URL}/pdfs/${encodeURIComponent(branch)}/${sem}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...branchRoutes, ...semesterRoutes];
}
