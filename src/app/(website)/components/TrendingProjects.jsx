"use client";
import React from "react";
import ProjectCard from "@/components/shared/project-card";
import { ProjectCardSkeleton } from "@/components/loader/ProjectCardSkeleton";
import { useAllProject } from "@/app/actions/query/queries";

const TrendingProjects = () => {
  const { data: projects, isLoading, isError } = useAllProject();

  console.log(projects);

  return (
    <>
      <h2 className="mb-6 text-xl font-bold text-left">Trending Projects</h2>
      <div className="relative">
        <div className="flex overflow-x-scroll space-x-6 scrollbar-hide">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
            </div>
          ) : Array.isArray(projects?.projects) &&
            projects?.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects?.projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No projects yet. Click on add projects.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TrendingProjects;
