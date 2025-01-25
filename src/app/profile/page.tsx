"use client"

import React, { useState, useEffect } from "react"
import {
  useCurrentUser,
  useUpdateUser,
  useUploadImage,
} from "../actions/query/queries"
import { Spinner } from "@/components/global/loader/spinner"
import { toast } from "sonner"
import EditProfilePopup from "@/components/shared/EditProfilePopupProps"
import { MdOutlineEdit } from "react-icons/md"
import { Button } from "@/components/ui/button"
import ToggleButtons from "./components.tsx/ToggleButtons"
import Projects from "./components.tsx/Projects"
import Articles from "./components.tsx/Articles"

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("projects")

  const { data: user, isLoading, error } = useCurrentUser()
  const updateUserMutation = useUpdateUser()
  const uploadImageMutation = useUploadImage()

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    bio: "",
  })

  useEffect(() => {
    if (user?.user) {
      setFormData({
        firstname: user.user.firstname || "",
        lastname: user.user.lastname || "",
        bio: user.user.bio || "",
      })
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="flex justify-center items-top h-screen">
        <Spinner color="#292828" />
      </div>
    )
  }

  if (error) {
    toast.error("Error loading user data")
    return <div>Error loading user data</div>
  }

  const Data = user?.user

  const userData = {
    email: Data?.email || "Not Available",
    username: Data?.username || "Username",
    firstname: Data?.firstname || "First Name",
    lastname: Data?.lastname || "Last Name",
    profilePicture: Data?.profilePicture,
    professionTags: Data?.professionTags || [],
  }

  const toggleEdit = () => setIsEditing(!isEditing)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      try {
        const imageUrl = await uploadImageMutation.mutateAsync({
          filePath: file,
          userId: Data?.clerkUserId || "",
        })
        toast.success("Image uploaded successfully!")
        console.log("Uploaded Image URL:", imageUrl)
      } catch (error) {
        toast.error("Image upload failed.")
        console.error(error)
      }
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const tags = (document.getElementById("tags") as HTMLInputElement).value
      const professionTags = tags.split(",").map((tag) => tag.trim())
      const updates = {
        ...formData,
        professionTags,
      }

      await updateUserMutation.mutateAsync({
        clerkUserId: Data?.clerkUserId || "",
        updates,
      })

      toast.success("Profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      console.error("Error submitting user update:", error)
      toast.error("Failed to update profile. Please try again.")
    }
  }

  return (
    <div className="flex flex-col items-start p-5 text-white">
      {/* Profile Header */}
      <div className="flex items-center gap-5 mb-10 flex-wrap">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
          {userData.profilePicture ? (
            <>
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-2 right-3 bg-gray-800 hover:bg-gray-400 text-gray-300 rounded-full p-1 z-50"
                onClick={() => document.getElementById("upload-input")?.click()}
                aria-label="Edit Profile Picture"
              >
                <MdOutlineEdit className="w-3 h-3" />
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <label
                htmlFor="upload-input"
                className="text-cyan-500 text-sm cursor-pointer mb-2"
              >
                Upload Image
              </label>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-start gap-2 p-2">
          <h2 className="text-2xl font-bold">
            {" "}
            {userData.firstname} {userData.lastname}
          </h2>
          {Array.isArray(userData.professionTags) &&
          userData.professionTags.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {userData.professionTags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-white text-xs px-2 py-1 rounded"
                >
                  {typeof tag === "string" ? tag : JSON.stringify(tag)}
                </span>
              ))}
            </div>
          ) : (
            <Button onClick={toggleEdit} variant="outline">
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Projects and Articles */}
      <div className="w-full m-2">
        <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex  py-4">
          {activeTab === "projects" ? <Projects /> : <Articles />}
        </div>
      </div>

      {/* Edit Popup */}
      {isEditing && (
        <EditProfilePopup
          formData={formData}
          professionTags={
            Array.isArray(userData.professionTags)
              ? userData.professionTags.join(", ")
              : ""
          }
          username={userData.username}
          email={userData.email}
          onChange={handleChange}
          onClose={toggleEdit}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default Profile
