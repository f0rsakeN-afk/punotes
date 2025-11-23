"use client";

import { BranchEnum, PyqInput, pyqSchema } from "@/schema/upload";
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

export default function UploadPYQ() {
  const date = new Date();

  const form = useForm<PyqInput>({
    resolver: zodResolver(pyqSchema),
    defaultValues: {
      semester: undefined,
      branch: BranchEnum.options[0],
      fileSize: "",
      year: date.getFullYear().toString(),
      url: "",
    },
  });

  const onSubmit = (data: PyqInput) => {
    console.log("FORM SUBMIT:", data);
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Upload PYQs</DialogTitle>
        <DialogDescription>
          Provide required details carefully.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
                    <SelectTrigger className="w-full h-16">
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {BranchEnum.options.map((b) => (
                        <SelectItem value={b} key={b} className="">
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

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select year(eg. 2026)</FormLabel>
                <FormControl>
                  <Input
                    className="h-12"
                    type="text"
                    placeholder="Enter year"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fileSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Size (e.g., 2MB)</FormLabel>
                <FormControl>
                  <Input
                    className="h-12"
                    type="text"
                    placeholder="Enter file size"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    className="h-12"
                    placeholder="https://example.com/syllabus.pdf"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Upload PYQs
          </Button>
        </form>
      </Form>
    </div>
  );
}
