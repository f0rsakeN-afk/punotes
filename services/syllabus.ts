import axiosInstance from "./axios";
import { useMutation } from "@tanstack/react-query";
import { SyllabusInput } from "@/schema/upload";
import toast from "react-hot-toast";

async function uploadSyllabus(data: SyllabusInput) {
  const response = await axiosInstance.post("/api/syllabus/", data);
  return response.data;
}

export function useUploadSyllabus() {
  return useMutation({
    mutationFn: uploadSyllabus,
    onSuccess: (data) => {
      toast.success(data.message || "Uploaded successfully.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Failed to upload. Please try again.");
    },
  });
}
