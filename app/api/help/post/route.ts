import { NextResponse } from "next/server";
import { HelpSchema } from "@/app/Schema/HelpSchema";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, subject, message } = HelpSchema.parse(body);

    const newHelp = await db.help.create({
      data: {
        username,
        email,
        subject,
        message,
      },
    });

    return NextResponse.json(
      { message: "Thank you for reaching out to us.", data: newHelp },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
