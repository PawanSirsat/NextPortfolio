import React from "react";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search for Topics"
        className="w-[450px] p-2 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 shadow-md outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
