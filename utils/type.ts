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

export interface UploadAndSaveImageParams {
  filePath: File
  userId: string
}

export interface GitHubData {
  stars: number
  forks: number
  lastUpdated: string
}

export interface DetailedProjectProps {
  id: string
  name: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  liveDemo?: string
  githubRepo?: string
  status: "Completed" | "In Progress" | "Archived"
  startDate: string
  endDate?: string
  duration: string
  teamSize: number
  role: string
  keyFeatures: string[]
  challenges: string[]
  lessons: string[]
  views: number
}
