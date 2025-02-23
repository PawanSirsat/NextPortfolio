"use client";

import React from "react";
import TrendingProjects from "../components/TrendingProjects";
import { Sparkles, Flame, Lightbulb, Rocket } from "lucide-react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="min-h-screen text-white py-6 mt-4 px-4 sm:px-6 lg:px-8 rounded-lg">
      <div className="w-full mx-auto text-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 flex items-center justify-center">
          Discover Trending Projects
          <Sparkles className="ml-2 text-yellow-400" />
        </h1>
        <p className="text-base sm:text-lg text-gray-400 mb-8">
          Explore the most innovative and exciting projects currently making
          waves. Find inspiration and contribute to the future.
        </p>

        <div className="flex flex-wrap justify-center space-x-4 mb-8">
          <div className="flex flex-col items-center mb-4 sm:mb-0">
            <Flame className="text-red-500 w-8 h-8 mb-2" />
            <span className="text-xs sm:text-sm text-gray-300">Hot Picks</span>
          </div>
          <div className="flex flex-col items-center mb-4 sm:mb-0">
            <Lightbulb className="text-blue-400 w-8 h-8 mb-2" />
            <span className="text-xs sm:text-sm text-gray-300">Innovative</span>
          </div>
          <div className="flex flex-col items-center">
            <Rocket className="text-green-400 w-8 h-8 mb-2" />
            <span className="text-xs sm:text-sm text-gray-300">
              Rising Stars
            </span>
          </div>
        </div>

        <div className="rounded-lg shadow-md">
          <TrendingProjects />
        </div>

        <div className="mt-8 text-xs sm:text-sm text-gray-500">
          <p>
            Stay updated with the latest trends and contribute to groundbreaking
            projects.
          </p>
          <p>Join our community and be a part of the innovation.</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
