import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";

export interface Stats {
  userCount: number;
  notesCount: number;
  syllabusCount: number;
  pyqCount: number;
}

export function useGetStats() {
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/stats/about");
      return res.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}