"use client";

import Link from "next/link";
import { Apple, Eye } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/Schema";
import { z } from "zod";
import GoogleLogo from "@/public/formSvgs/google.svg";
import ProjectImage from "@/public/images/project2.jpg";

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen w-full bg-white p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center hover:from-purple-600 hover:to-purple-800 transition-colors duration-300">
                <span className="text-white font-bold text-lg">Pro</span>
              </div>
              <span className="font-semibold text-2xl bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent hover:from-purple-600 hover:to-purple-800 transition-colors duration-300">
                Protrack
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold">Welcome to ProTrack!</h1>
              <p className="text-muted-foreground">
                Sign up and start managing your projects now
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
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
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              aria-label="Toggle password visibility"
                            >
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confrim Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="Repeat your password"
                              {...field}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              aria-label="Toggle password visibility"
                            >
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <label htmlFor="terms" className="text-sm">
                            I agree to the{" "}
                            <Link
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Terms
                            </Link>{" "}
                            &{" "}
                            <Link
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Privacy
                            </Link>
                          </label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full bg-purple-500 hover:bg-purple-600"
                    size="lg"
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </Form>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Image
                    src={GoogleLogo}
                    width={16}
                    height={16}
                    alt="Google Logo"
                  />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Apple className="mr-2 h-4 w-4" />
                  Apple
                </Button>
              </div>
            </div>

            <div className="text-center text-sm">
              Have an account?{" "}
              <Link href="#" className="text-purple-700 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* End of form div */}

        <div className="hidden lg:block">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-purple-200 p-2">
                  <svg
                    className=" h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                  </svg>
                </div>
                <div className="text-sm">Manage your Projects</div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-purple-200 p-2">
                  <svg
                    className=" h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <div className="text-sm">Track Projects</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-purple-200 p-2">
                  <svg
                    className=" h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                  </svg>
                </div>
                <div className="text-sm">Create Projects</div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-purple-200 p-2">
                  <svg
                    className=" h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <div className="text-sm">View analytics</div>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src={ProjectImage}
                alt="Project management illustration"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
        {/* End of second div */}
      </div>
    </div>
  );
}
