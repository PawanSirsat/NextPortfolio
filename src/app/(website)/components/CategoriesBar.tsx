"use client";

import React, { useState } from "react";
import { Wand2, Laptop, Briefcase, Brush } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoriesBar() {
  const categories = [
    { name: "For you", icon: <Wand2 />, color: "text-violet-400" },
    { name: "Tech", icon: <Laptop />, color: "text-blue-400" },
    { name: "Pro", icon: <Briefcase />, color: "text-yellow-400" },
    { name: "Creative", icon: <Brush />, color: "text-red-400" },
  ];

  const [activeCategory, setActiveCategory] = useState("For you");

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  return (
    <div className="py-4 lg:px-24">
      <div className="w-full rounded-xl bg-gradient-to-r from-gray-900 to-black p-2">
        <div className="flex justify-between items-center w-full gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              className={`flex flex-col items-center px-3 py-2 rounded-xl group transition-all duration-300 hover:bg-gray-800/50 ${
                activeCategory === category.name
                  ? " shadow-lg"
                  : "bg-transparent"
              } w-24 lg:w-auto`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div
                className={`flex items-center justify-center p-3 rounded-xl transition-all duration-300 ${
                  activeCategory === category.name
                    ? `${category.color.replace(
                        "text",
                        "shadow"
                      )} shadow-lg bg-gray-800/50`
                    : ""
                }`}
              >
                <span
                  className={`${category.color} w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300`}
                >
                  {category.icon}
                </span>
              </div>
              <span
                className={`font-medium text-xs sm:text-base md:text-lg py-1 text-center transition-colors duration-300 ${
                  activeCategory === category.name
                    ? category.color
                    : "text-gray-200"
                }`}
              >
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
