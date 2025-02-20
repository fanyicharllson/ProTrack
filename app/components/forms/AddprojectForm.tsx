import React from "react";
import Image from "next/image";
import cancelIcon2 from "@/public/images/icons/cancelIcon2.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { projectSchema } from "@/app/Schema/AddProjectFormSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MainStackDropdown } from "./MainStackDropdown";
import { DatePicker } from "./DateDropdown";

type formValues = z.infer<typeof projectSchema>;

function AddprojectForm({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) {
  const form = useForm<formValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      type: undefined,
      projectName: "",
      status: undefined,
      date: "",
      mainStack: [],
      budget: "",
    },
  });

  const onSubmit = (values: formValues) => {
    console.log(values);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 "
        onClick={() => setShowModal(false)}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 w-[90%] max-w-sm md:max-w-md lg:max-w-lg px-5 py-4 md:rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto rounded-md">
        <div
          className="absolute p-2 border dark:border-gray-400 rounded-full border-gray-400 right-1 top-1 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          <Image
            src={cancelIcon2}
            alt="cancel"
            className="w-6 h-6 dark:filter dark:brightness-0 dark:invert"
          />
        </div>
        <div className="flex items-center flex-col justify-center">
          <p className="dark:text-gray-400 font-semibold text-lg">
            Adding a new project
          </p>
          <span className="text-gray-300 text-sm">
            Please fill in the form below
          </span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div>
                          <FormLabel htmlFor="date">Select date</FormLabel>
                        </div>
                        <DatePicker field={field} />
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
                            <SelectValue className="text-gray-400 text-sm" placeholder="Select project status" />
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
                              <SelectItem value="ongoing">Ongoing</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4 items-center justify-center pt-8">
                  <div className="cursor-pointer border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg">
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                  </div>
                  <div className="cursor-pointer bg-purple-600 px-4 py-2 rounded-lg text-white">
                    <button type="submit">Save</button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddprojectForm;
