"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import ArticleCard from "@/components/shared/article-cars"
import { dummyArticles } from "@/hooks/utils"

const Articles: React.FC = () => {
  return (
    <div className="flex-1 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">Articles</h2>
        <Button variant="outline">Add Article</Button>
      </div>
      {dummyArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyArticles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No articles yet. Click on add articles.
        </p>
      )}
    </div>
  )
}

export default Articles
