"use client";

import type React from "react";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Message from "@/app/components/message";
import Loadingspin from "@/app/components/loadingspin";

//Email Schema
const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

//password Schema
const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

//Infer Typescript configuration
type EmailData = z.infer<typeof emailSchema>;
type PasswordData = z.infer<typeof passwordSchema>;

export default function PasswordUpdate() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "password" | "success">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Email  useform state
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Password useform state
  const passwordForm = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleEmailSubmit = async (data: EmailData) => {
    console.log("Email data: ", data.email);
    setSuccessMessage("");

    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccessMessage(data.message);
      setStep("password");
    } else {
      const data = await response.json();
      setErrorMessage(data.message);
      reset();
    }
  };

  const handlePasswordSubmit = (data: PasswordData) => {
    console.log("Password data: ", data);
    reset();
    // Simulate API call
    setTimeout(() => {
      setStep("success");
    }, 1500);
  };

  return (
    <>
      {successMessage && <Message type="success" message={successMessage} />}
      {errorMessage && <Message type="error" message={errorMessage} />}
      <div className="flex min-h-screen flex-col dark:bg-gray-950 bg-gray-50 p-4">
        <div className="py-5 pl-5">
          <button
            className="bg-purple-600 px-4 py-2 rounded-full flex gap-2 items-center text-white text-sm hover:bg-purple-500 transition-colors duration-300 z-50"
            onClick={() => router.push("/sign-in")}
          >
            <ArrowLeft className="h-6 w-6" />
            Back
          </button>
        </div>
        <div className="flex flex-grow items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-4">
                <Logo />
              </div>
              <h1 className="text-2xl font-bold text-purple-800">ProTrack</h1>
            </div>

            {step === "email" && (
              <Card className="dark:bg-gray-900">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center dark:text-white">
                    Reset Password
                  </CardTitle>
                  <CardDescription className="text-center">
                    Enter your email to confirm your identity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmit(handleEmailSubmit)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          {...register("email")}
                          placeholder="Enter your email"
                          className="input"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:cursor-not-allowed dark:text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-1">
                          <Loadingspin />
                          <span>Verifying...</span>
                        </div>
                      ) : (
                        "Continue"
                      )}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === "password" && (
              <Card className="dark:bg-gray-900">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center dark:text-white">
                    Create New Password
                  </CardTitle>
                  <CardDescription className="text-center">
                    Enter a new password for your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                    className="space-y-4"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            {...passwordForm.register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="New password"
                            className="input pr-10"
                          />
                          {passwordForm.formState.errors.password && (
                            <p className="text-red-500 text-sm">
                              {passwordForm.formState.errors.password.message}
                            </p>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            {...passwordForm.register("confirmPassword")}
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="input"
                          />
                          {passwordForm.formState.errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                              {
                                passwordForm.formState.errors.confirmPassword
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 dark:text-white"
                      disabled={passwordForm.formState.isSubmitting}
                    >
                      {passwordForm.formState.isSubmitting
                        ? "Updating..."
                        : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === "success" && (
              <Card className="dark:bg-gray-900">
                <CardHeader className="space-y-1">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center dark:text-white">
                    Password Updated!
                  </CardTitle>
                  <CardDescription className="text-center">
                    Your password has been successfully updated
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => router.push("/sign-in")}
                  >
                    Back to Login
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">
      <span className="text-white font-bold text-xl">Pro</span>
    </div>
  );
}
