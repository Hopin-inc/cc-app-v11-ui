"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Share2, ArrowLeft, Clock, MapPin, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockOpportunities } from "@/lib/data";
import type { Opportunity } from "@/types";
import { ApplyModal } from "@/components/ApplyModal";
import Link from "next/link";

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const opportunity = mockOpportunities.find((w) => w.id === id) as Opportunity;

  if (!opportunity) {
    return (
      <div className="container mx-auto px-4 py-8">機会が見つかりません</div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="relative h-64 bg-muted">
        <div className="absolute top-4 left-4 z-10">
          <Link
            href="/"
            className="bg-background/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <button className="bg-background/80 backdrop-blur-sm rounded-full p-2">
            <Share2 className="h-6 w-6" />
          </button>
        </div>
        <Image
          src={opportunity.image || "/placeholder.svg"}
          alt={opportunity.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-8">
        {/* Title and Categories */}
        <div>
          <h1 className="text-2xl font-bold mb-4">{opportunity.title}</h1>
          <div className="flex flex-wrap gap-2">
            {opportunity.categories.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Opportunity Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-muted-foreground flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              開催日時
            </span>
            <span>
              {new Date(opportunity.startsAt).toLocaleString("ja-JP", {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              ~
              {new Date(opportunity.endsAt).toLocaleString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-muted-foreground flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              開催場所
            </span>
            <span>オンライン</span>
          </div>
        </div>

        {/* Host Message */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            参加者に向けたメッセージ
          </h2>
          <div className="flex items-start gap-4">
            <Image
              src={opportunity.host.image || "/placeholder.svg"}
              alt={opportunity.host.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <div className="font-medium">{opportunity.host.name}</div>
              <p className="text-muted-foreground mt-2">
                {opportunity.description}
              </p>
            </div>
          </div>
        </div>

        {/* Welcome Skills */}
        <div>
          <h2 className="text-lg font-semibold mb-4">歓迎スキル</h2>
          <div className="flex flex-wrap gap-2">
            {opportunity.skills.map((skill) => (
              <Badge key={skill.id} variant="outline">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Info */}
        {opportunity.project && (
          <div>
            <h2 className="text-lg font-semibold mb-4">関連プロジェクト</h2>
            <Link href={`/projects/${opportunity.projectId}`} className="block">
              <div className="border border-border rounded-lg p-4 hover:bg-accent transition-colors">
                <div className="flex items-center gap-4">
                  <Image
                    src={opportunity.project.icon || "/placeholder.svg"}
                    alt={opportunity.project.title}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{opportunity.project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {opportunity.project.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Related Articles */}
        {opportunity.relatedArticles &&
          opportunity.relatedArticles.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">関連記事</h2>
              <div className="space-y-4">
                {opportunity.relatedArticles.map((article) => (
                  <Card key={article.id}>
                    <CardContent className="p-4">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4"
                      >
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt=""
                          width={120}
                          height={120}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium mb-1 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {article.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Image
                              src={article.source.icon || "/placeholder.svg"}
                              alt=""
                              width={16}
                              height={16}
                              className="rounded-sm"
                            />
                            <span className="text-sm text-muted-foreground">
                              {article.source.name}
                            </span>
                          </div>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {new Date(opportunity.startsAt).toLocaleString("ja-JP", {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              ~
              {new Date(opportunity.endsAt).toLocaleString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              オンライン
            </div>
          </div>
          <Button size="lg" onClick={() => setIsApplyModalOpen(true)}>
            申し込む
          </Button>
        </div>
      </div>

      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        sessionId={opportunity.id}
        sessionTitle={opportunity.title}
      />
    </div>
  );
}
