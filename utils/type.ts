export interface ProjectCardProps {
  name: string
  description: string
  image: string
  technologies: string[]
  liveDemo?: string
  githubRepo?: string
  status: "In Progress" | "Completed" | "Archived"
  lastUpdated: string
  stars: number
  forks: number
  views: number
}
