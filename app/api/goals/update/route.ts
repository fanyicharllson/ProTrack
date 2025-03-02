import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { message: "Request body is missing" },
        { status: 400 }
      );
    }

    const {
      id,
      goalName,
      catergory,
      date,
      description,
      status,
      priority,
      progress,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Goal ID is required" },
        { status: 400 }
      );
    }

    // Check if goal exists
    const existingGoal = await db.goal.findFirst({
      where: { id, userId },
    });

    if (!existingGoal) {
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    }

    // Ensure new goalName is unique for this user
    if (goalName && goalName !== existingGoal.goalName) {
      const nameExists = await db.goal.findFirst({
        where: { goalName, userId },
      });

      if (nameExists) {
        return NextResponse.json(
          { message: "Goal name already exists" },
          { status: 400 }
        );
      }
    }

    // Update goal
    await db.goal.update({
      where: { id },
      data: {
        id,
        goalName,
        catergory,
        status,
        date,
        progress,
        description,
        priority,
      },
    });

    return NextResponse.json(
      { message: "Goal updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
