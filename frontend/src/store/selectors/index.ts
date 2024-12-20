import { RootState } from "../store";

export const selectAllBranches = (state: RootState) => state.courses.data;

export const selectBranchById = (state: RootState, branchId: string) =>
  state.courses.data.find((d) => d.id === branchId);

export const selectPDFsByBranchAndSemester = (
  state: RootState,
  branch: string,
  semester: string,
  subject: string
) => {
  const selectedBranch = state.courses.data.find(
    (b) => b.name.toLowerCase() === branch.toLowerCase()
  );
  if (!selectedBranch) {
    console.warn("Branch not found:", branch);
    return [];
  }
  const semesterNumber = parseInt(semester.split(" ")[1]);

  const selectedSemester = selectedBranch.semesters.find(
    (s) => s.number === semesterNumber
  );

  if (!selectedSemester) {
    console.warn("Semester not found:", semester);
    return [];
  }

  const selectedSubject = selectedSemester.subjects.find(
    (s) => s.name.toLowerCase() === subject.toLowerCase()
  );

  return selectedSubject?.notes.map((note) => ({
    ...note,
    subjectName: selectedSubject.name,
    subjectCode: selectedSubject.code,
  }));
};
