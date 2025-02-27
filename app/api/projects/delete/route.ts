import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { id } = await req.json();

    // Check if goal exists
    const existingGoal = await db.project.findFirst({ where: { id, userId } });
    if (!existingGoal) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    await db.project.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Project deleted" }, { status: 200 });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
