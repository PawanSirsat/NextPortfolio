import type { IconType } from "react-icons"
import * as FaIcons from "react-icons/fa"
import * as SiIcons from "react-icons/si"

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
}

export function useTechIcon(techName: string): IconType | null {
  // First, check if the icon is in our predefined list
  if (techName in techIcons) {
    return techIcons[techName]
  }

  // If not, try to find a matching icon in FaIcons or SiIcons
  const faIconName = `Fa${techName}`
  const siIconName = `Si${techName}`

  if (faIconName in FaIcons) {
    return (FaIcons as any)[faIconName]
  }

  if (siIconName in SiIcons) {
    return (SiIcons as any)[siIconName]
  }

  // If no matching icon is found, return null
  return null
}
