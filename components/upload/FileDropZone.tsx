"use client";

import { useCallback, useState } from "react";
import { Upload, X, File, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUploadFile } from "@/services/upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_SIZE = 25 * 1024 * 1024; // 25MB
const ACCEPTED_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

interface FileDropZoneProps {
  onUploadComplete: (url: string) => void;
  className?: string;
}

export default function FileDropZone({ onUploadComplete, className }: FileDropZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const mutation = useUploadFile();

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only PDF and DOCX files are accepted";
    }
    if (file.size > MAX_SIZE) {
      return "File too large. Maximum size is 25MB.";
    }
    return null;
  };

  const handleFile = useCallback(
    (selectedFile: File) => {
      const error = validateFile(selectedFile);
      if (error) {
        setUploadError(error);
        toast.error(error);
        return;
      }
      setUploadError(null);
      setFile(selectedFile);
    },
    [],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFile(droppedFile);
      }
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploadError(null);
    setProgress(0);

    mutation.mutate(
      { file, onProgress: setProgress },
      {
        onSuccess: (data) => {
          setFile(null);
          setProgress(0);
          onUploadComplete(data.url);
        },
        onError: (error: unknown) => {
          const err = error as { message?: string };
          setUploadError(err.message || "Upload failed");
        },
      },
    );
  };

  const handleClear = () => {
    setFile(null);
    setUploadError(null);
    setProgress(0);
    mutation.reset();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn("space-y-3", className)}>
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
            uploadError && "border-destructive",
          )}
        >
          <input
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload
            className={cn(
              "mx-auto h-10 w-10 mb-3",
              isDragging ? "text-primary" : "text-muted-foreground",
            )}
          />
          <p className="text-sm font-medium mb-1">
            {isDragging ? "Drop file here" : "Drag & drop or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground">
            PDF or DOCX, max 25MB
          </p>
        </div>
      ) : (
        <div className="border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <File className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
            </div>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleClear}
              disabled={mutation.isPending}
              className="shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {mutation.isPending && (
            <div className="space-y-1">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Uploading... {Math.round(progress)}%
              </p>
            </div>
          )}

          {mutation.isSuccess && (
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              Uploaded successfully
            </div>
          )}

          {uploadError && (
            <div className="flex items-center gap-1 text-sm text-destructive">
              <AlertCircle className="w-4 h-4" />
              {uploadError}
            </div>
          )}

          {!mutation.isPending && !mutation.isSuccess && (
            <Button onClick={handleUpload} className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
