"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useTechIcon } from "@/hooks/useTechIcon";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Eye,
  BriefcaseIcon,
} from "lucide-react";
import placeholder from "@assets/images/project-placeholder.svg";
import type { ProjectCardProps } from "../../../utils/type";
import { fetchGitHubData } from "@/app/actions/github";
import Link from "next/link";
import { format } from "date-fns";
import { ProjectMedia } from "./RenderMedia";

const ProjectCard: React.FC<any> = ({
  id,
  title,
  description,
  media,
  technologies = [],
  liveDemo,
  githubRepo,
  status,
  views = 0,
  updatedAt,
}) => {
  const [repoData, setRepoData] = useState<{
    stars: number;
    forks: number;
    lastUpdated: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const Icons: (React.ComponentType<{ className: string }> | null)[] =
    technologies?.map((tech: string) => useTechIcon(tech));

  useEffect(() => {
    const fetchRepoData = async () => {
      if (githubRepo) {
        const [, , , owner, repo] = githubRepo?.split("/") || [];
        if (owner && repo) {
          setIsLoading(true);
          try {
            const data = await fetchGitHubData(owner, repo);
            setRepoData({
              stars: data.stars || 0,
              forks: data.forks || 0,
              lastUpdated: data.lastUpdated || "N/A",
            });
            setIsError(false);
          } catch (error) {
            setIsError(true);
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    fetchRepoData();
  }, [githubRepo]);

  return (
    <Card className="w-full flex flex-col overflow-hidden">
      <CardHeader className="p-0 relative">
        <Link href={`/profile/project/${id}`}>
          <ProjectMedia media={media} alt={title} />
          <Badge
            variant={
              status === "Completed"
                ? "secondary"
                : status === "In Progress"
                ? "secondary"
                : "destructive"
            }
            className="absolute top-2 right-2"
          >
            {status}
          </Badge>
        </Link>
        <div className="absolute top-0 left-3 bg-indigo-600 text-white px-3 py-1 flex items-center gap-1 rounded-md shadow-md">
          <BriefcaseIcon className="w-4 h-4" />
          <span className="text-xs font-semibold">Project</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/profile/project/${id}`}>
          <CardTitle className="text-lg font-semibold mb-2 underline">
            {title}
          </CardTitle>
        </Link>

        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {technologies.slice(0, 3).map((tech: string, index: number) => {
            const Icon = Icons[index];
            return (
              <TooltipProvider key={tech}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
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
        <div className="text-sm text-muted-foreground mb-2">
          Last updated: {format(new Date(updatedAt), "MMM dd, yyyy") || "NA"}
        </div>
        {isLoading ? (
          <p className="text-sm text-muted-foreground mb-2">
            Loading GitHub data...
          </p>
        ) : isError ? (
          <p className="text-sm text-gray-400 mb-2">
            Error fetching GitHub data
          </p>
        ) : repoData ? (
          <>
            <div className="flex gap-4 text-sm text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" /> {repoData.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" /> {repoData.forks}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> {views}
              </span>
            </div>
          </>
        ) : null}
        <div className="flex gap-2">
          {liveDemo && (
            <Button variant="outline" size="sm" asChild>
              <a href={liveDemo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          {githubRepo && (
            <Button variant="outline" size="sm" asChild>
              <a href={githubRepo} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
