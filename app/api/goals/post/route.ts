import { NextResponse } from "next/server";
import { db } from "@/lib/db";
// import { goalSchema } from "@/app/Schema/AddgoalSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // Authenticate user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const body = await req.json();
    // const go?alData = goalSchema.parse(body);
    const {
      goalName,
      catergory,
      status,
      priority,
      date,
      description,
      progress,
    } = body;

   
    // Check if goal already exists for this user
    const existingGoal = await db.goal.findFirst({
      where: {
        goalName,
        userId,
      },
    });

    if (existingGoal) {
      return NextResponse.json(
        { message: "Goal name already exists" },
        { status: 400 }
      );
    }

    // Create a new goal
    const newGoal = await db.goal.create({
      data: {
        goalName,
        catergory,
        status,
        priority,
        date: new Date(date),
        description,
        userId,
        progress: progress || 0,
      },
    });

    return NextResponse.json(
      { message: "Goal created successfully", goal: newGoal },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating goal:", error);

    if (
      error instanceof Error &&
      (error as { code?: string }).code === "P2002"
    ) {
      // Prisma unique constraint violation
      return NextResponse.json(
        { message: "Goal name must be unique per user" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
