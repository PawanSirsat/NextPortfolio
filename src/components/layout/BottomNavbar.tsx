"use client";

import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";

const BottomNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Update active section based on the current route
  useEffect(() => {
    const path = pathname.substring(1); // Remove leading "/"
    if (path === "projects" || path === "articles") {
      setActiveSection(path.charAt(0).toUpperCase() + path.slice(1)); // Capitalize
    } else {
      setActiveSection(null);
    }
  }, [pathname]);

  const handleNavigation = (section: string) => {
    router.push(`/${section.toLowerCase()}`);
  };

  return (
    <>
      {/* Main Navbar */}
      {!activeSection && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-gradient-to-r from-[#203b57] to-[#412441]  text-white px-1 py-3 rounded-full shadow-lg w-[70%] max-w-[400px] z-50">
          <button
            onClick={() => handleNavigation("Projects")}
            className="flex-1 text-center text-sm sm:text-lg hover:text-gray-300"
          >
            Projects
          </button>
          <div className="h-6 w-px bg-gray-400"></div>
          <button
            onClick={() => handleNavigation("Articles")}
            className="flex-1 text-center text-sm sm:text-lg hover:text-gray-300"
          >
            Articles
          </button>
          <div className="h-6 w-px bg-gray-400"></div>
          <button
            onClick={() => setActiveSection("More")}
            className="flex-1 text-center text-sm sm:text-lg hover:text-gray-300"
          >
            More
          </button>
        </div>
      )}

      {activeSection && activeSection !== "More" && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[50%] max-w-[200px] flex items-center justify-between z-50 fade-in">
          {/* Section Name (Centered) */}
          <div className="flex-1 text-center bg-gradient-to-r from-[#203b57] to-[#412441] text-white px-4 py-3 rounded-full shadow-lg">
            <span className="text-lg font-bold">{activeSection}</span>
          </div>

          {/* Close Button (Right Side) */}
          <button
            onClick={() => {
              setActiveSection(null);
              router.back(); // Go one step back
            }}
            className="ml-2 bg-gradient-to-r from-[#203b57] to-[#412441] text-white p-3 rounded-full shadow-lg"
          >
            <IoClose size={24} />
          </button>
        </div>
      )}

      {/* More Options Modal */}
      {activeSection === "More" && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#203b57] to-[#412441] p-4 rounded-t-2xl shadow-lg animate-slideUp z-50 fade-in">
          <button
            onClick={() => setActiveSection(null)}
            className="absolute top-2 right-2 text-white"
          >
            <IoClose size={24} />
          </button>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {["Music", "News", "Gaming", "Kids"].map((item) => (
              <div
                key={item}
                className="p-4 rounded-lg bg-white bg-opacity-20 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => {
                  setActiveSection(null);
                  router.push(`/${item.toLowerCase()}`);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNavbar;
