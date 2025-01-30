"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  Globe,
  Share2,
} from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ApplyModal } from "@/components/ApplyModal";
import { mockOpportunities, mockProjects } from "@/lib/data";
import { useParams } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";

export default function OpportunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = useParams();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const opportunity = mockOpportunities.find((o) => o.id === id);
  const project = opportunity
    ? mockProjects.find((p) => p.id === opportunity.projectId)
    : null;

  const isEvent = opportunity?.type === "EVENT";

  const handleApply = useCallback(() => {
    setIsApplyModalOpen(true);
  }, []);

  if (!opportunity) {
    return <div>Not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-64 bg-gradient-to-b from-green-800 to-green-900">
        <div className="absolute inset-0">
          <Image
            src={opportunity.image || "/placeholder.svg"}
            alt={opportunity.title}
            fill
            className="object-cover opacity-20"
          />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-black/80">
              <ChevronLeft className="h-4 w-4 mr-1" />
              戻る
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="relative -mt-8 bg-background rounded-t-3xl">
        <div className="container max-w-2xl mx-auto px-8 py-6 space-y-8">
          {/* Title Section */}
          <div className="mb-8">
            {project?.title && (
              <Link href={`/projects/${project.id}`}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 hover:text-primary">
                  <Image
                    src={"/placeholder.svg"}
                    alt={project.title}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>{project.title}</span>
                </div>
              </Link>
            )}

            <h1 className="text-2xl font-bold mb-4">{opportunity.title}</h1>

            {/* Event Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(new Date(opportunity.startsAt), "yyyy年M月d日(E)", {
                    locale: ja,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(new Date(opportunity.startsAt), "HH:mm", {
                    locale: ja,
                  })}
                  {" - "}
                  {format(new Date(opportunity.endsAt), "HH:mm", {
                    locale: ja,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {opportunity?.location?.isOnline ? (
                  <Globe className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                )}
                <span>{opportunity?.location?.name}</span>
              </div>
            </div>
          </div>

          {/* Recommended For */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">こんな方におすすめ</h2>
            <ul className="space-y-2">
              {opportunity.recommendedFor.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="mt-1">
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Info */}
          <div className="space-y-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">
                {isEvent ? "イベント詳細" : "クエスト詳細"}
              </h2>
              <div className="prose prose-sm max-w-none">
                {opportunity.description.split("\n").map((line, i) => (
                  <p key={i} className="mb-4">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Speaker/Host Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {isEvent ? "スピーカーの紹介" : "ホストの紹介"}
            </h2>
            <div className="flex items-start space-x-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={opportunity.host.image || "/placeholder.svg"}
                  alt={opportunity.host.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{opportunity.host.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {opportunity.host.title}
                </p>
                <p className="text-sm">{opportunity.host.bio}</p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {opportunity.relatedArticles &&
            opportunity.relatedArticles.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">関連記事</h2>
                <div className="space-y-4">
                  {opportunity.relatedArticles.map((article, index) => (
                    <a
                      key={index}
                      href={article.url}
                      className="block p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-start space-x-4">
                        {article.image && (
                          <div className="relative h-24 w-24 flex-shrink-0">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                              {article.type === "interview"
                                ? "INTERVIEW"
                                : "ARTICLE"}
                            </span>
                          </div>
                          <h3 className="font-medium mb-1">{article.title}</h3>
                          {article.description && (
                            <p className="text-sm text-muted-foreground">
                              {article.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>

      <div className="h-16" />

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
        <div className="container max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Button
            variant="default"
            size="lg"
            className="flex-1 max-w-xs"
            onClick={() => setShowApplyDialog(true)}
          >
            {opportunity?.type === "EVENT" ? "参加する" : "応募する"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-4"
            onClick={() => {
              // シェア機能の実装（例：URLをクリップボードにコピー）
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <ApplyModal
          isOpen={showApplyDialog}
          onOpenChange={setShowApplyDialog}
          opportunity={opportunity}
        />
      </Dialog>
    </div>
  );
}
