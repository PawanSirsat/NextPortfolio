"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/shared/project-card";
import Link from "next/link";
import { useProjectsByUserId } from "@/app/actions/query/queries";
import { ProjectCardSkeleton } from "@/components/loader/ProjectCardSkeleton";

const Projects: React.FC = () => {
  const { data: projects, isLoading, isError } = useProjectsByUserId();

  if (isError) {
    return (
      <div className="flex-1 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">Projects</h2>
          <Link href="/profile/project/new">
            <Button variant="outline">Add Project</Button>
          </Link>
        </div>
        <p className="text-sm text-red-500">
          Failed to load projects. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">Projects</h2>
        <Link href="/profile/project/new">
          <Button variant="outline">Add Project</Button>
        </Link>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
        </div>
      ) : Array.isArray(projects) && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No projects yet. Click on add projects.
        </p>
      )}
    </div>
  );
};

export default Projects;
