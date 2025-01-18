import ProjectCard from "@/components/shared/ProjectCard";
import React from "react";
import Art from "/assets/images/aws.png";

const LatestArticles = () => {
  const projects = Array(6).fill({
    title: "AWS vs Azure vs GCP: Which Cloud Provider is Right for You?",
    author: "Swapnil Ingole",
    img: Art,
    followers: "1.2k",
  });

  return (
    <>
      <h1 className="mb-6 mt-6 text-xl font-bold text-left">Latest Articles</h1>
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

export default LatestArticles;
