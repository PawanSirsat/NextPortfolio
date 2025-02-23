"use client";

import { useState } from "react";
import { Wand2, Laptop, Briefcase, Brush } from "lucide-react";
import { motion, useScroll, useTransform, easeInOut } from "framer-motion";

type ShadowClasses = {
  "text-violet-400": string;
  "text-blue-400": string;
  "text-yellow-400": string;
  "text-red-400": string;
};

export default function CategoriesBar() {
  const categories = [
    { name: "For you", icon: <Wand2 />, color: "text-violet-400" },
    { name: "Tech", icon: <Laptop />, color: "text-blue-400" },
    { name: "Pro", icon: <Briefcase />, color: "text-yellow-400" },
    { name: "Creative", icon: <Brush />, color: "text-red-400" },
  ];

  const [activeCategory, setActiveCategory] = useState("For you");
  const { scrollYProgress } = useScroll();

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const getShadowClass = (color: keyof ShadowClasses): string => {
    const shadowClasses: ShadowClasses = {
      "text-violet-400": "active-icon-shadow-violet",
      "text-blue-400": "active-icon-shadow-blue",
      "text-yellow-400": "active-icon-shadow-yellow",
      "text-red-400": "active-icon-shadow-red",
    };
    return shadowClasses[color] || "";
  };

  // Shortened ranges for faster transitions
  const iconScale = useTransform(scrollYProgress, [0, 0.2], [1, 0], {
    ease: easeInOut,
  });
  const iconOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0], {
    ease: easeInOut,
  });
  const iconContainerHeight = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["48px", "0px"],
    { ease: easeInOut }
  );
  const iconSize = useTransform(scrollYProgress, [0, 0.2], ["1.5rem", "0rem"], {
    ease: easeInOut,
  });
  const iconPadding = useTransform(scrollYProgress, [0, 0.2], ["12px", "0px"], {
    ease: easeInOut,
  });

  return (
    <>
      <div className="py-4 lg:px-24 fixed top-12 left-0 right-0 z-50 mx-1">
        <div className="w-full max-w-2xl mx-auto rounded-xl bg-gradient-to-r from-gray-900 to-black p-2">
          <div className="flex justify-between items-center w-full gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex flex-col items-center px-3 py-2 rounded-xl group transition-all duration-300 hover:bg-gray-800/50 ${
                  activeCategory === category.name
                    ? "shadow-lg bg-gray-800/50"
                    : "bg-transparent"
                } w-24 lg:w-auto`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <motion.div
                  style={{
                    scale: iconScale,
                    opacity: iconOpacity,
                    height: iconContainerHeight,
                    padding: iconPadding,
                  }}
                  className={`flex items-center justify-center rounded-xl transition-all duration-300 overflow-hidden ${
                    activeCategory === category.name
                      ? `${getShadowClass(
                          category.color as keyof ShadowClasses
                        )} shadow-lg bg-gray-800/50`
                      : ""
                  }`}
                >
                  <span
                    className={`${category.color} transition-colors duration-300`}
                    style={{
                      width: iconSize.get(),
                      height: iconSize.get(),
                    }}
                  >
                    {category.icon}
                  </span>
                </motion.div>
                <span
                  className={`font-medium text-xs sm:text-base md:text-lg text-center transition-colors duration-300 ${
                    activeCategory === category.name
                      ? category.color
                      : "text-gray-200"
                  }`}
                >
                  {category.name}
                </span>
              </button>
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
