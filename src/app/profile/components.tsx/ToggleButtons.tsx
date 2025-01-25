"use client"

import { Button } from "@/components/ui/button"
import type React from "react"

interface ToggleButtonsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex gap-2 mb-5">
      <Button
        onClick={() => setActiveTab("projects")}
        variant={activeTab === "projects" ? "default" : "outline"}
      >
        Projects
      </Button>
      <Button
        onClick={() => setActiveTab("articles")}
        variant={activeTab === "articles" ? "default" : "outline"}
      >
        Articles
      </Button>
    </div>
  )
}

export default ToggleButtons
