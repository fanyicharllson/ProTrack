import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    const { projectName } = await req.json();
    if (!projectName) {
      return NextResponse.json(
        { message: "Project name is required" },
        { status: 400 }
      );
    }

    await db.project.delete({
      where: {
        projectName: projectName,
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
