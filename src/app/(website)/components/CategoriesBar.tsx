import React from "react";
import { IoPerson, IoLaptop, IoBrush, IoPencil } from "react-icons/io5";

export default function CategoriesBar() {
  const categories = [
    { name: "Designer", icon: <IoBrush className="text-pink-500" /> },
    { name: "Developer", icon: <IoLaptop className="text-blue-500" /> },
    { name: "Artist", icon: <IoPerson className="text-yellow-500" /> },
    { name: "UI UX", icon: <IoPencil className="text-green-500" /> },
    { name: "Frontend", icon: <IoLaptop className="text-purple-500" /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-6">
      {categories.map((category) => (
        <button
          key={category.name}
          className="flex items-center space-x-2 py-2 px-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200"
        >
          {category.icon}
          <span className="text-gray-300 text-xs sm:text-sm md:text-base">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
}
