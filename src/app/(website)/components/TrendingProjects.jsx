import React from "react"
import { dummyProjects } from "@/hooks/utils"
import ProjectCard from "@/components/shared/project-card"

const TrendingProjects = () => {
  return (
    <>
      <h2 className="mb-6 text-xl font-bold text-left">Trending Projects</h2>
      <div className="relative">
        <div className="flex overflow-x-scroll space-x-6 scrollbar-hide">
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
      </div>
    </>
  )
}

export default TrendingProjects
