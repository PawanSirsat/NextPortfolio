"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/shared/project-card"
import { dummyProjects } from "@/hooks/utils"

const Projects: React.FC = () => {
  return (
    <div className="flex-1 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">Projects</h2>
        <Button variant="outline">Add Project</Button>
      </div>
      {dummyProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No projects yet. Click on add projects.
        </p>
      )}
    </div>
  )
}

export default Projects
