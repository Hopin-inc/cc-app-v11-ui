import { mockArticles, mockActivities, mockOpportunities } from "@/lib/data";
import { formatDate } from "@/lib/utils/date";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RelatedContents } from "@/components/features/article/RelatedContents";

type Props = {
  params: {
    id: string;
  };
};

export default function ArticlePage({ params }: Props) {
  const article = mockArticles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  // 関連コンテンツをランダムに取得
  const relatedActivities = [...mockActivities]
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  const relatedOpportunities = [...mockOpportunities]
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  return (
    <main className="container mx-auto py-6 space-y-8 max-w-2xl pb-24">
      <article className="px-4">
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded">
              {article.type === "activity_report"
                ? "体験レポート"
                : article.type === "interview"
                ? "インタビュー"
                : "コラム"}
            </span>
            <time className="text-sm text-muted-foreground">
              {formatDate(article.publishedAt)}
            </time>
          </div>
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <p className="text-muted-foreground">{article.description}</p>
        </div>

        <div className="relative w-full aspect-video mb-8">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="prose prose-sm max-w-none">
          {article.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="space-y-4 mt-12">
          <h2 className="text-lg font-semibold text-muted-foreground pb-2">
            書いた人
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={article.author.image}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="">{article.author.name}</div>
              {article.author.bio && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {article.author.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </article>

      <div className="px-4">
        <RelatedContents
          activities={relatedActivities}
          opportunities={relatedOpportunities}
        />
      </div>
    </main>
  );
}
