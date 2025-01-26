import type { IconType } from "react-icons"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"

const techIcons: { [key: string]: IconType } = {
  React: FaIcons.FaReact,
  Node: FaIcons.FaNodeJs,
  Python: FaIcons.FaPython,
  Vue: FaIcons.FaVuejs,
  Angular: FaIcons.FaAngular,
  TypeScript: FaIcons.FaCode,
  JavaScript: FaIcons.FaJs,
  Rails: FaIcons.FaGem,
  Django: FaIcons.FaPython,
  Flask: FaIcons.FaFlask,
  GitHub: FaIcons.FaGithub, // GitHub icon
  Docker: FaIcons.FaDocker,
  Java: FaIcons.FaJava, // Java icon
  Swift: FaIcons.FaApple, // Placeholder for Swift
  MongoDB: FaIcons.FaDatabase, // Placeholder for MongoDB
  MySQL: FaIcons.FaDatabase, // Placeholder for MySQL
  Firebase: FaIcons.FaFire, // Placeholder for Firebase
  GraphQL: FaIcons.FaProjectDiagram, // Placeholder for GraphQL
  Kubernetes: FaIcons.FaDocker, // Placeholder for Kubernetes
  AWS: FaIcons.FaAws, // AWS icon
  Azure: FaIcons.FaMicrosoft, // Placeholder for Azure
  GCP: FaIcons.FaGoogle, // Placeholder for Google Cloud Platform
  Vagrant: FaIcons.FaBox, // Placeholder for Vagrant
  Redis: FaIcons.FaDatabase, // Placeholder for Redis
  ElasticSearch: FaIcons.FaSearch, // Placeholder for ElasticSearch
  Terraform: FaIcons.FaCode, // Placeholder for Terraform
  Nginx: FaIcons.FaServer, // Placeholder for Nginx
  KubernetesAlt: FaIcons.FaDocker, // Placeholder for Kubernetes Alt
  AWSCloud: FaIcons.FaAws, // Placeholder for AWS Cloud
  DockerLine: FaIcons.FaDocker, // Placeholder for Docker Line
  Cloud: FaIcons.FaCloud, // Placeholder for Cloud
  GitBranch: FaIcons.FaCodeBranch, // Placeholder for Git Branch
  Server: FaIcons.FaServer, // Placeholder for Server
  CodeSSlash: FaIcons.FaCode, // Placeholder for Code Slash
  Nextjs: FaIcons.FaReact, // Placeholder for Next.js
}

export function useTechIcon(techName: string): IconType | null {
  const formattedTechName =
    techName.charAt(0).toUpperCase() + techName.slice(1).toLowerCase()

  // First, check if the icon is in our predefined list
  if (formattedTechName in techIcons) {
    return techIcons[formattedTechName]
  }

  // If not, try to find a matching icon in FaIcons or IoIcons
  const faIconName = `Fa${formattedTechName}`
  const ioIconName = `Io${formattedTechName}`

  if (faIconName in FaIcons) {
    return (FaIcons as any)[faIconName]
  }

  if (ioIconName in IoIcons) {
    return (IoIcons as any)[ioIconName]
  }

  return null
}
