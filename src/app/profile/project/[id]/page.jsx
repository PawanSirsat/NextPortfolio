"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTechIcon } from "@/hooks/useTechIcon";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Eye,
  Calendar,
  Clock,
} from "lucide-react";
import MarkdownRenderer from "@/components/shared/MarkdownRenderer";
import { useProjectById } from "@/app/actions/query/queries";
import { DetailedProjectSkeleton } from "@/components/loader/DetailedProjectSkeleton";
import { format } from "date-fns";
import { ProjectMedia } from "@/components/shared/RenderMedia";

const DetailedProjectPage = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError } = useProjectById(id);

  const Icons = project?.technologies?.map((tech) => useTechIcon(tech)) || [];

  if (isLoading) return <DetailedProjectSkeleton />;
  if (isError) return <div>Error loading project. Please try again later.</div>;
  if (!project) return <div>Project not found.</div>;

  return (
    <div className="">
      <Card className="w-full overflow-hidden">
        <CardContent className="p-2">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:pr-6 mb-6 lg:mb-0">
              <CardHeader className="p-0 relative mb-4">
                <ProjectMedia media={project.media} alt={project.name} />
                <Badge
                  variant={
                    project.status === "Completed"
                      ? "default"
                      : project.status === "In Progress"
                      ? "secondary"
                      : "outline"
                  }
                  className="absolute top-4 right-4"
                >
                  {project.status || "N/A"}
                </Badge>
              </CardHeader>
            </div>
            <div className="lg:w-1/2">
              <div className="flex flex-col justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold mb-2 md:mt-4">
                    {project.title || "Untitled Project"}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground mb-4">
                    {project.description || "No description available."}
                  </p>
                  <div className="flex gap-2 mb-4 md:mt-0">
                    {project.liveDemo && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubRepo && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                  {/* Technologies Used */}
                  <div className="mb-6">
                    {project.technologies && project.technologies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => {
                          const Icon = Icons[index];
                          return (
                            <TooltipProvider key={tech}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge
                                    variant="secondary"
                                    className="flex items-center gap-1 px-3 py-1"
                                  >
                                    {Icon && <Icon className="w-4 h-4" />}
                                    {tech}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{tech}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No technologies listed.
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>
                        Started:{" "}
                        {format(new Date(project.startDate), "MMM dd, yyyy") ||
                          "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>Duration: {project.duration || "N/A"}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      <span>Views: {project.views || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Project Details */}
          <div className="mb-6 p-2">
            <h3 className="text-xl font-semibold mb-2">Project Details</h3>
            {project.longDescription ? (
              <MarkdownRenderer content={project.longDescription} />
            ) : (
              <p className="text-sm text-muted-foreground">
                No project details available.
              </p>
            )}
          </div>

          {/* Key Features and Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Key Features</h3>
              {project.keyFeatures && project.keyFeatures.length > 0 ? (
                <ul className="list-disc list-inside">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="text-muted-foreground">
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No key features listed.
                </p>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Challenges & Solutions
              </h3>
              {project.challenges && project.challenges.length > 0 ? (
                <ul className="list-disc list-inside">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-muted-foreground">
                      {challenge}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No challenges listed.
                </p>
              )}
            </div>
          </div>

          {/* Lessons Learned */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Lessons Learned</h3>
            {project.lessons && project.lessons.length > 0 ? (
              <ul className="list-disc list-inside">
                {project.lessons.map((lesson, index) => (
                  <li key={index} className="text-muted-foreground">
                    {lesson}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No lessons listed.
              </p>
            )}
          </div>

          {/* GitHub Stats */}
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">GitHub Stats</h3>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" /> {project.stars || 0} stars
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" /> {project.forks || 0} forks
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Last updated:{" "}
                {format(new Date(project.updatedAt), "MMM dd, yyyy") || "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedProjectPage;
