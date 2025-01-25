import { ProjectCardProps } from "../../utils/type"

export const dummyProjects: ProjectCardProps[] = [
  {
    name: "E-commerce Platform",
    description:
      "A full-stack e-commerce solution with user authentication and payment integration.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["React", "Node", "TypeScript", "Java"],
    liveDemo: "https://example-ecommerce.com",
    githubRepo: "https://github.com/username/ecommerce-platform",
    status: "Completed",
    lastUpdated: "2023-05-15",
    stars: 120,
    forks: 35,
    views: 1500,
  },
  {
    name: "Task Management App",
    description:
      "A Kanban-style task management application with real-time updates.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["Vue", "Django", "Python"],
    liveDemo: "https://task-manager-example.com",
    githubRepo: "https://github.com/username/task-management-app",
    status: "In Progress",
    lastUpdated: "2023-05-10",
    stars: 85,
    forks: 20,
    views: 950,
  },
  {
    name: "Social Media Dashboard",
    description:
      "An analytics dashboard for social media managers with data visualization.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["Angular", "Flask", "TypeScript"],
    liveDemo: "https://social-dashboard-demo.com",
    githubRepo: "https://github.com/username/social-media-dashboard",
    status: "Completed",
    lastUpdated: "2023-05-05",
    stars: 200,
    forks: 50,
    views: 2500,
  },
  {
    name: "Fitness Tracker",
    description:
      "A mobile-first fitness tracking app with workout plans and progress charts.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["React", "Rails", "JavaScript"],
    liveDemo: "https://fitness-tracker-example.com",
    githubRepo: "https://github.com/username/fitness-tracker",
    status: "In Progress",
    lastUpdated: "2023-04-30",
    stars: 150,
    forks: 40,
    views: 1800,
  },
  {
    name: "AI-powered Chatbot",
    description:
      "An intelligent chatbot for customer support with natural language processing.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["Python", "React", "TypeScript"],
    liveDemo: "https://ai-chatbot-demo.com",
    githubRepo: "https://github.com/username/ai-chatbot",
    status: "Archived",
    lastUpdated: "2023-04-25",
    stars: 300,
    forks: 75,
    views: 3500,
  },
]

export const dummyArticles = [
  {
    title: "The Future of AI in Web Development",
    excerpt:
      "Exploring how artificial intelligence is reshaping the landscape of web development and what it means for developers.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-05-15",
    readTime: "5 min read",
    tags: ["AI", "Web Development", "Future Tech"],
  },
  {
    title: "Mastering React Hooks",
    excerpt:
      "A comprehensive guide to using React Hooks effectively in your projects, with practical examples and best practices.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-05-10",
    readTime: "8 min read",
    tags: ["React", "Hooks", "JavaScript"],
  },
  {
    title: "Building Scalable APIs with GraphQL",
    excerpt:
      "Learn how to design and implement scalable APIs using GraphQL, and why it's becoming a popular alternative to REST.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-05-05",
    readTime: "6 min read",
    tags: ["GraphQL", "API", "Backend"],
  },
  {
    title: "The Rise of JAMstack",
    excerpt:
      "Discover the benefits of JAMstack architecture and how it's changing the way we build and deploy web applications.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-04-30",
    readTime: "7 min read",
    tags: ["JAMstack", "Web Architecture", "Performance"],
  },
  {
    title: "Accessibility in Modern Web Design",
    excerpt:
      "Why accessibility should be a priority in web design and development, with practical tips for creating inclusive websites.",
    image: "/placeholder.svg?height=200&width=400",
    date: "2023-04-25",
    readTime: "6 min read",
    tags: ["Accessibility", "Web Design", "UX"],
  },
]
