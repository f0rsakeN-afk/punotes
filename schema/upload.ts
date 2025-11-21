import { z } from "zod";

export const BranchEnum = z.enum([
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "BCA",
  "BIT",
]);

export const SemesterEnum = z
  .enum(["1", "2", "3", "4", "5", "6", "7", "8"])
  .transform(Number);

export const syllabusSchema = z.object({
  semester: SemesterEnum,
  branch: BranchEnum,
  fileSize: z.string().min(1, "File size is required"),
  url: z.url("Invalid URL"),
});

export const pyqSchema = z.object({
  semester: SemesterEnum,
  year: z.string().regex(/^\d{4}$/, "Year must be a valid 4-digit year"),
  branch: BranchEnum,
  fileSize: z.string().min(1, "File size is required"),
  url: z.url("Invalid URL"),
});

export type SyllabusInput = z.infer<typeof syllabusSchema>;
export type PyqInput = z.infer<typeof pyqSchema>;
