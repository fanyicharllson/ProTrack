import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projectSchema } from "@/app/Schema/AddProjectFormSchema";
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
    const projectData = projectSchema.parse(body);
    const {
      projectName,
      type,
      status,
      date,
      mainStack,
      projectUrl,
      budget,
      description,
    } = projectData;

    // Check if projectName already exists
    const existingProject = await db.project.findFirst({
      where: { projectName, userId },
    });
    if (existingProject) {
      return NextResponse.json(
        { project: null, message: "Project with Project name already exists" },
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
        projectUrl,
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
    console.log(error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: "An error occured! Please try again later" },
      { status: 500 }
    );
  }
}
