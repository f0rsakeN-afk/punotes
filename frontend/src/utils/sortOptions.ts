 export interface sortOptionInterface {
  value: string;
  label: string;
}

export const sortOptions: sortOptionInterface[] = [
  {
    value: "title_asc",
    label: "Title (A-Z)",
  },
  {
    value: "title_desc",
    label: "Title (Z-A)",
  },
  /* {
    value: "uploaded_at_asc",
    label: "Uploaded At (Newest)",
  },
  {
    value: "uploaded_at_desc",
    label: "Uploaded At (Oldest)", 
  },*/
];
