import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"
import { useTechIcon } from "@/hooks/useTechIcon"
import { ExternalLink, Github, Star, GitFork, Eye } from "lucide-react"
import placeholder from "/assets/images/project-placeholder.svg"
import { ProjectCardProps } from "../../../utils/type"

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  image,
  technologies,
  liveDemo,
  githubRepo,
  status,
  lastUpdated,
  stars,
  forks,
  views,
}) => {
  const Icons = technologies.map((tech) => useTechIcon(tech))

  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="p-0">
        <Image
          src={placeholder || "/placeholder.svg"}
          alt={name}
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg dark:filter dark:invert"
        />
        <Badge
          variant={
            status === "Completed"
              ? "default"
              : status === "In Progress"
              ? "secondary"
              : "outline"
          }
          className="absolute top-2 right-2"
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-2">{name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => {
            const Icon = Icons[index]
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
            )
          })}
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row gap-2 justify-between items-center">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" /> {stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-4 h-4" /> {forks}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> {views}
          </span>
        </div>
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
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
