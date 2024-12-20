import { RootState } from "../store";

export const selectAllBranches = (state: RootState) => state.courses.data;

export const selectBranchById = (state: RootState, branchId: string) =>
  state.courses.data.find((d) => d.id === branchId);

export const selectPDFsByBranchAndSemester = (
  state: RootState,
  branch: string,
  semester: string
  /* subject?: string */
) => {
  const semesterNumber = parseInt(semester.split(" ")[1]);
  const selectedBranch = state.courses.data.find(
    (b) => b.name.toLowerCase() === branch.toLowerCase()
  );
  /* const selectedSubject=selectedBranch?.semesters.find(s=>s.subjects) */
  if (!selectedBranch) return [];

  const selectedSemester = selectedBranch.semesters.find(
    (s) => s.number === semesterNumber
  );

  if (!selectedSemester) return [];

  return selectedSemester.subjects.flatMap((subject) =>
    subject.notes.map((note) => ({
      ...note,
      subject: subject.name,
      subjectCode: subject.code,
    }))
  );
};
