"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useTechIcon } from "@/hooks/useTechIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, LinkIcon, Share2Icon } from "lucide-react";
import { dummyArticles } from "../../../../../utils/data";
import ArticleCard from "@/components/shared/article-cards";

const DetailedArticlePage = () => {
  const params = useParams();
  const article = {
    id: "1",
    title: "Introduction to React Hooks",
    excerpt:
      "Learn about the power of React Hooks and how they can simplify your code.",
    content:
      "React Hooks are a powerful feature introduced in React 16.8. They allow you to use state and other React features without writing a class. This means you can use React without classes. The most commonly used hooks are useState, useEffect, and useContext. useState allows you to add state to functional components. useEffect lets you perform side effects in function components. useContext makes it easy to pass data through the component tree without having to pass props down manually at every level.",
    author: "Jane Doe",
    date: "2023-05-15",
    tags: ["React", "JavaScript", "Web Development"],
    readTime: "5 min read",
    references: [
      { title: "Official React Hooks Docs", url: "https://react.dev/" },
      {
        title: "Understanding useEffect",
        url: "https://react.dev/reference/react/useEffect",
      },
    ],
    relatedArticles: [
      {
        title: "State Management with Redux",
        url: "/articles/redux-state-management",
      },
      {
        title: "Advanced React Patterns",
        url: "/articles/advanced-react-patterns",
      },
    ],
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading article</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <div>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Articles
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{article.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <span>{article.author}</span>
            <span>•</span>
            <span className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              {article.readTime}
            </span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">{article.excerpt}</p>
          <div className="prose max-w-none">{article.content}</div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Share This Article */}
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Share this article:
            </span>
            <div className="flex space-x-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${article.title}&url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* References & Useful Links */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold">References & Useful Links</h3>
            <ul className="list-disc list-inside mt-2 space-y-2 text-blue-500">
              {article.references.map((ref) => (
                <li key={ref.url}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Read More Section */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold">Related Articles</h3>
            <ul className="mt-2 space-y-2">
              {dummyArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {dummyArticles.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No articles yet. Click on add articles.
                </p>
              )}
            </ul>
          </div>

          {/* Back to Articles Button */}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedArticlePage;
