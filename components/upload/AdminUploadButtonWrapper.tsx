"use client";

import { Button } from "@/components/ui/button";
import { FileCode } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import UploadReadme from "./UploadReadme";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AdminUploadButtonWrapper({ isAdmin }: { isAdmin: boolean }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={(val) => {
                if (!isAdmin && val) {
                    toast.error("You don't have this privilege. Admin only.");
                    return;
                }
                setOpen(val);
            }}
        >
            <DialogTrigger asChild>
                <Button
                    className="w-full justify-start gap-3 h-auto py-4 shadow-sm hover:shadow-md transition-all cursor-pointer bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                >
                    <FileCode data-icon="inline-start" className="h-5 w-5" />
                    <span className="font-medium">Upload README (Admin)</span>
                </Button>
            </DialogTrigger>
            {isAdmin ? (
                <DialogContent className="sm:max-w-2xl" aria-describedby={undefined}>
                    <DialogTitle className="sr-only">Upload README</DialogTitle>
                    <DialogDescription className="sr-only">Create a markdown readme page</DialogDescription>
                    <UploadReadme />
                </DialogContent>
            ) : (
                <DialogContent className="sr-only" aria-describedby={undefined}>
                    <DialogTitle className="sr-only">Admin required</DialogTitle>
                    <DialogDescription className="sr-only">Admin privilege required</DialogDescription>
                    <p className="sr-only">Admin only</p>
                </DialogContent>
            )}
        </Dialog>
    );
}
