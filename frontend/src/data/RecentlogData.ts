export interface typesInfo {
  date: Date;
  title: string;
  description: string;
}

export const recentPdfs: typesInfo[] = [
  {
    date: new Date("2024-12-21"),
    title: "Added notes for 4th sem comp",
    description: "Notes for communication system, DBMS are added",
  },
  {
    date: new Date("2024-12-20"),
    title: "Added notes for third sem comp",
    description: "Notes for sociology, DSA, OOAD added",
  },
  {
    date: new Date("2024-12-22"),
    title: "Added notes for first,second,third comp",
    description: "Notes for Physics, DSA,Applied added",
  },
];
