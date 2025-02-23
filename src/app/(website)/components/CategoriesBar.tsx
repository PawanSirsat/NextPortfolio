"use client";

import { useState } from "react";
import { Wand2, Laptop, Briefcase, Brush } from "lucide-react";
import { motion, useScroll, useTransform, easeInOut } from "framer-motion";

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

  const getShadowClass = (color: string) => {
    const shadowClasses = {
      "text-violet-400": "active-icon-shadow-violet",
      "text-blue-400": "active-icon-shadow-blue",
      "text-yellow-400": "active-icon-shadow-yellow",
      "text-red-400": "active-icon-shadow-red",
    };
    return shadowClasses[color] || "";
  };

  // Synchronized animations over 30% scroll
  const iconScale = useTransform(scrollYProgress, [0, 0.3], [1, 0], {
    ease: easeInOut,
  });
  const iconOpacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0], {
    ease: easeInOut,
  });
  const iconContainerHeight = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["auto", "0px"],
    { ease: easeInOut }
  );
  const iconSize = useTransform(scrollYProgress, [0, 0.3], ["1.5rem", "0rem"], {
    ease: easeInOut,
  });
  const iconPadding = useTransform(
    scrollYProgress,
    [0, 0.45],
    ["12px", "0px"],
    { ease: easeInOut }
  ); // Extended range

  return (
    <>
      <div className="py-4 lg:px-24 fixed top-12 left-0 right-0 z-50">
        <div className="w-full max-w-2xl mx-auto rounded-xl bg-gray-900 p-2">
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
                          category.color
                        )} shadow-lg bg-gray-800/50`
                      : ""
                  }`}
                >
                  <span
                    className={`${category.color} transition-colors duration-300`}
                    style={{
                      fontSize: iconSize,
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
