"use client";

import { BranchEnum, readmeSchema, ReadmeInput } from "@/schema/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CheckCircle2, Loader, FileCode } from "lucide-react";
import { uploadReadme } from "@/actions/readme";
import { useState } from "react";
import toast from "react-hot-toast";

const semesterData = [
    { name: "1st semester", value: 1 },
    { name: "2nd semester", value: 2 },
    { name: "3rd semester", value: 3 },
    { name: "4th semester", value: 4 },
    { name: "5th semester", value: 5 },
    { name: "6th semester", value: 6 },
    { name: "7th semester", value: 7 },
    { name: "8th semester", value: 8 },
];

export default function UploadReadme() {
    const [isPending, setIsPending] = useState(false);

    const form = useForm<ReadmeInput>({
        resolver: zodResolver(readmeSchema),
        defaultValues: {
            semester: "1",
            branch: BranchEnum.options[0],
            title: "",
            content: "",
        },
    });

    const onSubmit = async (data: ReadmeInput) => {
        setIsPending(true);
        try {
            await uploadReadme(data);
            toast.success("README uploaded successfully!");
            form.reset();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="max-h-[80vh] overflow-y-auto pr-2">
            <DialogHeader>
                <DialogTitle>Upload Markdown README</DialogTitle>
                <DialogDescription>
                    Create and upload a markdown page for students.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="semester"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Semester</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value?.toString()}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a semester" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {semesterData.map((el) => (
                                                    <SelectItem value={el.value.toString()} key={el.value}>
                                                        {el.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="branch"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Branch</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a branch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {BranchEnum.options.map((b) => (
                                                    <SelectItem value={b} key={b}>
                                                        {b}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Page Title</FormLabel>
                                <FormControl>
                                    <Input
                                        className="h-12"
                                        placeholder="Enter readme title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Markdown Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="min-h-[200px] font-mono text-sm shadow-sm"
                                        placeholder="# Hello World\n\nWrite your markdown content here..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <Loader className="animate-spin h-4 w-4" /> Submitting to GitHub...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                Publish README
                                <FileCode className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
