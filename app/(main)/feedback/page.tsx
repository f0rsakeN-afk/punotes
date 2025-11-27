"use client";

import { type feedbackInput, feedbackSchema } from "@/schema/feedbackSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  User,
  MessageCircle,
  CheckCircle2,
  Loader,
  ScrollText,
} from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";
import { useUser } from "@stackframe/stack";
import { useSendFeedback } from "@/services/feedback";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FeedbackContent from "@/components/me/FeedbackContent";
import { useGetMe } from "@/services/me";

export default function Feedback() {
  const user = useUser();
  const { data: meData } = useGetMe();

  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      email: user?.primaryEmail || "",
      name: user?.displayName || "",
      message: "",
    },
  });

  const sendFeedbackMutation = useSendFeedback();

  const onSubmit = (data: feedbackInput) => {
    sendFeedbackMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const isAdmin = meData?.data?.role === "ADMIN";

  return (
    <div className="relative">
      {isAdmin && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-5 right-5 py-5 cursor-pointer rounded-full z-50">
              <ScrollText />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <FeedbackContent />
          </DialogContent>
        </Dialog>
      )}
      <div className="max-w-5xl w-full xl:w-3xl mx-auto py-8 px-4">
        {/* Page Heading */}
        <div className="text-center mb-12 space-y-3">
          <Highlighter action="underline" color="#E7405C">
            <h1 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-2 text-primary">
              <MessageCircle className="w-8 h-8 text-primary" />
              Share Your Feedback
            </h1>
          </Highlighter>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            We love hearing from you! Whether it's a suggestion, a feature
            request, or just some thoughts about your experience, your input
            helps us improve.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-card p-5 sm:p-8 rounded-xl shadow-lg"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" /> Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={!!user?.primaryEmail}
                      className="h-12"
                      placeholder="you@example.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground mt-1">
                    We won’t share your email. Only used to respond if needed.
                  </p>
                </FormItem>
              )}
            />

            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={!!user?.displayName}
                      type="text"
                      className="h-12"
                      {...field}
                      placeholder="lorem ipsum"
                    />
                  </FormControl>
                  {/*<p className="text-sm text-muted-foreground mt-1">
                  Optional — only if you want us to address you personally.
                </p>*/}
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" /> Your
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your suggestions, issues, or anything you'd like us to know..."
                      className="min-h-[150px] max-h-[230px]"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground mt-1">
                    Be as detailed as you like! We appreciate every message.
                  </p>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 cursor-pointer h-12"
              disabled={sendFeedbackMutation.isPending}
            >
              {sendFeedbackMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin ease-linear repeat-infinite " />{" "}
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Submit Feedback
                  <CheckCircle2 className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>
        </Form>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Your feedback is important to us. Thank you for helping us make this
          platform better!
        </p>
      </div>{" "}
    </div>
  );
}
