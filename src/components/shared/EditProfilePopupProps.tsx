"use client"

import React from "react"
import { Button } from "@/components/ui/button"

interface EditProfilePopupProps {
  formData: {
    firstname: string
    lastname: string
    bio: string
  }
  professionTags: string
  username: string
  email: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({
  formData,
  professionTags,
  username,
  email,
  onChange,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e] p-6 rounded-lg z-[1000] w-[300px]">
      <form className="space-y-4" onSubmit={onSubmit}>
        <h2 className="text-xl font-bold text-white mb-4">Edit Profile</h2>

        <div>
          <label htmlFor="username" className="block text-white text-lg mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            defaultValue={username}
            className="w-full p-3 mb-1 rounded-lg border border-gray-300 text-base"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-white text-lg mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            defaultValue={email}
            className="w-full p-3 mb-1 rounded-lg border border-gray-300 text-base"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-white text-lg mb-2">
            Tags (comma-separated):
          </label>
          <input
            type="text"
            id="tags"
            defaultValue={professionTags}
            className="w-full p-3 mb-1 rounded-lg border border-gray-300 text-base"
          />
        </div>

        <div>
          <label className="block text-white text-lg mb-2">First Name:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={onChange}
            className="w-full p-3 mb-1 rounded-lg border border-gray-300 text-base"
          />
        </div>

        <div>
          <label className="block text-white text-lg mb-2">Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={onChange}
            className="w-full p-3 mb-1 rounded-lg border border-gray-300 text-base"
          />
        </div>

        <div>
          <label className="block text-white text-lg mb-2">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={onChange}
            className="w-full p-3 mb-1 rounded-lg border border-gray-300 text-base"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            className="save-button bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="cancel-button bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProfilePopup
