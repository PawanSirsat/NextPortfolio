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

    const startPosition = window.scrollY;
    const targetPosition = 0;
    const distance = targetPosition - startPosition;
    const duration = 300;
    let startTime: number | null = null;

    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = progress;

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
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

  // Animation for icons
  const iconScale = useTransform(scrollYProgress, [0, 0.02], [1, 0], {
    ease: easeInOut,
  });
  const iconOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0], {
    ease: easeInOut,
  });
  const iconContainerHeight = useTransform(
    scrollYProgress,
    [0, 0.02],
    ["48px", "0px"],
    { ease: easeInOut }
  );
  const iconPadding = useTransform(
    scrollYProgress,
    [0, 0.02],
    ["12px", "0px"],
    {
      ease: easeInOut,
    }
  );
  const iconContainerOpacity = useTransform(
    scrollYProgress,
    [0, 0.02],
    [1, 0],
    {
      ease: easeInOut,
    }
  );

  // Border opacity and border radius animation
  const borderOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1], {
    ease: easeInOut,
  });
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.02],
    ["12px", "24px"],
    {
      ease: easeInOut,
    }
  );

  // Dynamic top position for navbar
  const navbarTop = useTransform(
    scrollYProgress,
    [0, 0.02], // Adjust this range for sensitivity
    ["3rem", "0rem"], // Start at top-12 (3rem), move to top-0
    {
      ease: easeInOut,
    }
  );

  return (
    <>
      <motion.div
        className="py-4 lg:px-24 fixed left-0 right-0 z-50 mx-1"
        style={{
          top: navbarTop, // Dynamic top position
        }}
      >
        <motion.div
          className="w-full max-w-2xl mx-auto p-2 relative"
          style={{
            borderRadius: borderRadius,
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
            backdropFilter: "blur(10px)", // Blur effect
            border: useTransform(
              borderOpacity,
              (value) => `2px solid rgba(100, 100, 100, ${value})`
            ), // Dark gray border with dynamic opacity
          }}
        >
          <div className="flex justify-between items-center w-full gap-4 relative z-10">
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
                    height: iconContainerHeight,
                    padding: iconPadding,
                    opacity: iconContainerOpacity,
                  }}
                  className={`flex items-center justify-center rounded-xl transition-all duration-300 overflow-hidden ${
                    activeCategory === category.name
                      ? `${getShadowClass(
                          category.color as keyof ShadowClasses
                        )} shadow-lg bg-gray-800/50`
                      : ""
                  }`}
                >
                  <motion.span
                    className={`${category.color} transition-colors duration-300`}
                    style={{
                      scale: iconScale,
                      opacity: iconOpacity,
                    }}
                  >
                    {category.icon}
                  </motion.span>
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
        </motion.div>
      </motion.div>
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
