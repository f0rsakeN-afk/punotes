import { FileType, PDFTypes } from "@/types";

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
                fileType: FileType.PDF,
                fileSize: "73.3KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note2",
                title: "C Quiz",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1kpFiWM7UKnnLa3tCzazDCsb7aiNqhxcW/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "101.3KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note3",
                title: "C storage classes",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1v6Ale7P8TKw2EndXFVC94DmEyi41Ssgz/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "49.9KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note4",
                title: "Chapter-1",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1LwHQgWEa4k2iWAvahkY3X_64jUQlE_m1/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "160.7KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note5",
                title: "Chapter-2",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1czfXmxlTqZGjXroU1jfGdtDw15AMPGo8/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "208.2KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note6",
                title: "Chapter-3",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1i-k75LtNB-eDQSHz_iW1JFwFro7UU6QD/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "1MB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note7",
                title: "Recursion",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1Kai2SnqCwEV_cRfhPp-l45SyN4aIg8VZ/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "30.9KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note8",
                title: "C video ref",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1VXFrZYCQLNhpWr4lqD-2N56GWwJA0WSD/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "286.6KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "BCE-1001-note9",
                title: "Array",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1C5f7L-yAYBusi0YTgfx486sfuuOAoGiY/view?usp=drive_link",
                fileType: FileType.PDF,
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
            notes: [
              {
                id: "",
                title: "Corrosion",
                fileUrl:
                  "https://drive.google.com/file/d/1vMD8iXBQnxjWAFML1qSv5kIxktR8D9w7/view?usp=drive_link",
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Electrochemical cell",
                fileUrl:
                  "https://drive.google.com/file/d/1w2A8TfmnbiDqlbvkDHsQrsQZyV5hi4uV/view?usp=drive_link",
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "ostwald dilution law",
                fileUrl:
                  "https://drive.google.com/file/d/16BHXERuHJDYKVy8osvrfxQLrFOd5Gojb/view?usp=drive_link",
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "SHE & glass electrode",
                fileUrl:
                  "https://drive.google.com/file/d/19GJRBeDWBK14ashxwgA-EtCb7pba3mI2/view?usp=drive_link",
                uploadDate: "2024-12-21",
              },
            ],
          },
          {
            id: "cse204",
            name: "OOP with C++",
            code: "CSE 204",
            credits: 3,
            notes: [
              {
                id: "",
                title: "Class and Object",
                fileUrl:
                  "https://docs.google.com/presentation/d/1mOGlPE_1v2X9IV-wX_RtZR-5mAhSM4a8/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Constructor and destructor",
                fileUrl:
                  "https://docs.google.com/presentation/d/1KJ6VbFgLBKCRf2qgHsx0X_w2GDwDvMZE/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Exception handling",
                fileUrl:
                  "https://docs.google.com/presentation/d/1wsyLb8kzFASguwCklHn-2jpw_6vSsS_s/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "File handling",
                fileUrl:
                  "https://docs.google.com/presentation/d/1CPDqru2ORqPy3baP1Rzqm9XwivDolCwa/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Inheritance",
                fileUrl:
                  "https://docs.google.com/presentation/d/1i9hxGIXIAnY9dmhxUkqrUCbRpPYRSsDK/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Introduction",
                fileUrl:
                  "https://docs.google.com/presentation/d/19ShUSBmHT1DjLnuapmIKFxjAzJrRsVAg/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Operator overloading",
                fileUrl:
                  "https://docs.google.com/presentation/d/1xTXhnJPx_7IOnXLXJKiVRM5ZGqd3fpht/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Polymorphism",
                fileUrl:
                  "https://docs.google.com/presentation/d/11-vgUPSpEQs_TpTh2N917TsFru95665S/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "standard template library",
                fileUrl:
                  "https://docs.google.com/presentation/d/1lXFpgpWUa2vXovl0VabdidI3y1Zl96lf/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Template",
                fileUrl:
                  "https://docs.google.com/presentation/d/1MyEw-jGZUnRr8P6ixVJGk_9dH59Q9gFq/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                uploadDate: "2024-12-21",
              },
            ],
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
            notes: [
              {
                id: "",
                title: "CG note 1",
                fileUrl:
                  "https://drive.google.com/file/d/1Wr-qnKmTJYltXmHN7MqQYoFWJUSGIyLV/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "CG note 2",
                fileUrl:
                  "https://drive.google.com/file/d/1KxIQrJFYk7wHPlYTjwh_B9UuGEXw9J34/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
            ],
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
                fileType: FileType.PDF,
              },
              {
                id: "2",
                title: "Past questions of AS",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1Dq8YyBZ93bmLcuyQBFBvz7KqNZG1Pz8j/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "969.1KB",
                fileType: FileType.PDF,
              },
              {
                id: "3",
                title: "AS notes(BE Comp)",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1KLShHa4J_8THO-9MGsC9MdT3aptH4cyx/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "592.5KB",
                fileType: FileType.PDF,
              },
              {
                id: "4",
                title: "AS full notes",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1d6PGevhwbW1FnygI1ARC-NYkkU_ysVZi/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "6.8MB",
                fileType: FileType.PDF,
              },
              {
                id: "5",
                title: "Modernization",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/14ITgu5-A-ttK6jA9CjLF69K5YXvKQPTf/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "1.9MB",
                fileType: FileType.PDF,
              },
              {
                id: "6",
                title: "Sociology notes",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1kfcsor9S5V913E9Pdmk_51t7oOPXHsx6/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "650.5KB",
                fileType: FileType.PDF,
              },
              {
                id: "7",
                title: "Sociology 1-3",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1LsJ3zRaWo_3FboGqBb_SbueqGGz6fuQC/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "592.5KB",
                fileType: FileType.PDF,
              },
              {
                id: "8",
                title: "Consise sociology notes",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1zxIZFIuIZvKsthIMtdhYWg08zqaKesqV/view?usp=drive_link",
                uploadDate: "2024-12-20",
                fileSize: "6.3MB",
                fileType: FileType.PDF,
              },
            ],
          },
          {
            id: "mth301",
            name: "EDC",
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
                id: "",
                title: "Introduction to DSA",
                fileUrl:
                  "https://docs.google.com/presentation/d/1Gh7EdSuoPRl9CdoF4W1jE1ipWg_hAh7O/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Recursion",
                fileUrl:
                  "https://docs.google.com/presentation/d/1-tgvNaf0GFib7zYu3L-qtBhtnfeMe9Sy/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                uploadDate: "2024-12-21",
              },
              {
                id: "1",
                title: "Unit-2 Stack",
                description: "Stack Inplementation",
                fileUrl:
                  "https://docs.google.com/presentation/d/1lKeZhcBKzUw5ILyd3QV-c3tC6W2P6AW3/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                fileSize: "1MB",
                uploadDate: "2024-12-20",
              },
              {
                id: "1",
                title: "Unit-3 Queue",
                description: "queue implementation",
                fileUrl:
                  "https://docs.google.com/presentation/d/1gHFFxWqGQzuUlz2rIyuB6zqeLIXOLaao/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                fileSize: "521.2KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "1",
                title: "Unit-5 Linked List",
                description: "Linked list implementation",
                fileUrl:
                  "https://docs.google.com/presentation/d/1sR6E6L2UIQ55-xu70jPoC3FzWDztc_dX/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                fileSize: "286.3KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "1",
                title: "Unit-6 Trees-I",
                description: "",
                fileUrl:
                  "https://docs.google.com/presentation/d/1ZU8d6X_uprlzWSNGw5QFotyRNsapngUO/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                fileSize: "420.6KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "1",
                title: "Unit-6 Graph-II",
                description: "",
                fileUrl:
                  "https://docs.google.com/presentation/d/1QU6Dsh_JLidNtXNsDiM5pFkxQ0gvOun_/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                fileSize: "492.8KB",
                uploadDate: "2024-12-20",
              },
              {
                id: "1",
                title: "Unit-7 Sorting Algorithm",
                description: "",
                fileUrl:
                  "https://docs.google.com/presentation/d/19tI7q1W41oJpwadZsgeOWGkQUamB9SRb/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
                fileSize: "687KB",
                uploadDate: "2024-12-20",
              },

              {
                id: "1",
                title: "Unit-8 Searching Algorithm",
                description: "",
                fileUrl:
                  "https://docs.google.com/presentation/d/1O9XHnnYHWbMX-kYrKpfJe24dd0GCrS6T/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileType: FileType.PPTX,
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
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "2",
                title: "OOAD all chapter",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1bJ3GaYkDYyNoai1NBEimRJfF45A51His/view?usp=drive_link",
                fileSize: "7.7MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "3",
                title: "Implementation OOAD",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1dtyNsMx3oHzBQ1XzmjMX6EGAwU0Crrml/view?usp=drive_link",
                fileSize: "433.9KB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "4",
                title: "Design",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1Ii8fLesej1VRiaF-7c7q_a9V_HyILe_v/view?usp=drive_link",
                fileSize: "1.2MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "5",
                title: "Design Pattern",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1amtiZnCelXCHOQJmQY57w5Zbus7j_XzZ/view?usp=drive_link",
                fileSize: "246.4KB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "6",
                title: "Object Oriented Methods",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/18xCDO9DONZyBe-ymQn24KETfe4h71768/view?usp=drive_link",
                fileSize: "91.5KB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "7",
                title: "Use Case Diagram",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/19a7-OL2VZI1_f_R-8DE2ywac5lTENIqw/view?usp=drive_link",
                fileSize: "42.9",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "8",
                title: "Solved Questions",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1MgoyYKvPb4WW2SBwdae_T4kwsJo7v5wD/view?usp=drive_link",
                fileSize: "74.5MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "9",
                title: "Introduction",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1nkm9EwIdIAc9uGNK8zO3bHUL0NZfzpkj/view?usp=drive_link",
                fileSize: "7.9MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "10",
                title: "Object Oriented Analysis",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1I6w3PLIN5ClF-4269ui7gi22lnE5MRU4/view?usp=drive_link",
                fileSize: "587.2KB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "11",
                title: "Object Oriented Methodology",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1ngx8o5ZoCZx1AuUBTYWJ-0kz3M5gwsMs/view?usp=drive_link",
                fileSize: "671.6KB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "12",
                title: "Fundamentals of OOAD",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1Tq0WwVSZPjozFci6CasKqmvXfZ6Nu2qn/view?usp=drive_link",
                fileSize: "8MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "13",
                title: "Model Transformation",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1I8i9gcGlALUqstq9rsz_cep-C5KYkvIM/view?usp=drive_link",
                fileSize: "725.3KB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
              },
              {
                id: "14",
                title: "COADYOURDON",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/13eYMuqVnJZDfmIjWvrpNw4hhiCPk0fgb/view?usp=drive_link",
                fileSize: "1.6MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-20",
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
            id: "note-1",
            name: "Microprocessor",
            code: "",
            credits: 3,
            notes: [
              {
                id: "note-1",
                title: "8085 block diagram",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1bl6VMsqcJLI7X4auKjxql6_O5yyeaZa6/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "2.2MB",
                uploadDate: "2024-12-21",
              },
              {
                id: "note-1",
                title: "8085 instruction set",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1Hp-f4qOyceSw0pVxGUgxRs5gDvK7O8Ws/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "5.8MB",
                uploadDate: "2024-12-21",
              },
              {
                id: "note-1",
                title: "assembler, directives, macro",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1KnyIceR9Fh541O3DykMJA1-o32aa41Ab/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "1.6MB",
                uploadDate: "2024-12-21",
              },
              {
                id: "note-1",
                title: "8085 pin diagram",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1b2iiRMrPUIMAQCXZSRH15cJa5QMTN6pw/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "2MB",
                uploadDate: "2024-12-21",
              },
              {
                id: "note-1",
                title: "Timing diagram",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1l4StfVxJiBjugseFlomIVUBZ57k4UZsn/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "6MB",
                uploadDate: "2024-12-21",
              },
              {
                id: "note-1",
                title: "Chapter 1",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1jeQQkXNZdetjeDyclEguJMzDIs6_F7vB/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "2.4MB",
                uploadDate: "2024-12-21",
              },
              {
                id: "note-1",
                title: "Stack and subroutine",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1AO7qU7kOIBe1P-GkHUvOXFNQrCGZNnKh/view?usp=drive_link",
                fileType: FileType.PDF,
                fileSize: "1.3MB",
                uploadDate: "2024-12-21",
              },
            ],
          },
          {
            id: "",
            name: "Discrete Structure",
            code: "",
            credits: 3,
            notes: [
              {
                id: "note-1",
                title: "Sets",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1IbCiM_B5d2SuAUlCJlFpAwKtRSCKpGvo/view?usp=drive_link",
                fileSize: "1.4MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "note-1",
                title: "discrete structure",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/179W8uVnmTEcZYcWBLEVmCMxwShHCr-sB/view?usp=drive_link",
                fileSize: "32.7MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "note-1",
                title: "permutation & combination",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/16dc1kWLjLtA64e8yVgbmk2nlEfdbUfvZ/view?usp=drive_link",
                fileSize: "3.6MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
            ],
          },
          {
            id: "",
            name: "DBMS",
            code: "",
            credits: 3,
            notes: [
              {
                id: "",
                title: "DBMS lab manual",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1F4J2iynJWUyrDQ9UbY6fqSuuZVQaabrI/view?usp=drive_link",
                fileSize: "944.2KB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Database management systems",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1M7zcbwwuYMLcsxbJI0QXT32Zjco-hVF3/view?usp=drive_link",
                fileSize: "11.2MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "DBMS concepts",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1mPBMijeoDM-R9YC6ikr2pKceaVgZ4vvM/view?usp=drive_link",
                fileSize: "17.3MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "DBMS notes om Communication",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1gBgecGMoTL6HOUogqRBJ2CIdkWd61u6m/view?usp=drive_link",
                fileSize: "24.3MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "DBMS notes",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1_6Pz7FXcOd00HeA5FIaqFsgq-3oipdEY/view?usp=drive_link",
                fileSize: "56.5MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "question bank DBMS",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1e_-JBZwKPx_eHi30GXHx35A5LLEJ0HwT/view?usp=drive_link",
                fileSize: "2.8MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Lab manual",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1o_VnxsXMAF-qO62IQR71OjEw1-jkqg-P/view?usp=drive_link",
                fileSize: "816.1KB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "dbms",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/15phB8bTlMCfGQMFHzx5FkGwPr4nPUfuY/view?usp=drive_link",
                fileSize: "19.2MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "normalization",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1e6IiUwc7WFTOMbD7c48AgWF9p3uK9jhZ/view?usp=drive_link",
                fileSize: "7.7MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Relational algebra I",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1tqFg6NUtyR2_hLdn3pfjpMl_2NgjyJmk/view?usp=drive_link",
                fileSize: "8.4MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Relational algebra II",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1pmYLsCI3OF5Y0XMlSOAh51QFxAR5oedN/view?usp=drive_link",
                fileSize: "5.9MB",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Complete SQL Lab Manual",
                description: "",
                fileUrl:
                  "https://docs.google.com/document/d/1LjeDpKXlxXpQQyjnRntK5VVu1re03zZn/edit?usp=drive_link&ouid=107131341529669410236&rtpof=true&sd=true",
                fileSize: "325KB",
                uploadDate: "2024-12-21",
                fileType: FileType.DOCX,
              },
              {
                id: "",
                title: "IMG-20220904-WA0002",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1n5ZXDt_-_KLvKKOs67c6Aq4q2MtMxvIT/view?usp=drive_link",
                fileSize: "111.6KB",
                uploadDate: "2024-12-21",
                fileType: FileType.Image,
              },
              {
                id: "",
                title: "IMG-20220904-WA0003",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1fzow7xY5fVcMubpP70Lg9Nk76U7vJbf3/view?usp=drive_link",
                fileSize: "100.1KB",
                uploadDate: "2024-12-21",
                fileType: FileType.Image,
              },
              {
                id: "",
                title: "IMG-20220904-WA0004",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1fGCH_p9LwlbWo-apIa0oBIB4JJjfZccB/view?usp=drive_link",
                fileSize: "72.1KB",
                uploadDate: "2024-12-21",
                fileType: FileType.Image,
              },
              {
                id: "",
                title: "IMG-20220904-WA0005",
                description: "",
                fileUrl:
                  "https://drive.google.com/file/d/1oQl08qjoy-T8xEVqh_B--uoupOZQ4C-o/view?usp=drive_link",
                fileSize: "79.8KB",
                uploadDate: "2024-12-21",
                fileType: FileType.Image,
              },
            ],
          },
          {
            id: "",
            name: "Communication System",
            code: "",
            credits: 3,
            notes: [
              {
                id: "",
                title: "Chapter 1",
                fileUrl:
                  "https://drive.google.com/file/d/1u9CpcdTUbDR9yBDHN2a3edH6uUrJqPPz/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Numerical",
                fileUrl:
                  "https://drive.google.com/file/d/1MFdrv-gvGEB8i0UXAb-KLvqkYjNNKsTh/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Chapter 2",
                fileUrl:
                  "https://drive.google.com/file/d/1LXMuMgCpKR33Q8-kRZVPunXCiDCsvYUU/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Chapter 3",
                fileUrl:
                  "https://drive.google.com/file/d/12O1Upm6oydJlS-USay_cWUjqc6Vya3fz/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Chapter 4",
                fileUrl:
                  "https://drive.google.com/file/d/13atwyRQNFOI_KsfylsliBuX6CEcGgvbV/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Chapter 5",
                fileUrl:
                  "https://drive.google.com/file/d/1QanCScRb9ap3op7xlDRroW0RguCS6A3V/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Past questions solved",
                fileUrl:
                  "https://drive.google.com/file/d/1oa8w4onUmGiVbyZiVbqa2kdjLaamqLq_/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Chapter 6",
                fileUrl:
                  "https://drive.google.com/file/d/1MM8DB3g4kSs9WrOvcs4a8QvAEUlvETMs/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
              {
                id: "",
                title: "Chapter 7 & 8",
                fileUrl:
                  "https://drive.google.com/file/d/1vvOWUEXnZTix9vJ1FLhUnk_xzF-cwPW3/view?usp=drive_link",
                fileType: FileType.PDF,
                uploadDate: "2024-12-21",
              },
            ],
          },
        ],
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
