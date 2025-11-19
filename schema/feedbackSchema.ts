import { z } from "zod";

export const feedbackSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email is too long." }),

  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),

  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(300, { message: "Message cannot exceed 300 characters." }),
});


export type feedbackInput = z.infer<typeof feedbackSchema>;
