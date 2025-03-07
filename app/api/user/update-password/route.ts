import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

// Password Schema
const passwordSchema = z
  .object({
    email: z.string().email("Invalid email address"), // new email to be updated
    password: z.string().min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    if (!bodyText) {
      return NextResponse.json(
        { message: "Request body is empty" },
        { status: 400 }
      );
    }

    const body = JSON.parse(bodyText);
    const { email, password, confirmPassword } = passwordSchema.parse(body);

    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User with the email not found" },
        { status: 404 }
      );
    }

    // Ensure the old email matches the email stored in the database
    if (user.email !== email) {
      return NextResponse.json(
        { message: "Old email does not match the current email" },
        { status: 400 }
      );
    }

    //verify if password match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do Match! Please try again" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);

    // Update password in the database
    await db.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Invalid JSON format" },
        { status: 400 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Server Error:", error);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
