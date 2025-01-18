import ProjectCard from "@/components/shared/ProjectCard";
import React from "react";
import Art from "/assets/images/Art.jpg";

const TrendingProjects = () => {
  const projects = Array(6).fill({
    title: "PhotoShop",
    author: "Pawan Sirsat",
    img: Art,
    followers: "1.2k",
  });

  return (
    <>
      <h1 className="mb-6 text-xl font-bold text-left">Trending Projects</h1>
      <div className="relative">
        <div className="flex overflow-x-scroll space-x-6 scrollbar-hide">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TrendingProjects;
