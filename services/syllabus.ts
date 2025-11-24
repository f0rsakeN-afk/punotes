import axiosInstance from "./axios";
import { useQuery } from "@tanstack/react-query";
import { syllabusData } from "@/types/syllabus";

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
