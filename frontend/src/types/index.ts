export interface AssignMentTypes {
  title: string;
  subject: string;
  url: string;
  id: number;
  uploaded_at: Date;
}

export interface PYQTypes {
  id: number;
  title: string;
  url: string;
  uploaded_at: Date;
}

export interface TeamMember {
  name: string;
  role?: string;
  image: string;
  linkedin: string;
  github?: string;
}

export enum FileType {
  Image = "image",
  PDF = "pdf",
  PPTX = "pptx",
  DOCX = "docx",
}

export interface noteTypes {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  uploadDate: string;
  fileType?: FileType;
  fileSize?: string;
}

export interface subjectTypes {
  id: string;
  name: string;
  code: string;
  credits: number;
  notes: noteTypes[];
}

export interface semesterTypes {
  id: string;
  number: number;
  subjects: subjectTypes[];
}

export interface PDFTypes {
  id: string;
  name: string;
  shortName: string;
  semesters: semesterTypes[];
}

export interface SyllabusTypes {
  id: number;
  name: string;
  branch: string;
  url: string;
}
