"use client";
import React, { useState } from "react";
import { IoPerson, IoLaptop, IoBrush, IoPencil, IoGrid } from "react-icons/io5";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function CategoriesBar() {
  const categories = [
    { name: "All", icon: <IoGrid />, color: "bg-gray-600" },
    { name: "Designer", icon: <IoBrush />, color: "bg-pink-600" },
    { name: "Developer", icon: <IoLaptop />, color: "bg-blue-600" },
    { name: "UI UX", icon: <IoPencil />, color: "bg-green-600" },
    { name: "Frontend", icon: <IoLaptop />, color: "bg-purple-600" },
    { name: "DevOps", icon: <IoLaptop />, color: "bg-orange-600" },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  return (
    <div className="py-4 lg:px-24">
      {/* Scrollable Category Bar with Shadow and Gradient */}
      <ScrollArea className="w-full rounded-xl shadow-lg bg-gradient-to-r from-gray-900 to-black p-2">
        <div className="flex gap-4 whitespace-nowrap">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              className={`flex items-center rounded-xl group transition-all duration-300 overflow-hidden border border-gray-800 hover:border-gray-700 ${
                activeCategory === category.name
                  ? "bg-gray-800 shadow-md"
                  : "bg-gray-900"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.name)}
            >
              {/* Icon Section */}
              <div
                className={`flex items-center justify-center w-12 h-12 ${
                  activeCategory === category.name
                    ? `${category.color} brightness-110`
                    : `${category.color} opacity-80 group-hover:opacity-100`
                } rounded-l-xl transition-all`}
              >
                {React.cloneElement(category.icon, {
                  className: "w-6 h-6 sm:w-7 sm:h-7 text-white",
                })}
              </div>
              {/* Text Section */}
              <div className="flex items-center justify-center text-white font-medium text-sm sm:text-base md:text-lg px-4 py-2 bg-opacity-0 group-hover:bg-opacity-10 bg-gray-800 transition-all">
                {category.name}
              </div>
            </motion.button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-gray-700" />
      </ScrollArea>
    </div>
  );
}
