import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { goalSchema } from "@/app/Schema/AddgoalSchema";

export async function POST(req: Request) {
  try {
    // Authenticate user session
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request body
    const body = await req.json();
    const goalData = goalSchema.parse(body);
    const { goalName, catergory, status, priority, date, description } = goalData;
    const userId = session.user.id;

    // Check if goal already exists for this user
    const existingGoal = await db.goal.findFirst({
      where: {
        goalName,
        userId,
      },
    });

    if (existingGoal) {
      return NextResponse.json({ message: "Goal already exists" }, { status: 400 });
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
        progress: 0, // Default progress to 0
        userId,
      },
    });

    return NextResponse.json({ message: "Goal created successfully", goal: newGoal }, { status: 201 });
  } catch (error) {
    console.log("Error creating goal:", error);
    
    if (error instanceof Error && (error as { code?: string }).code === "P2002") { // Prisma unique constraint violation
      return NextResponse.json({ message: "Goal name must be unique per user" }, { status: 400 });
    }

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
