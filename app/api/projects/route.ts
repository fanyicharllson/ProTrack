import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { projectSchema } from "@/app/Schema/AddProjectFormSchema";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const projectData = projectSchema.parse(body);
    const { projectName, type, status, date, mainStack, budget, description } =
      projectData;
    const userId = session.user.id;

    // Check if projectName already exists
    const existingProject = await db.project.findUnique({
      where: { projectName },
    });
    if (existingProject) {
      return NextResponse.json(
        { project: null, message: "Project with this name already exists" },
        { status: 409 }
      );
    }

    // Create project
    const newProject = await db.project.create({
      data: {
        projectName,
        type,
        status,
        date,
        mainStack,
        budget,
        description,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // Return response data
    return NextResponse.json(
      { project: newProject, message: "Project created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
