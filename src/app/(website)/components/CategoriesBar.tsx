"use client";

import { Dispatch, SetStateAction } from "react";
import { Wand2, Laptop, Briefcase, Brush } from "lucide-react";
import { motion, useScroll, useTransform, easeInOut } from "framer-motion";

type Category = "For you" | "Tech" | "Pro" | "Creative";

interface CategoriesBarProps {
  onCategoryChange: Dispatch<SetStateAction<Category>>;
  activeCategory: Category;
}

type ShadowClasses = {
  "text-violet-400": string;
  "text-blue-400": string;
  "text-yellow-400": string;
  "text-teal-400": string; // Changed from "text-red-400"
};

export default function CategoriesBar({
  onCategoryChange,
  activeCategory,
}: CategoriesBarProps) {
  const categories = [
    {
      name: "For you" as Category,
      icon: <Wand2 />,
      color: "text-violet-400",
      hex: "#8b5cf6",
    },
    {
      name: "Tech" as Category,
      icon: <Laptop />,
      color: "text-blue-400",
      hex: "#60a5fa",
    },
    {
      name: "Pro" as Category,
      icon: <Briefcase />,
      color: "text-yellow-400",
      hex: "#facc15",
    },
    {
      name: "Creative" as Category,
      icon: <Brush />,
      color: "text-teal-400", // Changed from "text-red-400"
      hex: "#2dd4bf", // Changed from "#ef4444"
    },
  ];

  const { scrollYProgress } = useScroll();

  const handleCategoryClick = (categoryName: Category) => {
    onCategoryChange(categoryName);
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
      "text-teal-400": "active-icon-shadow-teal", // Changed from "active-icon-shadow-red"
    };
    return shadowClasses[color] || "";
  };

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
    { ease: easeInOut }
  );
  const iconContainerOpacity = useTransform(
    scrollYProgress,
    [0, 0.02],
    [1, 0],
    { ease: easeInOut }
  );
  const borderOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1], {
    ease: easeInOut,
  });
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.02],
    ["12px", "15px"],
    { ease: easeInOut }
  );
  const navbarTop = useTransform(scrollYProgress, [0, 0.02], ["3rem", "0rem"], {
    ease: easeInOut,
  });

  return (
    <>
      <motion.div
        className="py-4 lg:px-24 fixed left-0 right-0 z-50 mx-1"
        style={{ top: navbarTop }}
      >
        <motion.div
          className="w-full max-w-2xl mx-auto p-2 relative"
          style={{
            borderRadius: borderRadius,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(10px)",
            border: useTransform(
              borderOpacity,
              (value) => `2px solid rgba(100, 100, 100, ${value})`
            ),
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
                    style={{ scale: iconScale, opacity: iconOpacity }}
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
        .active-icon-shadow-teal {
          box-shadow: 0 0 26px 5px rgba(45, 212, 191, 0.5) !important; // Updated to teal (#2dd4bf)
        }
      `}</style>
    </>
  );
}
