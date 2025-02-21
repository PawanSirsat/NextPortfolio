"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SearchBar() {
  const placeholders = [
    "Search for Projects",
    "Search for Profile",
    "Search for Topics",
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 2000); // 2 seconds interval

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Animation variants for the placeholder (screensaver-like effect)
  const placeholderVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      rotate: 10,
    },
  };

  return (
    <div className="flex items-center justify-center relative">
      <input
        type="text"
        placeholder={currentPlaceholder} // Use the placeholder prop directly on the input
        className="w-[450px] p-2 pl-8 rounded-lg bg-[#151515] text-white font-thin text-sm placeholder-white shadow-md outline-none focus:ring-2  focus:ring-indigo-500"
      />
    </div>
  );
}
