import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { type getPYQS } from "@/types/pyq";

async function getPYQS(): Promise<getPYQS[]> {
  const response = await axiosInstance.get(`/api/pyqs/`);
  return response.data;
}

export function useGetPYQS() {
  return useQuery({
    queryKey: ["getPYQS"],
    queryFn: getPYQS,
    retry: 1,
  });
}
