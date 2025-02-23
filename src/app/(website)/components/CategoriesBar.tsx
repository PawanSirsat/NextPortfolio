"use client";

import { useState } from "react";
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

  const getShadowClass = (color: string) => {
    const shadowClasses: { [key: string]: string } = {
      // Added index signature
      "text-violet-400": "active-icon-shadow-violet",
      "text-blue-400": "active-icon-shadow-blue",
      "text-yellow-400": "active-icon-shadow-yellow",
      "text-red-400": "active-icon-shadow-red",
    };
    return shadowClasses[color] || "";
  };

  return (
    <>
      <div className="py-4 lg:px-24">
        <div className="w-full max-w-2xl mx-auto rounded-xl bg-gray-900 p-2">
          <div className="flex justify-between items-center w-full gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.name}
                className={`flex flex-col items-center px-3 py-2 rounded-xl group transition-all duration-300 hover:bg-gray-800/50 ${
                  activeCategory === category.name
                    ? "shadow-lg"
                    : "bg-transparent"
                } w-24 lg:w-auto`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div
                  className={`flex items-center justify-center md:p-1 p-3 rounded-xl transition-all duration-300 ${
                    activeCategory === category.name
                      ? `${getShadowClass(
                          category.color
                        )} shadow-lg bg-gray-800/50`
                      : ""
                  }`}
                >
                  <span
                    className={`${category.color} w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300 `}
                  >
                    {category.icon}
                  </span>
                </div>
                <span
                  className={`font-medium text-xs sm:text-base md:text-lg pt-2 text-center transition-colors duration-300 ${
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
      <style jsx global>{`
        .active-icon-shadow-violet {
          box-shadow: 0 0 26px 5px rgba(139, 92, 246, 0.5) !important;
        }
        .active-icon-shadow-blue {
          box-shadow: 0 0 26px 5px rgba(96, 165, 250, 0.5) !important;
        }
        .active-icon-shadow-yellow {
          box-shadow: 0 0 26px 5px rgba(250, 204, 21, 0.5) !important;
        }
        .active-icon-shadow-red {
          box-shadow: 0 0 26px 5px rgba(239, 68, 68, 0.5) !important;
        }
      `}</style>
    </>
  );
}
