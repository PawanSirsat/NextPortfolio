"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface EditProfilePopupProps {
  formData: {
    username: string;
    firstname: string;
    lastname: string;
    bio: string;
  };
  professionTags: string;
  username: string;
  email: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({
  formData,
  professionTags,
  email,
  onChange,
  onClose,
  onSubmit,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1e1e1e] rounded-lg shadow-lg w-full max-w-md overflow-hidden"
        >
          <form className="space-y-4 p-6" onSubmit={onSubmit}>
            <h2 className="text-2xl font-bold text-white mb-4">Edit Profile</h2>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-white text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={onChange}
                className="w-full p-2 rounded-lg bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={email}
                className="w-full p-2 rounded-lg bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:outline-none focus:border-blue-500 transition-colors"
                readOnly
              />
            </div>

            {/* Profession Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-white text-sm font-medium mb-1"
              >
                Profession Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                defaultValue={professionTags}
                className="w-full p-2 rounded-lg bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* First and Last Name in one line */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-white text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={onChange}
                  className="w-full p-2 rounded-lg bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-white text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={onChange}
                  className="w-full p-2 rounded-lg bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-white text-sm font-medium mb-1"
              >
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={onChange}
                rows={4}
                className="w-full p-2 rounded-lg bg-[#2a2a2a] text-white border border-[#3a3a3a] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditProfilePopup;
