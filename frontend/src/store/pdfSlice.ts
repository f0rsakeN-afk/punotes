import { PDFData } from "@/data/PDFData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: PDFData,
};
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    /* incrementDownloads: (state, action) => {
      const { branchId, semesterNumber, noteId } = action.payload;
      const branch = state.data.find((b) => b.id === branchId);
      if (branch) {
        const semester = branch.semesters.find(
          (s) => s.number === semesterNumber
        );
        if (semester) {
          semester.subjects.forEach((subject) => {
            const note = subject.notes.find((n) => n.id === noteId);
            if (note && note.downloads !== undefined) {
              note.downloads += 1;
            }
          });
        }
      }
    }, */
  },
});

/* export const { incrementDownloads } = courseSlice.actions; */
export default courseSlice.reducer;
