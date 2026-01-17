import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { PyqInput } from "@/schema/upload";
import toast from "react-hot-toast";

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
