"use client";

import { ContentList } from "@/components/shared/ContentList";
import { Article } from "@/types";
import { useEffect, useState } from "react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // TODO: Fetch articles from API
    setArticles([]);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">記事一覧</h1>
      <ContentList type="ARTICLE" items={articles} />
    </div>
  );
}
