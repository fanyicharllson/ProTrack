"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import defaultProfile from "@/public/images/defaultProfile.jpeg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccountAuthScema } from "../Schema/AccountSettingAuthSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type AccountAuth = z.infer<typeof AccountAuthScema>;

function AccountSetting() {
  const { data: session } = useSession();

  const form = useForm<AccountAuth>({
    resolver: zodResolver(AccountAuthScema),
    defaultValues: {
      username: session?.user.username || "",
      email: session?.user.email || "",
    },
  });
  const onSubmit = (values: AccountAuth) => {
    console.log(values);
  };

  return (
    <div>
      <span className="text-gray-500 text-sm">Your Profile Picture</span>
      <div className="flex gap-4 items-center pt-3 max-sm-500:justify-center max-sm-500:flex-col">
        <div className="flex items-center">
          <Image
            src={session?.user.image || defaultProfile}
            alt="profile picture"
            width={50}
            height={50}
            priority
            className="rounded-full object-cover cursor-pointer"
          />
        </div>
        <div className="flex flex-col sm-500:flex-row items-center gap-4">
          <button className="bg-purple-600 hover:bg-purple-800 text-white rounded-md px-8 py-2 text-sm transition-colors duration-300">
            Upload New
          </button>
          <button className="bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 text-black rounded-md px-4 py-2 text-sm transition-colors duration-300">
            Remove Profile Picture
          </button>
        </div>
      </div>
      {/* Form fields */}
      <div className="border-b mt-10 mb-4"></div>
      <span className="text-gray-500 text-sm">
        Manage and Update your Personal Info
      </span>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col md:flex-row items-center w-full mt-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
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
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={!form.formState.isDirty}
                className={`rounded-md px-8 py-2 text-sm transition-all ${
                  form.formState.isDirty
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                Update Profile
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AccountSetting;
