"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, ExternalLink, Loader } from "lucide-react";
import { getPreviewUrl, getFileId } from "@/utils/googleDrive";

interface PDFViewerDialogProps {
  url: string;
  title: string;
  buttonClassName?: string;
}

export function PDFViewerDialog({ url, title, buttonClassName }: PDFViewerDialogProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fileId = getFileId(url);
  const previewUrl = getPreviewUrl(url);

  // Auto-open if URL already has this file's preview param
  useEffect(() => {
    if (fileId && searchParams.get("preview") === fileId) {
      setOpen(true);
    }
  }, [fileId, searchParams]);

  const handleOpen = () => {
    setLoaded(false);
    setOpen(true);
    if (fileId) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("preview", fileId);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && fileId) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("preview");
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    }
  };

  return (
    <>
      <Button size="sm" className={buttonClassName} onClick={handleOpen}>
        <Eye className="w-3.5 h-3.5" />
        View
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="p-0 gap-0 flex flex-col overflow-hidden"
          style={{ width: "95vw", height: "92vh", maxWidth: "none" }}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader className="px-5 py-3 border-b shrink-0 flex-row items-center justify-between">
            <DialogTitle className="text-sm font-medium truncate">{title}</DialogTitle>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mr-8"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in Drive
            </a>
          </DialogHeader>

          <div className="relative flex-1 min-h-0">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-background">
                <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            )}
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              onLoad={() => setLoaded(true)}
              allow="autoplay"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
