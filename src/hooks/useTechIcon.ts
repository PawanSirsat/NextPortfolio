import type { IconType } from "react-icons"
import * as FaIcons from "react-icons/fa"
import * as SiIcons from "react-icons/si"
import * as DiIcons from "react-icons/di"
import * as MdIcons from "react-icons/md"
import * as GrIcons from "react-icons/gr"
import * as RiIcons from "react-icons/ri"

const techIcons: { [key: string]: IconType } = {
  React: FaIcons.FaReact,
  Node: FaIcons.FaNodeJs,
  Python: FaIcons.FaPython,
  Vue: FaIcons.FaVuejs,
  Angular: FaIcons.FaAngular,
  TypeScript: SiIcons.SiTypescript,
  JavaScript: SiIcons.SiJavascript,
  Rails: SiIcons.SiRubyonrails,
  Django: SiIcons.SiDjango,
  Flask: SiIcons.SiFlask,
  GitHub: GrIcons.GrGithub, // GitHub icon
  Docker: DiIcons.DiDocker, // Docker icon
  Java: FaIcons.FaJava, // Java icon
  Swift: FaIcons.FaSwift, // Swift icon
  MongoDB: DiIcons.DiMongodb, // MongoDB icon
  MySQL: DiIcons.DiMysql, // MySQL icon
  Firebase: SiIcons.SiFirebase, // Firebase icon
  GraphQL: SiIcons.SiGraphql, // GraphQL icon
  Kubernetes: SiIcons.SiKubernetes, // Kubernetes icon
  AWS: DiIcons.DiAws, // AWS icon
  Azure: SiIcons.SiAzure, // Azure icon
  GCP: DiIcons.DiGcp, // Google Cloud Platform icon
  Vagrant: DiIcons.DiVagrant, // Vagrant icon
  Redis: DiIcons.DiRedis, // Redis icon
  ElasticSearch: DiIcons.DiElasticsearch, // ElasticSearch icon
  Terraform: DiIcons.DiTerraform, // Terraform icon
  // New icons from RiIcons
  Nginx: RiIcons.RiNginxLine, // Nginx icon
  KubernetesAlt: RiIcons.RiKubernetesLine, // Kubernetes Alt icon
  AWSCloud: MdIcons.RiAwsLine, // AWS Cloud icon
  DockerLine: RiIcons.RiDockerLine, // Docker Line icon
  Cloud: RiIcons.RiCloudLine, // Cloud icon
  GitBranch: RiIcons.RiGitBranchLine, // Git Branch icon
  Server: RiIcons.RiServerLine, // Server icon
  CodeSSlash: RiIcons.RiCodeSSlashLine, // Code Slash icon
  Nextjs: RiIcons.RiNextjsFill, // Next.js icon (special case)
}

export function useTechIcon(techName: string): IconType | null {
  const formattedTechName =
    techName.charAt(0).toUpperCase() + techName.slice(1).toLowerCase()

  // First, check if the icon is in our predefined list
  if (formattedTechName in techIcons) {
    return techIcons[formattedTechName]
  }

  // If not, try to find a matching icon in FaIcons, SiIcons, DiIcons, MdIcons, or RiIcons
  const faIconName = `Fa${formattedTechName}`
  const siIconName = `Si${formattedTechName}`
  const diIconName = `Di${formattedTechName}`
  const mdIconName = `Md${formattedTechName}`
  const riIconName = `Ri${formattedTechName}`

  // Special case for Next.js
  if (formattedTechName === "Nextjs" && "Nextjs" in techIcons) {
    return techIcons.Nextjs
  }

  if (faIconName in FaIcons) {
    return (FaIcons as any)[faIconName]
  }

  if (siIconName in SiIcons) {
    return (SiIcons as any)[siIconName]
  }

  if (diIconName in DiIcons) {
    return (DiIcons as any)[diIconName]
  }

  if (mdIconName in MdIcons) {
    return (MdIcons as any)[mdIconName]
  }

  if (riIconName in RiIcons) {
    return (RiIcons as any)[riIconName]
  }

  return null
}
