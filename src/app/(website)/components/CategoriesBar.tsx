"use client";
import React, { useState } from "react";
import { IoPerson, IoLaptop, IoBrush, IoPencil, IoGrid } from "react-icons/io5";

export default function CategoriesBar() {
  const categories = [
    {
      name: "All",
      icon: <IoGrid />,
      color: "bg-gray-600",
    },
    {
      name: "Designer",
      icon: <IoBrush />,
      color: "bg-pink-500",
    },
    {
      name: "Developer",
      icon: <IoLaptop />,
      color: "bg-blue-500",
    },
    {
      name: "UI UX",
      icon: <IoPencil />,
      color: "bg-green-500",
    },
    {
      name: "Frontend",
      icon: <IoLaptop />,
      color: "bg-purple-500",
    },
    {
      name: "Devops",
      icon: <IoLaptop />,
      color: "bg-orange-500",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    // Add logic here to filter or update content based on the selected category
  };

  return (
    <div className="py-6 lg:px-24">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`flex items-stretch rounded-lg group transition-all duration-200 overflow-hidden ${
              activeCategory === category.name ? "bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {/* Icon Section */}
            <div
              className={`flex items-center justify-center w-10 sm:w-12 h-8 sm:h-10 ${
                activeCategory === category.name
                  ? category.color
                  : category.color
              } group-hover:brightness-110 transition-all`}
            >
              {category.icon &&
                React.cloneElement(category.icon, {
                  className: "w-5 h-5 sm:w-6 sm:h-6",
                })}
            </div>
            {/* Text Section */}
            <div className="flex-grow flex items-center justify-center text-gray-300 text-xs sm:text-sm md:text-base bg-[#151515] group-hover:bg-gray-700 transition-all px-2">
              {category.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
