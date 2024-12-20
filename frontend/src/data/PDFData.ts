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
            id: "BSH 1001",
            name: "Mathematics I",
            code: "BSH 1001",
            credits: 3,
            notes: [],
          },
          {
            id: "BSH 1004",
            name: "Engineering Physics",
            code: "BSH 1004",
            credits: 4,
            notes: [],
          },
          {
            id: "BSH 1002",
            name: "English",
            code: "BSH 1002",
            credits: 4,
            notes: [],
          },
          {
            id: "BCE 1002",
            name: "FCT",
            code: "BCE 1002",
            credits: 3,
            notes: [],
          },
          {
            id: "BCE 1001",
            name: "Computer Programming",
            code: "BCE 1001",
            credits: 3,
            notes: [
              {
                id: "BCE-1001-note1",
                title: "Practice set",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1JFjgO3wNTdAA0VkaoA27vJB15jUVUNqr/view?usp=drive_link",
                fileType: "pdf",
                fileSize: "73.3KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note2",
                title: "C Quiz",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1kpFiWM7UKnnLa3tCzazDCsb7aiNqhxcW/view?usp=drive_link",
                fileType: "pdf",
                fileSize: "101.3KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note3",
                title: "C storage classes",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1v6Ale7P8TKw2EndXFVC94DmEyi41Ssgz/view?usp=drive_link",
                fileType: "pdf",
                fileSize: "49.9KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note4",
                title: "Chapter-1",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1LwHQgWEa4k2iWAvahkY3X_64jUQlE_m1/view?usp=drive_link",
                fileType: "pdf",
                fileSize: "160.7KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note5",
                title: "Chapter-2",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1czfXmxlTqZGjXroU1jfGdtDw15AMPGo8/view?usp=drive_link",
                fileType: "pdf",
                fileSize: "208.2KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note6",
                title: "Chapter-3",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1i-k75LtNB-eDQSHz_iW1JFwFro7UU6QD/view?usp=drive_link",
                fileType: "pdf",
                fileSize: "1MB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note7",
                title: "Recursion",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1Kai2SnqCwEV_cRfhPp-l45SyN4aIg8VZ/view?usp=drive_link",
                fileType: "pdf",
                fileSize: "30.9KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note8",
                title: "C video ref",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1VXFrZYCQLNhpWr4lqD-2N56GWwJA0WSD/view?usp=drive_link",
                fileType: "pdf",
                fileSize: "286.6KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note9",
                title: "Array",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1C5f7L-yAYBusi0YTgfx486sfuuOAoGiY/view?usp=drive_link",
                fileType: "pdf",
                fileSize: "73.3KB",
                uploadDate: "2024-12-20",
              },
            ],
          },
          {
            id: "BME 1001",
            name: "Engineering Drawing",
            code: "BME 1001",
            credits: 3,
            notes: [],
          },
          {
            id: "BME 1002",
            name: "Workshop Practice",
            code: "BME 1002",
            credits: 2,
            notes: [],
          },
        ],
      },
      /* ************************************************************ */
      {
        id: "cse-sem2",
        number: 2,
        subjects: [
          {
            id: "mth201",
            name: "Mathematics II",
            code: "MTH 201",
            credits: 3,
            notes: [],
          },
          {
            id: "cse202",
            name: "Digital Logic",
            code: "CSE 202",
            credits: 3,
            notes: [],
          },
          {
            id: "cse203",
            name: "Chemistry",
            code: "CSE 203",
            credits: 3,
            notes: [],
          },
          {
            id: "cse204",
            name: "OOP with C++",
            code: "CSE 204",
            credits: 3,
            notes: [],
          },
          {
            id: "cse205",
            name: "Basic Electrical Engineering",
            code: "CSE 205",
            credits: 3,
            notes: [],
          },
          {
            id: "cse206",
            name: "Applied Mechanics",
            code: "CSE 206",
            credits: 3,
            notes: [],
          },
        ],
      },
      /* ************************************************************ */
      {
        id: "cse-sem3",
        number: 3,
        subjects: [
          {
            id: "mth301",
            name: "Mathematics III",
            code: "MTH 301",
            credits: 3,
            notes: [],
          },
          {
            id: "mth301",
            name: "Computer Graphics",
            code: "MTH 301",
            credits: 3,
            notes: [],
          },
          {
            id: "mth301",
            name: "Applied Sociology",
            code: "MTH 301",
            credits: 3,
            notes: [
              {
                id: "1",
                title: "Introduction to emotional intelligence",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1IsB0Tk2mS-O38xWnu49fS2jxwHAlhKMq/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "4MB",
                fileType: "pdf",
              },
              {
                id: "2",
                title: "Past questions of AS",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1Dq8YyBZ93bmLcuyQBFBvz7KqNZG1Pz8j/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "969.1KB",
                fileType: "pdf",
              },
              {
                id: "3",
                title: "AS notes(BE Comp)",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1KLShHa4J_8THO-9MGsC9MdT3aptH4cyx/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "592.5KB",
                fileType: "pdf",
              },
              {
                id: "4",
                title: "AS full notes",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1d6PGevhwbW1FnygI1ARC-NYkkU_ysVZi/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "6.8MB",
                fileType: "pdf",
              },
              {
                id: "5",
                title: "Modernization",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/14ITgu5-A-ttK6jA9CjLF69K5YXvKQPTf/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "1.9MB",
                fileType: "pdf",
              },
              {
                id: "6",
                title: "Sociology notes",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1kfcsor9S5V913E9Pdmk_51t7oOPXHsx6/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "650.5KB",
                fileType: "pdf",
              },
              {
                id: "7",
                title: "Sociology 1-3",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1LsJ3zRaWo_3FboGqBb_SbueqGGz6fuQC/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "592.5KB",
                fileType: "pdf",
              },
              {
                id: "8",
                title: "Consise sociology notes",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1zxIZFIuIZvKsthIMtdhYWg08zqaKesqV/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "6.3MB",
                fileType: "pdf",
              },
            ],
          },
          {
            id: "mth301",
            name: "Electronic Devices and Circuits",
            code: "MTH 301",
            credits: 3,
            notes: [],
          },
          {
            id: "mth301",
            name: "DSA",
            code: "MTH 301",
            credits: 3,
            notes: [
              {
                id: "1",
                title: "Unit-2 Stack",
                description: "Stack Inplementation",
                fileUrl:
                  "https://docs.google.com/presentation/d/1lKeZhcBKzUw5ILyd3QV-c3tC6W2P6AW3/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: "pptx",
                fileSize: "1MB",
                uploadDate: "2024-12-20",
              },
              {
                id: "1",
                title: "Unit-3 Queue",
                description: "queue implementation",
                fileUrl:
                  "https://docs.google.com/presentation/d/1gHFFxWqGQzuUlz2rIyuB6zqeLIXOLaao/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: "pptx",
                fileSize: "521.2KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "1",
                title: "Unit-5 Linked List",
                description: "Linked list implementation",
                fileUrl:
                  "https://docs.google.com/presentation/d/1sR6E6L2UIQ55-xu70jPoC3FzWDztc_dX/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: "pptx",
                fileSize: "286.3KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "1",
                title: "Unit-6 Trees-I",
                description: "",
                fileUrl:
                  "https://docs.google.com/presentation/d/1ZU8d6X_uprlzWSNGw5QFotyRNsapngUO/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: "pptx",
                fileSize: "420.6KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "1",
                title: "Unit-6 Graph-II",
                description: "",
                fileUrl:
                  "https://docs.google.com/presentation/d/1QU6Dsh_JLidNtXNsDiM5pFkxQ0gvOun_/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: "pptx",
                fileSize: "492.8KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "1",
                title: "Unit-7 Sorting Algorithm",
                description: "",
                fileUrl:
                  "https://docs.google.com/presentation/d/19tI7q1W41oJpwadZsgeOWGkQUamB9SRb/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: "pptx",
                fileSize: "687KB",
                uploadDate: "2024-12-20",
              },

              {
                id: "1",
                title: "Unit-8 Searching Algorithm",
                description: "",
                fileUrl:
                  "https://docs.google.com/presentation/d/1O9XHnnYHWbMX-kYrKpfJe24dd0GCrS6T/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: "pptx",
                fileSize: "228.1KB",
                uploadDate: "2024-12-20",
              },
            ],
          },
          {
            id: "mth301",
            name: "OOAD",
            code: "MTH 301",
            credits: 3,
            notes: [
              {
                id: "1",
                title: "OOAD full note",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1TXI8H0o9t2ZaGCMQLEUpxNGEg0sMIeHg/view?usp=drive_link",
                fileSize: "3MB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "2",
                title: "OOAD all chapter",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1bJ3GaYkDYyNoai1NBEimRJfF45A51His/view?usp=drive_link",
                fileSize: "7.7MB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "3",
                title: "Implementation OOAD",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1dtyNsMx3oHzBQ1XzmjMX6EGAwU0Crrml/view?usp=drive_link",
                fileSize: "433.9KB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "4",
                title: "Design",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1Ii8fLesej1VRiaF-7c7q_a9V_HyILe_v/view?usp=drive_link",
                fileSize: "1.2MB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "5",
                title: "Design Pattern",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1amtiZnCelXCHOQJmQY57w5Zbus7j_XzZ/view?usp=drive_link",
                fileSize: "246.4KB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "6",
                title: "Object Oriented Methods",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/18xCDO9DONZyBe-ymQn24KETfe4h71768/view?usp=drive_link",
                fileSize: "91.5KB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "7",
                title: "Use Case Diagram",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/19a7-OL2VZI1_f_R-8DE2ywac5lTENIqw/view?usp=drive_link",
                fileSize: "42.9",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "8",
                title: "Solved Questions",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1MgoyYKvPb4WW2SBwdae_T4kwsJo7v5wD/view?usp=drive_link",
                fileSize: "74.5MB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "9",
                title: "Introduction",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1nkm9EwIdIAc9uGNK8zO3bHUL0NZfzpkj/view?usp=drive_link",
                fileSize: "7.9MB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "10",
                title: "Object Oriented Analysis",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1I6w3PLIN5ClF-4269ui7gi22lnE5MRU4/view?usp=drive_link",
                fileSize: "587.2KB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "11",
                title: "Object Oriented Methodology",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1ngx8o5ZoCZx1AuUBTYWJ-0kz3M5gwsMs/view?usp=drive_link",
                fileSize: "671.6KB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "12",
                title: "Fundamentals of OOAD",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1Tq0WwVSZPjozFci6CasKqmvXfZ6Nu2qn/view?usp=drive_link",
                fileSize: "8MB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "13",
                title: "Model Transformation",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1I8i9gcGlALUqstq9rsz_cep-C5KYkvIM/view?usp=drive_link",
                fileSize: "725.3KB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
              {
                id: "14",
                title: "COADYOURDON",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/13eYMuqVnJZDfmIjWvrpNw4hhiCPk0fgb/view?usp=drive_link",
                fileSize: "1.6MB",
                fileType: "pdf",
                uploadDate: "2024-12-20",
              },
            ],
          },
        ],
      },
      {
        id: "cse-sem3",
        number: 3,
        subjects: [],
      },
    ],
  },
  {
    id: "civil",
    name: "Civil Engineering",
    shortName: "CE",
    semesters: [],
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    shortName: "EE",
    semesters: [],
  },
  {
    id: "communication",
    name: "Electnics and Communication Engineering",
    shortName: "ECE",
    semesters: [],
  },
];
