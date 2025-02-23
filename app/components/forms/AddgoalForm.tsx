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
import { goalSchema } from "@/app/Schema/AddgoalSchema";
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
import { DatePicker } from "./DateDropdown";

type GoalFormValues = z.infer<typeof goalSchema>;

function AddGoalForm({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) {
  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      goalName: "",
      catergory: "",
      status: undefined,
      priority: undefined,
      date: "",
    },
  });

  const onSubmit = (values: GoalFormValues) => {
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
          <p className="dark:text-gray-400 font-semibold text-lg md:text-2xl">
            Adding a new Goal
          </p>
          <span className="text-gray-300 text-sm">
            Please fill in the form below to add your new goal
          </span>
        </div>

        <div className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="goalName"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel htmlFor="goalName">Goal Name </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          id="goalName"
                          className="w-full"
                          placeholder="Enter your goal name or title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="catergory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="catergory">Catergory</FormLabel>
                      <FormControl>
                        <Input
                          id="projectName"
                          placeholder="e.g, Web development"
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
                    name="priority"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="priority">Priority</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="priority" className="w-full">
                            <SelectValue
                              className="text-gray-400 text-sm"
                              placeholder="Select project priority"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Priority</SelectLabel>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                              <SelectItem value="not started">Not Started</SelectItem>
                              <SelectItem value="in progress">In Progress</SelectItem>
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
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div>
                        <FormLabel htmlFor="date">Select date</FormLabel>
                      </div>
                      <DatePicker<GoalFormValues> field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4 items-center justify-center pt-8">
                  <div className="cursor-pointer border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg">
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                  </div>
                  <div className="cursor-pointer bg-purple-600 px-4 py-2 rounded-lg text-white">
                    <button type="submit">Add Goal</button>
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

export default AddGoalForm;
