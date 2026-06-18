import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { upload } from "@imagekit/next";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
} from "@imagekit/next";

interface UploadResponse {
  url: string;
  fileId: string;
  name: string;
  size: number;
}

interface UploadAuthParams {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
}

async function getAuthParams(): Promise<UploadAuthParams> {
  const response = await fetch("/api/upload-auth");
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to get upload auth params");
  }
  return response.json();
}

export function useUploadFile() {
  return useMutation({
    mutationFn: async ({ file, onProgress }: { file: File; onProgress?: (progress: number) => void }): Promise<UploadResponse> => {
      const authParams = await getAuthParams();

      const abortController = new AbortController();

      const uploadResponse = await upload({
        ...authParams,
        file,
        fileName: file.name,
        folder: "/punotes",
        useUniqueFileName: true,
        onProgress: (event) => {
          if (onProgress) {
            onProgress((event.loaded / event.total) * 100);
          }
        },
        abortSignal: abortController.signal,
      });

      return {
        url: uploadResponse.url || "",
        fileId: uploadResponse.fileId || "",
        name: uploadResponse.name || "",
        size: uploadResponse.size || 0,
      };
    },
    onSuccess: () => {
      toast.success("File uploaded successfully");
    },
    onError: (error: unknown) => {
      if (error instanceof ImageKitAbortError) {
        toast.error("Upload cancelled");
      } else if (error instanceof ImageKitInvalidRequestError) {
        toast.error(`Invalid request: ${error.message}`);
      } else if (error instanceof ImageKitUploadNetworkError) {
        toast.error("Network error during upload");
      } else if (error instanceof ImageKitServerError) {
        toast.error(`Server error: ${error.message}`);
      } else if (error instanceof Error && error.message.includes("Failed to get upload auth params")) {
        toast.error("Please sign in to upload files");
      } else {
        toast.error("Failed to upload file");
      }
    },
  });
}
