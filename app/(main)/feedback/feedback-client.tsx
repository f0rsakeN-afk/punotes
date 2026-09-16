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
  FormMessage,
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
import { useUser } from "@stackframe/stack";
import { useSendFeedback } from "@/services/feedback";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { PageHeader } from "@/components/shared/PageHeader";
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
            <Button aria-label="View submitted feedback" className="fixed bottom-5 right-5 py-5 cursor-pointer rounded-full z-50">
              <ScrollText />
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogTitle className="sr-only">View submitted feedback</DialogTitle>
            <DialogDescription className="sr-only">List of feedback submitted by users</DialogDescription>
            <FeedbackContent />
          </DialogContent>
        </Dialog>
      )}
      {/* Page Heading */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
          <MessageCircle className="w-8 h-8 text-primary" />
        </div>
        <PageHeader
          center
          title="Share Your Feedback"
          description="We love hearing from you! Whether it's a suggestion, a feature request, or just some thoughts about your experience, your input helps us improve."
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-card p-6 sm:p-8 rounded-xl border border-border/60 max-w-xl mx-auto"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4 text-primary" /> Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!!user?.primaryEmail}
                    className="h-11"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
                <p className="text-sm text-muted-foreground mt-1.5">
                  We won&apos;t share your email. Only used to respond if needed.
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4 text-primary" /> Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!!user?.displayName}
                    type="text"
                    className="h-11"
                    autoComplete="name"
                    {...field}
                    placeholder="Your name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <MessageCircle className="w-4 h-4 text-primary" /> Your Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Type your suggestions, issues, or anything you&apos;d like us to know..."
                    className="min-h-[150px]"
                  />
                </FormControl>
                <FormMessage />
                <p className="text-sm text-muted-foreground mt-1.5">
                  Be as detailed as you like! We appreciate every message.
                </p>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 cursor-pointer h-11"
            disabled={sendFeedbackMutation.isPending}
            aria-describedby="feedback-status"
          >
            {sendFeedbackMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Submit Feedback
                <CheckCircle2 className="w-4 h-4" />
              </span>
            )}
          </Button>
          <div id="feedback-status" role="status" aria-live="polite" className="sr-only">
            {sendFeedbackMutation.isPending ? "Submitting feedback" : sendFeedbackMutation.isSuccess ? "Feedback submitted successfully" : sendFeedbackMutation.isError ? "Failed to submit feedback" : ""}
          </div>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Your feedback is important to us. Thank you for helping us make this platform better!
      </p>
    </div>
  );
}
