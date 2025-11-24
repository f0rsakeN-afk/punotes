import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";

async function getMe() {
  const response = await axiosInstance.get(`/api/me/`);
  return response.data;
}

export function useGetMe() {
  return useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    staleTime: 10 * 60 * 1000,
  });
}
