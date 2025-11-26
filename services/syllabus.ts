import axiosInstance from "./axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { syllabusData } from "@/types/syllabus";
import { SyllabusInput } from "@/schema/upload";
import toast from "react-hot-toast";

async function getSyllabus(): Promise<syllabusData[]> {
  const response = await axiosInstance.get("/api/syllabus/");
  return response.data;
}

export function useGetSyllabus() {
  return useQuery({
    queryKey: ["getSyllabus"],
    queryFn: getSyllabus,
    retry: 1,
  });
}

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
