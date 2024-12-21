export interface Subject {
  name: string;
}

interface Semester {
  number: number;
  subjects: Subject[];
}

interface SubjectTypes {
  branch: string;
  semesters: Semester[];
}

export const subjectData: SubjectTypes[] = [
  {
    branch: "Computer Engineering",
    semesters: [
      {
        number: 1,
        subjects: [
          {
            name: "Computer Programming",
          },
          { name: "Engineering Physics" },
          { name: "Mathematics I" },
          { name: "English" },
          { name: "FCT" },
        ],
      },
      {
        number: 2,
        subjects: [
          { name: "Basic Electrical Engineering" },
          { name: "Digital Logic" },
          { name: "Mathematics II" },
          { name: "Applied Mechanics" },
          { name: "OOP with C++" },
          { name: "Chemistry" },
        ],
      },
      {
        number: 3,
        subjects: [
          { name: "DSA" },
          { name: "EDC" },
          { name: "OOAD" },
          { name: "Mathematics III" },
          { name: "Computer Graphics" },
          {
            name: "Applied Sociology",
          },
        ],
      },
    ],
  },
  {
    branch: "Civil Engineering",
    semesters: [
      { number: 1, subjects: [] },
      {
        number: 2,
        subjects: [
          { name: "Mathematics II" },
          { name: "Physics" },
          { name: "Applied Mechanics II" },
          { name: "Building Technology" },
          { name: "Thermodynamics" },
        ],
      },
      {
        number: 3,
        subjects: [
          { name: "Mathematics III" },
          { name: "Strength of Materials" },
          { name: "Fluid Mechanics" },
          { name: "Survey I" },
          { name: "Engineering Geology" },
          { name: "Basic Electronics Engineering" },
          { name: "Computer Programming" },
        ],
      },
      {
        number: 4,
        subjects: [
          { name: "Probability & Statistics" },
          { name: "Survey II" },
          { name: "Hydraulics" },
          { name: "Theory of Structure I" },
          { name: "Concrete Technology" },
          { name: "Drawing" },
          { name: "English" },
        ],
      },
    ],
  },
];
