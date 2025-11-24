import { useGetFeedbackData } from "@/services/feedback";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Loader } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export default function FeedbackContent() {
  const { data, isLoading, isError } = useGetFeedbackData();

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">Feedbacks</DialogTitle>
        <DialogDescription>
          All user feedbacks submitted.
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="h-64 pr-2">

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader className="animate-spin" />
          </div>
        )}


        {isError && (
          <div className="text-center py-10 text-sm text-red-500">
            Failed to load feedback. Please try again.
          </div>
        )}

        {!isLoading && !isError && (!data || data.length === 0) && (
          <div className="text-center py-10 text-sm text-muted-foreground">
            No feedback has been submitted yet.
          </div>
        )}


        {data && data.length > 0 && (
          <ul className="space-y-4">
            {data.map((item) => (
              <li
                key={item.id}
                className="p-3 rounded-xl border bg-background/50 backdrop-blur-sm hover:bg-accent/30 transition-colors"
              >
                <p className="text-sm leading-relaxed">{item.message}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  — {item.email ?? "Anonymous"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
}
