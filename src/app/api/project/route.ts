import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";
import { z } from "zod";
import { projectSchema } from "../../../../utils/validations/project";

function convertObjectToArray(obj: any): string[] {
  if (typeof obj !== "object" || obj === null) {
    return [];
  }
  return Object.values(obj).map((value) => String(value));
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = projectSchema.parse(body);

    // Convert array fields if they are objects
    const convertIfObject = (field: any): string[] => {
      if (
        typeof field === "object" &&
        !Array.isArray(field) &&
        field !== null
      ) {
        return convertObjectToArray(field);
      }
      return field || []; // Return field if it's an array or empty array if it's undefined
    };

    const tagsArray = convertIfObject(validatedData.tags);
    const keyFeaturesArray = convertIfObject(validatedData.keyFeatures);
    const challengesArray = convertIfObject(validatedData.challenges);
    const lessonsArray = convertIfObject(validatedData.lessons);
    const techArray = convertIfObject(validatedData.technologies);

    console.log(user.id);

    const newProject = await client.project.create({
      data: {
        userId: user.id,
        title: validatedData.title,
        description: validatedData.description,
        longDescription: validatedData.longDescription || null,
        tags: tagsArray,
        media: validatedData.media || null,
        startDate: validatedData.startDate
          ? new Date(validatedData.startDate)
          : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        liveDemo: validatedData.liveDemo || null,
        githubRepo: validatedData.githubRepo || null,
        status: validatedData.status || null,
        teamSize: validatedData.teamSize || null,
        role: validatedData.role || null,
        keyFeatures: keyFeaturesArray,
        challenges: challengesArray,
        lessons: lessonsArray,
        technologies: techArray,
      },
    });

    const updateMember = await client.user.update({
      where: {
        clerkUserId: user.id,
      },
      data: {
        projects: {
          connect: {
            id: newProject.id,
          },
        },
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
