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
  uploaded_at:Date;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export interface PDFTypes {
  id: string;
  name: string;
  shortName: string;
  semesters: {
    id: string;
    name: string;
    code: string;
    credit: number;
    notes: {
      id: string;
      title: string;
      description: string;
      fileUrl: string;
      uploadDate: Date;
      fileType: string;
      fileSize: string;
      downloads: number;
    }[];
  }[];
}
