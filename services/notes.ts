import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { NotesInput } from "@/schema/upload";
import toast from "react-hot-toast";
import { notesResponse } from "@/types/notes";

async function getNotes(
  branch: string,
  semester: string,
): Promise<notesResponse[]> {
  const response = await axiosInstance.get(`/api/pdfs/${branch}/${semester}`);
  return response.data;
}

export function useGetNotes(branch: string, semester: string) {
  return useQuery({
    queryKey: ["getNotes", semester, branch],
    queryFn: () => getNotes(branch, semester),
    enabled: !!semester && !!branch,
  });
}

async function uploadNotes(data: NotesInput) {
  const response = await axiosInstance.post(`/api/notes/`, data);
  return response.data;
}

export function useUploadNotes() {
  return useMutation({
    mutationFn: uploadNotes,
    onSuccess: (data) => {
      toast.success(data.message || "Notes posted successfully.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload notes.");
    },
  });
}
