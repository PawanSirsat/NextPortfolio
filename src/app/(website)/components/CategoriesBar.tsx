import React from "react";
import { IoPerson, IoLaptop, IoBrush, IoPencil } from "react-icons/io5";

export default function CategoriesBar() {
  const categories = [
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
      name: "Artist",
      icon: <IoPerson />,
      color: "bg-yellow-500",
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 py-6 lg:px-24">
      {categories.map((category) => (
        <button
          key={category.name}
          className="flex items-stretch rounded-lg bg-gray-800 group transition-all duration-200 overflow-hidden"
        >
          {/* Icon Section */}
          <div
            className={`flex items-center justify-center w-14 h-12 ${category.color} group-hover:brightness-110 transition-all`}
          >
            {category.icon}
          </div>
          {/* Text Section */}
          <div className="flex-grow flex items-center justify-center text-gray-300 text-xs sm:text-sm md:text-base bg-gray-800 group-hover:bg-gray-700 transition-all">
            {category.name}
          </div>
        </button>
      ))}
    </div>
  );
}
