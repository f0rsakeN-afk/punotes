export const courseData = {
  branches: [
    {
      id: "cse",
      name: "Computer Science & Engineering",
      shortName: "CSE",
      semesters: [
        {
          id: "cse-sem1",
          number: 1,
          subjects: [
            {
              id: "cse101",
              name: "Engineering Mathematics I",
              code: "MTH 101",
              credits: 3,
              notes: [
                {
                  id: "mth101-1",
                  title: "Unit 1: Matrices and Determinants",
                  description:
                    "Complete notes covering matrices, determinants, and their applications",
                  fileUrl: "/files/mth101-unit1.pdf",
                  uploadDate: "2024-01-15",
                  fileType: "pdf",
                  fileSize: "2.5 MB",
                },
                {
                  id: "mth101-2",
                  title: "Unit 2: Calculus",
                  description: "Differential and integral calculus notes",
                  fileUrl: "/files/mth101-unit2.pdf",
                  uploadDate: "2024-01-16",
                  fileType: "pdf",
                  fileSize: "3.0 MB",
                },
              ],
            },
            {
              id: "cse102",
              name: "Physics",
              code: "PHY 101",
              credits: 4,
              notes: [
                {
                  id: "phy101-1",
                  title: "Mechanics Complete Notes",
                  description: "Comprehensive notes on classical mechanics",
                  fileUrl: "/files/phy101-mechanics.pdf",
                  uploadDate: "2024-01-17",
                  fileType: "pdf",
                  fileSize: "4.2 MB",
                },
              ],
            },
            {
              id: "cse103",
              name: "Basic Electrical Engineering",
              code: "ELE 101",
              credits: 3,
              notes: [
                {
                  id: "ele101-1",
                  title: "DC Circuits",
                  description: "Basic concepts of DC circuits",
                  fileUrl: "/files/ele101-dc.pdf",
                  uploadDate: "2024-01-18",
                  fileType: "pdf",
                  fileSize: "2.8 MB",
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
              id: "cse201",
              name: "Engineering Mathematics II",
              code: "MTH 201",
              credits: 3,
              notes: [
                {
                  id: "mth201-1",
                  title: "Differential Equations",
                  description: "Complete notes on differential equations",
                  fileUrl: "/files/mth201-diff.pdf",
                  uploadDate: "2024-01-19",
                  fileType: "pdf",
                  fileSize: "3.5 MB",
                },
              ],
            },
            {
              id: "cse202",
              name: "Programming in C",
              code: "CSE 201",
              credits: 4,
              notes: [
                {
                  id: "cse201-1",
                  title: "C Programming Basics",
                  description: "Introduction to C programming",
                  fileUrl: "/files/cse201-intro.pdf",
                  uploadDate: "2024-01-20",
                  fileType: "pdf",
                  fileSize: "2.9 MB",
                },
              ],
            },
          ],
        },
        // ... Continue with semesters 3-8 for CSE
      ],
    },
    {
      id: "civil",
      name: "Civil Engineering",
      shortName: "CE",
      semesters: [
        {
          id: "civil-sem1",
          number: 1,
          subjects: [
            {
              id: "ce101",
              name: "Engineering Drawing",
              code: "DRW 101",
              credits: 3,
              notes: [
                {
                  id: "drw101-1",
                  title: "Basic Drawing Techniques",
                  description: "Introduction to engineering drawing",
                  fileUrl: "/files/drw101-basics.pdf",
                  uploadDate: "2024-01-21",
                  fileType: "pdf",
                  fileSize: "5.0 MB",
                },
              ],
            },
          ],
        },
        // ... Continue with other semesters
      ],
    },
    // ... Continue with Electronics branch
  ],
};
