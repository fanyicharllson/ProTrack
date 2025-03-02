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
      return NextResponse.json({ message: "Request body is missing" }, { status: 400 });
    }

    const {
      id,
      projectName,
      type,
      status,
      date,
      mainStack,
      projectUrl,
      budget,
      description,
    } = body;

    if (!id) {
      return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
    }

    // Check if project exists
    const existingProject = await db.project.findFirst({
      where: { id, userId },
    });

    if (!existingProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Ensure new projectName is unique for this user
    if (projectName && projectName !== existingProject.projectName) {
      const nameExists = await db.project.findFirst({
        where: { projectName, userId },
      });

      if (nameExists) {
        return NextResponse.json(
          { message: "Project name already exists" },
          { status: 400 }
        );
      }
    }

    // Update project
    await db.project.update({
      where: { id },
      data: {
        projectName,
        type,
        status,
        date,
        mainStack,
        projectUrl,
        budget,
        description,
      },
    });

    return NextResponse.json(
      { message: "Project updated successfully" },
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
