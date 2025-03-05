"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectSchema } from "@/app/Schema/AddProjectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { MainStackDropdown } from "@/app/components/forms/MainStackDropdown";
import { DatePicker } from "@/app/components/forms/DateDropdown";
import Loadingspin from "@/app/components/loadingspin";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useProjectStore } from "@/store/ProjectStore";
import Message from "@/app/components/message";

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { projects, updateProject } = useProjectStore();

  // Find the project by ID
  const project = projects.find((proj) => proj.id === id);

  useEffect(() => {
    if (!project) {
      router.push("/project");
    }
  }, [project, router]);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          ...project,
          type: project.type as "web" | "mobile" | "console" | "desktop",
          status: project.status as
            | "completed"
            | "cancelled"
            | "in progress"
            | "not started",
        }
      : {},
  });

  const onSubmit = async (values: ProjectFormValues) => {
    setErrorMsg("");
    setSuccessMsg("");


    const response = await updateProject(
      {
        ...values,
        type: values.type as "web" | "mobile" | "console" | "desktop",
        status: values.status as
          | "completed"
          | "cancelled"
          | "ongoing"
          | "pending",
      },
      id as string
    );

    if (response.success) {
      form.reset();
      setTimeout(() => {
        router.push("/project");
      }, 1000);
      setSuccessMsg(response.message);
    } else {
      setErrorMsg(response.message);
    }
  };

  return (
    <>
      {successMsg && <Message type="success" message={successMsg} />}
      {errorMsg && <Message type="error" message={errorMsg} />}
      <div className="px-4">
        <div className="">
          <button
            className="bg-purple-600 px-4 py-2 rounded-full flex gap-2 items-center text-white text-sm hover:bg-purple-500 transition-colors duration-300"
            onClick={() => router.push("/project")}
          >
            <ArrowLeft className="h-6 w-6" />
            Back
          </button>
        </div>
        <div className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="projectType">
                          Project Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="projectType" className="w-full">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              <SelectItem value="web">Web app</SelectItem>
                              <SelectItem value="mobile">Mobile app</SelectItem>
                              <SelectItem value="console">
                                Console app
                              </SelectItem>
                              <SelectItem value="desktop">
                                Desktop app
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel htmlFor="budget">Budget ($) </FormLabel>
                          <span className="text-gray-400 text-sm">
                            Optional
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            id="budget"
                            className="w-full"
                            type="number"
                            placeholder="Enter budget amount"
                            min="1"
                            step="0.01"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? e.target.value.toString() : ""
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="projectName">Project Name</FormLabel>
                      <FormControl>
                        <Input
                          id="projectName"
                          placeholder="Enter your project name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mainStack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="mainStack">Main Stack</FormLabel>
                      <MainStackDropdown field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectUrl"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel htmlFor="projectUrl">Project URL </FormLabel>
                        <span className="text-gray-400 text-sm">Optional</span>
                      </div>
                      <FormControl>
                        <Input
                          id="projectUrl"
                          placeholder="Enter your project url"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div>
                          <FormLabel htmlFor="date">Select date</FormLabel>
                        </div>
                        <DatePicker<ProjectFormValues> field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="status">Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="status" className="w-full">
                            <SelectValue
                              className="text-gray-400 text-sm"
                              placeholder="Select project status"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                              <SelectItem value="cancelled">
                                Cancelled
                              </SelectItem>
                              <SelectItem value="in progress">In Progress</SelectItem>
                              <SelectItem value="not started">Not Started</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div>
                        <FormLabel htmlFor="description">
                          Description{" "}
                        </FormLabel>
                        <span className="text-gray-400 text-sm">Optional</span>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={
                      !form.formState.isDirty || form.formState.isSubmitting
                    }
                    className={`disabled:cursor-not-allowed text-sm transition-colors duration-300 px-8 py-2 rounded-lg cursor-pointer 
                     ${
                       form.formState.isDirty
                         ? "bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-30"
                         : "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                     }
                    `}
                  >
                    {form.formState.isSubmitting ? (
                      <div className="flex items-center gap-4">
                        <Loadingspin />
                        <span>Updating project...</span>
                      </div>
                    ) : (
                      "Update Project"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
