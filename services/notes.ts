import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { NotesInput } from "@/schema/upload";
import toast from "react-hot-toast";

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
      console.log(error)
      toast.error(error.message || "Failed to upload notes.");
    },
  });
}
