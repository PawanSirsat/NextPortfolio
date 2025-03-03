"use client";

import LatestArticles from "./components/LatestArticles";
import TrendingProjects from "./components/TrendingProjects";

export default function Home() {
  return (
    <div>
      <TrendingProjects />
      <LatestArticles />
    </div>
  );
}
