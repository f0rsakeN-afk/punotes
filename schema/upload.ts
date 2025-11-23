import { z } from "zod";

export const BranchEnum = z.enum([
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "BCA",
  "BIT",
]);

export const syllabusSchema = z.object({
  semester: z.string(),
  branch: BranchEnum,
  fileSize: z.string(),
  url: z.url("Invalid URL"),
});

export const pyqSchema = z.object({
  semester: z.string(),
  year: z.string().regex(/^\d{4}$/, "Year must be a valid 4-digit year"),
  branch: BranchEnum,
  fileSize: z.string(),
  url: z.url("Invalid URL"),
});

export const notesSchema = z.object({
  semester: z.string(),
  branch: BranchEnum,
  fileSize: z.string(),
  url: z.url("Invalid URL"),
  subject: z.string(),
});

export type NotesInput = z.infer<typeof notesSchema>;
export type SyllabusInput = z.infer<typeof syllabusSchema>;
export type PyqInput = z.infer<typeof pyqSchema>;
