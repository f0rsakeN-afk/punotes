"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FileText,
  BookOpen,
  ScrollText,
  Home,
  Info,
  MessageCircle,
  Share2,
} from "lucide-react";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Ignore when typing in form fields
      const target = e.target as HTMLElement | null;
      const isEditable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable);
      // Cmd/Ctrl+K should still be allowed even in inputs? Spec says prevent default and toggle.
      // But we still allow it; only check bare keys? For Cmd+K we don't block.
      const isFormField = isEditable;

      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      // If in form field, ignore other shortcuts handled here
      if (isFormField) return;
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const run = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, notes, syllabus..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => run("/")}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </CommandItem>
          <CommandItem onSelect={() => run("/pdfs")}>
            <FileText className="mr-2 h-4 w-4" />
            Notes & PDFs
          </CommandItem>
          <CommandItem onSelect={() => run("/syllabus")}>
            <BookOpen className="mr-2 h-4 w-4" />
            Syllabus
          </CommandItem>
          <CommandItem onSelect={() => run("/pyqs")}>
            <ScrollText className="mr-2 h-4 w-4" />
            Past Questions
          </CommandItem>
          <CommandItem onSelect={() => run("/about")}>
            <Info className="mr-2 h-4 w-4" />
            About
          </CommandItem>
          <CommandItem onSelect={() => run("/feedback")}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Feedback
          </CommandItem>
          <CommandItem onSelect={() => run("/share")}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Resources
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
