"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoSearch } from "react-icons/io5";
import voice from "@assets/gif/voice.gif";
import Image from "next/image";

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Simulate fetching recommendations (replace with actual API call)
  useEffect(() => {
    const fetchRecommendations = async () => {
      // Simulate a delay (e.g., 1.5 seconds) for loading
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock recommendations (replace with real data from an API)
      const mockRecommendations = [
        "Top Projects 2025",
        "Latest Articles",
        "Trending Profiles",
        "Best Dev Tools",
        "UI/UX Inspiration",
      ];
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    };

    fetchRecommendations();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery); // Replace with actual search logic
      // You can navigate to a results page or filter recommendations here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b rounded-2xl from-[#203b57] to-[#412441] text-white p-6 mt-4">
      {/* Search Bar Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl mx-auto mb-8"
      >
        <form onSubmit={handleSearch} className="relative">
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-2xl" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anything..."
            className="w-full p-4 pl-14 rounded-full bg-[#151515] text-white text-lg shadow-md outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-400"
          />
          <Image
            src={voice}
            alt="Search Animation"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-auto object-contain"
          />
        </form>
      </motion.div>

      {/* Recommendations Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
        {isLoading ? (
          // Skeleton Loader
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-32 bg-gray-700 rounded-lg animate-pulse shadow-md"
              />
            ))}
          </div>
        ) : (
          // Recommendations List
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="p-6 bg-white bg-opacity-10 rounded-lg shadow-lg hover:bg-opacity-20 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSearchQuery(item);
                  console.log("Clicked recommendation:", item); // Replace with navigation or search logic
                }}
              >
                <h3 className="text-lg font-semibold">{item}</h3>
                <p className="text-sm text-gray-300 mt-2">
                  Click to explore or search for this topic.
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
