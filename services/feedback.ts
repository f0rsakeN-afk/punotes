import toast from "react-hot-toast";
import { feedbackInput } from "@/schema/feedbackSchema";
import axiosInstance from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFeedbackResponse } from "@/types/feedback";

async function sendFeedback(data: feedbackInput) {
  const response = await axiosInstance.post(`/api/feedback/`, data);
  return response.data;
}

export function useSendFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendFeedback,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getFeedbackData"] });
      toast.success(data.message || "Feedback submitted successfully.");
    },
    onError: (error) => {
      toast.error(
        error.message || "Failed to submit feedback. Please try again...",
      );
    },
  });
}

async function getFeedbackData(): Promise<getFeedbackResponse[]> {
  const response = await axiosInstance.get("/api/feedback/");
  return response.data;
}

export function useGetFeedbackData() {
  return useQuery({
    queryKey: ["getFeedbackData"],
    queryFn: getFeedbackData,
  });
}
