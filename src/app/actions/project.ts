"use server";

import { client } from "@/lib/prisma";
import { ProjectFormValues } from "../../../utils/validations/project";
import { log } from "console";
import { auth, currentUser } from "@clerk/nextjs/server";

export const createProject = async (
  projectData: ProjectFormValues,
  userId: string
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized: User must be logged in.");
  }

  try {
    console.log(projectData);
    console.log("User Id : ", userId);

    const newProject = await client.project.create({
      data: {
        userId: userId,
        title: projectData.title,
        description: projectData.description,
        tags: projectData.technologies || [],
        media: projectData.media || null, // Ensure this is null if not provided
        startDate: projectData.startDate
          ? new Date(projectData.startDate)
          : null,
        endDate: projectData.endDate ? new Date(projectData.endDate) : null,
        longDescription: projectData.longDescription || null,
        liveDemo: projectData.liveDemo || null,
        githubRepo: projectData.githubRepo || null, // Ensure this is null if not provided
        status: projectData.status || "In Progress",
        teamSize: projectData.teamSize || 1,
        role: projectData.role || "",
        keyFeatures: projectData.keyFeatures || [],
        challenges: projectData.challenges || [],
        lessons: projectData.lessons || [],
      },
    });

    return { status: 201, project: newProject };
  } catch (error) {
    console.log(error);

    return { status: 500, message: "Failed to create project." };
  }
};

export const getProjectsByUserId = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { message: "Unauthorized", status: 401 };
    }
    return await client.project.findMany({
      where: { userId: user.id },
    });
  } catch (error) {
    console.error("🔴 ERROR:", error);
    return { status: 500, message: "Failed to fetch projects." };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const project = await client.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return { status: 404, message: "Project not found." };
    }

    return project;
  } catch (error) {
    console.error("🔴 ERROR fetching project by ID:", error);
    return { status: 500, message: "Failed to fetch project." };
  }
};

export const updateProject = async (
  projectId: string,
  updates: Partial<ProjectFormValues>
) => {
  try {
    const updatedProject = await client.project.update({
      where: { id: projectId },
      data: {
        title: updates.title,
        description: updates.description,
        tags: updates.technologies,
        media: updates.media ? [updates.media] : undefined,
        startDate: updates.startDate ? new Date(updates.startDate) : undefined,
        endDate: updates.endDate ? new Date(updates.endDate) : undefined,
        longDescription: updates.longDescription,
        liveDemo: updates.liveDemo,
        githubRepo: updates.githubRepo,
        status: updates.status,
        teamSize: updates.teamSize,
        role: updates.role,
        keyFeatures: updates.keyFeatures,
        challenges: updates.challenges,
        lessons: updates.lessons,
      },
    });

    return { status: 200, project: updatedProject };
  } catch (error) {
    console.error("🔴 ERROR:", error);
    return { status: 500, message: "Failed to update project." };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await client.project.delete({
      where: { id: projectId },
    });

    return { status: 200, message: "Project deleted successfully." };
  } catch (error) {
    console.error("🔴 ERROR:", error);
    return { status: 500, message: "Failed to delete project." };
  }
};
