// app/api/send/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
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
    const { email } = emailSchema.parse(body);

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }


    return NextResponse.json(
      { message: "Password Updated Successfully!"},
      { status: 200 }
    );
  } catch (error) {
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