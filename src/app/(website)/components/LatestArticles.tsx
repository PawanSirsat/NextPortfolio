import React from "react";
import { dummyArticles } from "../../../../utils/data";
import ArticleCard from "@/components/shared/article-cards";

const LatestArticles = () => {
  return (
    <>
      <h2 className="mb-6 mt-6 text-xl font-bold text-left">Latest Articles</h2>
      <div className="relative">
        <div className="flex overflow-x-scroll space-x-6 scrollbar-hide">
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
      </div>
    </>
  );
};

export default LatestArticles;
