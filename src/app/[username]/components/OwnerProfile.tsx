// components/OwnerProfile.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUpdateUser, useUploadImage } from "@/app/actions/query/queries";
import { toast } from "sonner";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, X } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
import ToggleButtons from "./ToggleButtons";
import Projects from "./Projects";
import Articles from "./Articles";
import {
  generateRandomAvatar,
  generateRandomAvatarOptions,
} from "@/app/helper/generateRandomAvatar";

interface OwnerProfileProps {
  userData: any;
}

export const OwnerProfile: React.FC<OwnerProfileProps> = ({ userData }) => {
  console.log("OwnerProfile rendered");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("projects");
  const [showAlert, setShowAlert] = useState(true);
  const [avatarOptions, setAvatarOptions] = useState<string[]>([]);
  const hasGeneratedAvatar = useRef(false);

  const updateUserMutation = useUpdateUser();
  const uploadImageMutation = useUploadImage();

  const [formData, setFormData] = useState(() => ({
    firstname: userData?.firstname || "",
    lastname: userData?.lastname || "",
    bio: userData?.bio || "",
    username: userData?.username || "",
  }));

  // One-time avatar generation on mount
  useEffect(() => {
    console.log("useEffect ran");
    if (!userData) return;

    // Update formData only if necessary
    const newFormData = {
      firstname: userData.firstname || "",
      lastname: userData.lastname || "",
      bio: userData.bio || "",
      username: userData.username || "",
    };
    if (
      formData.firstname !== newFormData.firstname ||
      formData.lastname !== newFormData.lastname ||
      formData.bio !== newFormData.bio ||
      formData.username !== newFormData.username
    ) {
      setFormData(newFormData);
    }

    // Generate avatar only once if no profile picture
    if (
      !userData.profilePicture &&
      userData.firstname &&
      userData.lastname &&
      !hasGeneratedAvatar.current
    ) {
      const seed = `${userData.firstname} ${userData.lastname}`;
      generateRandomAvatar(
        seed,
        uploadImageMutation,
        userData.clerkUserId || ""
      ).then(() => {
        hasGeneratedAvatar.current = true;
      });
    }
  }, [userData, uploadImageMutation]);

  const toggleEdit = () => {
    if (!isEditing && userData.firstname && userData.lastname) {
      const seed = `${userData.firstname} ${userData.lastname}`;
      setAvatarOptions(generateRandomAvatarOptions(seed, 3));
    }
    setIsEditing((prev) => !prev);
  };

  const isProfileIncomplete =
    !userData.username || !userData.firstname || !userData.lastname;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImageMutation.mutateAsync({
          filePath: file,
          userId: userData.clerkUserId || "",
        });
        toast.success("Image uploaded successfully!");
        setIsEditing(false);
      } catch (error) {
        toast.error("Image upload failed.");
      }
    }
  };

  const handleAvatarSelect = async (avatarUrl: string) => {
    try {
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      const file = new File([blob], "avatar.svg", { type: "image/svg+xml" });
      const imageUrl = await uploadImageMutation.mutateAsync({
        filePath: file,
        userId: userData.clerkUserId || "",
      });
      toast.success("Avatar selected and uploaded!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to upload avatar.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags =
        (document.getElementById("tags") as HTMLInputElement)?.value || "";
      const professionTags = tags.split(",").map((tag) => tag.trim());
      const updates = { ...formData, professionTags };

      await updateUserMutation.mutateAsync({
        clerkUserId: userData.clerkUserId || "",
        updates,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <div className="flex flex-col text-white p-4">
      {isProfileIncomplete && showAlert && (
        <Alert className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-300 relative">
          <Info className="h-4 w-4" />
          <AlertTitle>Complete Your Profile</AlertTitle>
          <AlertDescription>
            Your profile is incomplete. Please add info.
          </AlertDescription>
          <button onClick={handleCloseAlert} className="absolute top-2 right-2">
            <X className="h-4 w-4" />
          </button>
        </Alert>
      )}

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
                onClick={toggleEdit}
              >
                <MdOutlineEdit className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <span className="text-cyan-500 text-sm">Loading Avatar...</span>
            </div>
          )}
        </div>

        <div className="flex flex-col p-2">
          <h2 className="text-2xl font-bold">
            {userData.firstname} {userData.lastname}
          </h2>
          <h2 className="text-xs">@{userData.username}</h2>
          <h2 className="text-sm my-2">{userData.bio}</h2>
          {Array.isArray(userData.professionTags) &&
          userData.professionTags.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {userData.professionTags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-700 text-white text-xs px-2 py-1 rounded"
                >
                  {tag}
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

      <div className="m-2">
        <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex py-4">
          {activeTab === "projects" ? <Projects /> : <Articles />}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg text-white w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Choose Your Avatar</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {avatarOptions.map((avatarUrl, index) => (
                <img
                  key={index}
                  src={avatarUrl}
                  alt={`Avatar Option ${index + 1}`}
                  className="w-20 h-20 rounded-full cursor-pointer hover:opacity-80"
                  onClick={() => handleAvatarSelect(avatarUrl)}
                />
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm">Upload Custom Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-gray-300"
              />
            </div>
            <Button onClick={toggleEdit} variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
