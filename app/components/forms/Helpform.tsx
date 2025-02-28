"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HelpSchema } from "@/app/Schema/HelpSchema";
import { useState } from "react";
import Message from "../message";
import Loadingspin from "../loadingspin";
import { useSession } from "next-auth/react";

export function HelpForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof HelpSchema>>({
    resolver: zodResolver(HelpSchema),
    defaultValues: {
      username: session?.user.username,
      email: session?.user.email,
      subject: undefined,
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof HelpSchema>) => {
    setSuccessMessage("");
    setErrorMessage("");
    const response = await fetch("api/help/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        subject: values.subject,
        message: values.message,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setSuccessMessage(data.message);
      form.reset();
    } else {
      setErrorMessage("Something went wrong. Please try again.");
      form.reset();
    }
  };

  return (
    <>
      {successMessage && <Message type="success" message={successMessage} />}
      {errorMessage && <Message type="error" message={errorMessage} />}
      <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-purple-700">
            ProTrack
          </h2>
          <p className="text-gray-600 text-sm">
            Need help? We&apos;re here for you.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="account">Account Issues</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your issue or question"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-purple-600 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-30"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-4">
                  <Loadingspin />
                  <span>Submiting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
