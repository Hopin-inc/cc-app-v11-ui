import Image from "next/image";
import Link from "next/link";
import { type RelatedArticle } from "@/types";

type RelatedArticlesProps = {
  articles: RelatedArticle[];
};

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">関連記事</h2>
      <div className="grid gap-4">
        {articles.map((article) => (
          <Link
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:bg-muted/10 transition-all duration-200">
              <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {article.type === "interview" ? "INTERVIEW" : "ARTICLE"}
                  </span>
                </div>
                <h3 className="font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
