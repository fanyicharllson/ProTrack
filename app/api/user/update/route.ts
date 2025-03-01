import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = session.user.id;
    const body = await req.json();
    const { username, email } = body;

    // Check if the user exists
    const existingUser = await db.user.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Ensure username and email are unique (excluding the current user)
    const [existingUserByUsername, existingUserByEmail] = await Promise.all([
      username ? db.user.findUnique({ where: { username } }) : null,
      email ? db.user.findUnique({ where: { email } }) : null,
    ]);

    if (existingUserByUsername && existingUserByUsername.id !== id) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 400 }
      );
    }

    if (existingUserByEmail && existingUserByEmail.id !== id) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    // Update the user info
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        username: username || existingUser.username, // Keep old value if not provided
        email: email || existingUser.email,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json(
      { message: "Failed to update Profile Info!" },
      { status: 500 }
    );
  }
}
