import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";

async function getUsers() {
  const response = await axiosInstance.get(`/api/user`);
  return response.data;
}

export function useGetUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
