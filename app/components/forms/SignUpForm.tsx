"use client";

import Link from "next/link";
import { Apple, Eye, EyeOff } from "lucide-react";
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
import { formSchema } from "@/lib/SignUpSchema";
import { z } from "zod";
import GoogleLogo from "@/public/formSvgs/google.svg";
import ProjectImage from "@/public/images/project2.jpg";
import { useState } from "react";
import Message from "../message";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Logo from "../Logo";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

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

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password,
      }),
    });

    if (response.ok) {
      setSuccessMessage("Account created successfully! Redirecting...");
      router.replace("/sign-in");
      form.reset();
    } else if (response.status === 409) {
      const data = await response.json();
      setErrorMessage(data.message);
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="min-h-screen w-full bg-white p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <Logo/>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold">Welcome to ProTrack!</h1>
              <p className="text-muted-foreground">
                Sign up and start managing your projects now
              </p>
            </div>

            {successMessage && (
              <Message type="success" message={successMessage} />
            )}
            {errorMessage && <Message type="error" message={errorMessage} />}

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
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              aria-label="Toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
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
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Repeat your password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              aria-label="Toggle password visibility"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
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
                    className={`w-full bg-purple-500 hover:bg-purple-600 disabled:btn-disabled transition-colors duration-300`}
                    size="lg"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <div className="flex items-center gap-4">
                        <div>
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                        </div>
                        <span>Signing up...</span>
                      </div>
                    ) : (
                      "Sign up"
                    )}
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
              <Link href="/sign-in" className="text-purple-700 hover:underline">
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
