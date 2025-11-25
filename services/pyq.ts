import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { type getPYQS } from "@/types/pyq";
import { PyqInput } from "@/schema/upload";
import toast from "react-hot-toast";

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

async function postPYQ(data: PyqInput) {
  const response = await axiosInstance.post("/api/pyqs/", data);
  return response.data;
}

export function usePostPYQ() {
  return useMutation({
    mutationFn: postPYQ,
    onSuccess: (data) => {
      toast.success(data.message || "PYQs uploaded successfully.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit PYQs.");
    },
  });
}
