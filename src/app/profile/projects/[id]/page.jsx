"use client"
import React from "react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTechIcon } from "@/hooks/useTechIcon"
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Eye,
  Calendar,
  Clock,
} from "lucide-react"
import placeholder from "@assets/images/project-placeholder.svg"
import ReactMarkdown from "react-markdown"
import MarkdownRenderer from "@/components/shared/MarkdownRenderer"
import { content } from "@/hooks/utils"

const DetailedProjectPage = () => {
  const params = useParams()
  const project = {
    name: "E-commerce Platform",
    description:
      "A full-stack e-commerce solution with user authentication and payment integration.",
    longDescription:
      "This e-commerce platform is a comprehensive solution that allows businesses to set up their online stores quickly and efficiently. It features a robust user authentication system, seamless payment integration, and a user-friendly interface for both customers and administrators.",
    image: "/placeholder.svg?height=400&width=1200",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Mongodb",
      "Stripe",
      "Java",
      "appwrite",
      "Nextjs",
      "Playwrite",
      "Kubernetes",
    ],
    liveDemo: "https://example-ecommerce.com",
    githubRepo: "https://github.com/username/ecommerce-platform",
    status: "Completed",
    startDate: "2023-01-15",
    endDate: "2023-05-15",
    duration: "4 months",
    teamSize: 3,
    role: "Full Stack Developer",
    keyFeatures: [
      "User authentication and authorization",
      "Product catalog with search and filter functionality",
      "Shopping cart and checkout process",
      "Payment integration with Stripe",
      "Admin dashboard for managing products and orders",
    ],
    challenges: [
      "Implementing a secure and scalable authentication system",
      "Optimizing database queries for large product catalogs",
      "Ensuring a smooth and intuitive user experience across devices",
    ],
    lessons: [
      "Importance of proper state management in complex React applications",
      "Strategies for optimizing database performance in e-commerce contexts",
      "Best practices for implementing secure payment gateways",
    ],
    views: 1500,
  }
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const Icons = project?.technologies.map((tech) => useTechIcon(tech)) || []

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading project details</div>
  if (!project) return <div>Project not found</div>

  return (
    <div className="container mx-auto ">
      <Card className="w-full overflow-hidden">
        <CardHeader className="p-0 relative">
          <Image
            src={placeholder || "/placeholder.svg"}
            alt={project.name}
            width={1200}
            height={400}
            className="w-full h-64 object-cover rounded-t-lg dark:filter dark:invert"
          />
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
            {project.status}
          </Badge>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {project.name}
              </CardTitle>
              <p className="text-lg text-muted-foreground mb-4">
                {project.description}
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Started: {project.startDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>Duration: {project.duration}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              <span>Views: {project.views}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => {
                const Icon = Icons[index]
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
                )
              })}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Project Details</h3>
            <p className="text-muted-foreground">
              {" "}
              <MarkdownRenderer content={content} />;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Challenges & Solutions
              </h3>
              <ul className="list-disc list-inside">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-muted-foreground">
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Lessons Learned</h3>
            <ul className="list-disc list-inside">
              {project.lessons.map((lesson, index) => (
                <li key={index} className="text-muted-foreground">
                  {lesson}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">GitHub Stats</h3>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" /> 5 stars
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" /> 10 forks
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Last updated: 2023-01-15
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DetailedProjectPage
