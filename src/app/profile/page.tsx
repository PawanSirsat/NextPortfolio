"use client";

import React, { useState, useEffect } from "react";
import {
  useCurrentUser,
  useUpdateUser,
  useUploadImage,
} from "../actions/query/queries";
import { Spinner } from "@/components/global/loader/spinner";
import { toast } from "sonner";
import { MdOutlineEdit } from "react-icons/md";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading, error } = useCurrentUser();
  const updateUserMutation = useUpdateUser();
  const uploadImageMutation = useUploadImage();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    bio: "",
  });

  // Load initial user data into form state
  useEffect(() => {
    if (user?.user) {
      setFormData({
        firstname: user.user.firstname || "",
        lastname: user.user.lastname || "",
        bio: user.user.bio || "",
      });
    }
  }, [user]);

  // Error or loading states
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    toast.error("Error loading user data");
    return <div>Error loading user data</div>;
  }

  const Data = user?.user;

  const userData = {
    email: Data?.email || "Not Available",
    username: Data?.username || "Username",
    firstname: Data?.firstname || "First Name",
    profilePicture: Data?.profilePicture,
    professionTags: Data?.professionTags || [],
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImageMutation.mutateAsync({
          filePath: file,
          userId: Data?.clerkUserId || "",
        });
        toast.success("Image uploaded successfully!");
        console.log("Uploaded Image URL:", imageUrl);
      } catch (error) {
        toast.error("Image upload failed.");
        console.error(error);
      }
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
    console.log("Submitting user update...", formData);

    try {
      const tags = (document.getElementById("tags") as HTMLInputElement).value;
      const professionTags = tags.split(",").map((tag) => tag.trim());
      const updates = {
        ...formData,
        professionTags,
      };

      // Perform mutation to update user
      await updateUserMutation.mutateAsync({
        clerkUserId: Data?.clerkUserId || "",
        updates,
      });

      // Show success notification
      toast.success("Profile updated successfully!");

      // Close the edit popup
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting user update:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-image-section relative">
          {userData.profilePicture ? (
            <>
              {" "}
              <div className="relative">
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="profile-picture w-32 h-32 rounded-full"
                />
              </div>
              <button
                className="absolute top-2 right-2  hover:bg-gray-300 text-gray-700 rounded-full p-2  z-50"
                onClick={() => document.getElementById("upload-input")?.click()}
                aria-label="Edit Profile Picture"
              >
                <MdOutlineEdit className="w-5 h-5" />
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="upload-input hidden"
                />
              </button>
            </>
          ) : (
            <div className="upload-section">
              <label htmlFor="upload-input" className="upload-label">
                Upload Image
              </label>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-input hidden"
              />
            </div>
          )}
        </div>

        <div className="profile-info-section">
          <h1>{userData.firstname}</h1>
          <p>{userData.email}</p>
          {Array.isArray(userData.professionTags) &&
          userData.professionTags.length > 0 ? (
            <div className="tags-container">
              {userData.professionTags.map((tag, index) => (
                <span key={index} className="tag">
                  {typeof tag === "string" ? tag : JSON.stringify(tag)}
                </span>
              ))}
            </div>
          ) : (
            <button className="edit-button" onClick={toggleEdit}>
              Add Tags
            </button>
          )}
        </div>
      </div>

      {/* Projects and Articles Section */}
      <div className="projects-articles-container">
        <div className="section">
          <h2>Projects</h2>
          <p>No projects yet. Click edit to add projects.</p>
        </div>
        <div className="section">
          <h2>Articles</h2>
          <p>No articles yet. Click edit to add articles.</p>
        </div>
      </div>

      {/* Popup Form for Editing */}
      {isEditing && (
        <div className="edit-popup">
          <form className="edit-form" onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" defaultValue={userData.username} />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" defaultValue={userData.email} />

            <label htmlFor="tags">Tags (comma-separated):</label>
            <input
              type="text"
              id="tags"
              defaultValue={
                Array.isArray(userData.professionTags)
                  ? userData.professionTags.join(", ")
                  : ""
              }
            />

            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="save-button">
              Save
            </button>
            <button
              type="button"
              onClick={toggleEdit}
              className="cancel-button"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
