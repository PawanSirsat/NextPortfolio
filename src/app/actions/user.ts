"use server"

import { uploadImageToCloudinary } from "@/lib/CloudinaryUpload"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { UploadAndSaveImageParams } from "../../../utils/type"

// Authenticate user
export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      return { status: 403 }
    }

    const existingUser = await client.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    })

    if (existingUser) {
      return { status: 200, user: existingUser }
    }

    const newUser = await client.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        username: user.username || "defaultUsername",
      },
    })

    return newUser
      ? { status: 201, user: newUser }
      : { status: 400, message: "Failed to create new user." }
  } catch (error) {
    console.error("🔴 ERROR:", error)
    return { status: 500, message: "Internal server error." }
  }
}

// Get user by Clerk ID
export const getUserByClerkId = async (clerkUserId: string) => {
  try {
    return await client.user.findUnique({
      where: { clerkUserId },
    })
  } catch (error) {
    console.error("🔴 ERROR:", error)
  }
}

// Get all users
export const getAllUsers = async () => {
  try {
    return await client.user.findMany()
  } catch (error) {
    console.error("🔴 ERROR:", error)
  }
}

// Update user by Clerk ID
export const updateUser = async (
  clerkUserId: string,
  updates: { firstname?: string; lastname?: string; bio?: string }
) => {
  try {
    if (!clerkUserId) {
      console.log("Clerk User ID is required.")
    }

    const user = await client.user.findUnique({
      where: { clerkUserId },
    })

    if (!user) {
      return { status: 404, message: "User not found." }
    }

    const updatedUser = await client.user.update({
      where: { clerkUserId },
      data: {
        firstname: updates.firstname || user.firstname,
        lastname: updates.lastname || user.lastname,
        bio: updates.bio || user.bio,
      },
    })

    return {
      status: 200,
      message: "User updated successfully.",
      user: updatedUser,
    }
  } catch (error) {
    console.error("🔴 ERROR:", error)
    return { status: 500, message: "Failed to update user." }
  }
}

// Save image URL to database
const saveImageURLToDatabase = async (
  imageUrl: string,
  clerkUserId: string
): Promise<void> => {
  try {
    await client.user.update({
      where: { clerkUserId },
      data: {
        profilePicture: imageUrl,
      },
    })

    console.log("Image URL saved to database successfully.")
  } catch (error) {
    console.error("🔴 ERROR:", error)
    throw error
  }
}

export const uploadAndSaveImage = async ({
  filePath,
  userId,
}: UploadAndSaveImageParams): Promise<string> => {
  try {
    console.log(filePath, userId)

    const imageUrl = await uploadImageToCloudinary(filePath)
    await saveImageURLToDatabase(imageUrl, userId)
    return userId
  } catch (error) {
    console.error("🔴 ERROR:", error)
    throw error
  }
}
