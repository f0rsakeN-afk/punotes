import { z } from "zod";

export const BranchEnum = z.enum([
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "BCA",
  "BIT",
]);

const allowedUrlHosts = ["https://drive.google.com/", "https://ik.imagekit.io/"];

export const syllabusSchema = z.object({
  semester: z.string().min(1).max(20),
  branch: BranchEnum,
  fileSize: z.string().min(1).max(20),
  url: z.url("Invalid URL").refine(
    (u) => allowedUrlHosts.some((h) => u.startsWith(h)),
    "Invalid host: only Google Drive and ImageKit allowed"
  ),
});

export const pyqSchema = z.object({
  semester: z.string().min(1).max(20),
  year: z.string().regex(/^\d{4}$/, "Year must be a valid 4-digit year"),
  branch: BranchEnum,
  fileSize: z.string().min(1).max(20),
  url: z.url("Invalid URL").refine(
    (u) => allowedUrlHosts.some((h) => u.startsWith(h)),
    "Invalid host"
  ),
});

export const notesSchema = z.object({
  semester: z.string().min(1).max(20),
  branch: BranchEnum,
  fileSize: z.string().min(1).max(20),
  name: z.string().min(1).max(200),
  url: z.url("Invalid URL").refine(
    (u) => allowedUrlHosts.some((h) => u.startsWith(h)),
    "Invalid host"
  ),
  subject: z.string().min(1).max(100),
});

export const readmeSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000),
  branch: BranchEnum,
  semester: z.string().min(1).max(20),
});

export type NotesInput = z.infer<typeof notesSchema>;
export type SyllabusInput = z.infer<typeof syllabusSchema>;
export type PyqInput = z.infer<typeof pyqSchema>;
export type ReadmeInput = z.infer<typeof readmeSchema>;
