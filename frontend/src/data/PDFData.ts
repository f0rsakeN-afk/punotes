import { PDFTypes } from "@/types";

export const PDFData: PDFTypes[] = [
  {
    id: "computer",
    name: "Computer Engineering",
    shortName: "CSE",
    semesters: [
      {
        id: "cse-sem1",
        number: 1,
        subjects: [
          {
            id: "mth101",
            name: "Engineering Mathematics I",
            code: "MTH 101",
            credits: 3,
            notes: [
              {
                id: "mth101-1",
                title: "Matrices and Determinants",
                description:
                  "Complete chapter notes covering matrices, determinants, and their applications in engineering",
                fileUrl: "/files/mth101-matrices.pdf",
                uploadDate: "2024-01-15",
                fileType: "pdf",
                fileSize: "2.5 MB",
              },
              {
                id: "mth101-2",
                title: "Differential Calculus",
                description:
                  "Comprehensive notes on differentiation, applications, and solved examples",
                fileUrl: "/files/mth101-calculus.pdf",
                uploadDate: "2024-01-16",
                fileType: "pdf",
                fileSize: "3.1 MB",
              },
            ],
          },
          {
            id: "phy101",
            name: "Engineering Physics",
            code: "PHY 101",
            credits: 4,
            notes: [
              {
                id: "phy101-1",
                title: "Mechanics and Waves",
                description:
                  "Detailed notes on mechanical waves and oscillations",
                fileUrl: "/files/phy101-mechanics.pdf",
                uploadDate: "2024-01-17",
                fileType: "pdf",
                fileSize: "4.2 MB",
              },
              {
                id: "phy101-2",
                title: "Optics and Modern Physics",
                description:
                  "Complete notes on optical phenomena and modern physics concepts",
                fileUrl: "/files/phy101-optics.pdf",
                uploadDate: "2024-01-18",
                fileType: "pdf",
                fileSize: "3.8 MB",
              },
            ],
          },
          {
            id: "chem101",
            name: "Engineering Chemistry",
            code: "CHEM 101",
            credits: 3,
            notes: [
              {
                id: "chem101-1",
                title: "Atomic Structure and Bonding",
                description:
                  "Fundamental concepts of atomic structure and chemical bonding",
                fileUrl: "/files/chem101-atomic.pdf",
                uploadDate: "2024-01-19",
                fileType: "pdf",
                fileSize: "2.9 MB",
              },
            ],
          },
        ],
      },
      {
        id: "cse-sem2",
        number: 2,
        subjects: [
          {
            id: "mth201",
            name: "Engineering Mathematics II",
            code: "MTH 201",
            credits: 3,
            notes: [
              {
                id: "mth201-1",
                title: "Multiple Integrals",
                description:
                  "Comprehensive guide to double and triple integrals",
                fileUrl: "/files/mth201-integrals.pdf",
                uploadDate: "2024-01-20",
                fileType: "pdf",
                fileSize: "3.5 MB",
              },
              {
                id: "mth201-2",
                title: "Differential Equations",
                description:
                  "Complete notes on ordinary differential equations",
                fileUrl: "/files/mth201-diff-eq.pdf",
                uploadDate: "2024-01-21",
                fileType: "pdf",
                fileSize: "4.0 MB",
              },
            ],
          },
          {
            id: "cse202",
            name: "Digital Logic",
            code: "CSE 202",
            credits: 3,
            notes: [
              {
                id: "cse202-1",
                title: "Boolean Algebra",
                description: "Fundamentals of boolean algebra and logic gates",
                fileUrl: "/files/cse202-boolean.pdf",
                uploadDate: "2024-01-22",
                fileType: "pdf",
                fileSize: "2.8 MB",
              },
              {
                id: "cse202-2",
                title: "Sequential Circuits",
                description:
                  "Design and analysis of sequential digital circuits",
                fileUrl: "/files/cse202-sequential.pdf",
                uploadDate: "2024-01-23",
                fileType: "pdf",
                fileSize: "3.2 MB",
              },
            ],
          },
        ],
      },
      {
        id: "cse-sem3",
        number: 3,
        subjects: [
          {
            id: "cse301",
            name: "Data Structures",
            code: "CSE 301",
            credits: 4,
            notes: [
              {
                id: "cse301-1",
                title: "Arrays and Linked Lists",
                description:
                  "Implementation and operations on basic data structures",
                fileUrl: "/files/cse301-arrays.pdf",
                uploadDate: "2024-01-24",
                fileType: "pdf",
                fileSize: "3.7 MB",
              },
              {
                id: "cse301-2",
                title: "Trees and Graphs",
                description: "Advanced data structures and their applications",
                fileUrl: "/files/cse301-trees.pdf",
                uploadDate: "2024-01-25",
                fileType: "pdf",
                fileSize: "4.1 MB",
              },
            ],
          },
          {
            id: "cse302",
            name: "Computer Architecture",
            code: "CSE 302",
            credits: 3,
            notes: [
              {
                id: "cse302-1",
                title: "Processor Design",
                description: "CPU architecture and instruction set design",
                fileUrl: "/files/cse302-cpu.pdf",
                uploadDate: "2024-01-26",
                fileType: "pdf",
                fileSize: "3.9 MB",
              },
            ],
          },
        ],
      },
    ],
  },
];
