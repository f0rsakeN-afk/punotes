import { RootState } from "../store";

export const selectAllBranches = (state: RootState) => state.courses.branches;

export const selectBranchById = (state: RootState, branchId: string) =>
  state.courses.branches.find((branch) => branch.id === branchId);

export const selectPDFsByBranchAndSemester = (
  state: RootState,
  branch: string,
  semester: string
) => {
  const semesterNumber = parseInt(semester.split(" ")[1]);
  const selectedBranch = state.courses.branches.find(
    (b) => b.id.toLowerCase() === branch.toLowerCase()
  );

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
