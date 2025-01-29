"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Share2,
  ArrowLeft,
  Clock,
  MapPin,
  ChevronRight,
  Calendar,
  Trophy,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockOpportunities } from "@/lib/data";
import type { Opportunity } from "@/types";
import { ApplyModal } from "@/components/ApplyModal";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { getCategoryEmoji } from "@/lib/utils/emoji-mapper";

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const opportunity = mockOpportunities.find((w) => w.id === id) as Opportunity;
  const isEvent = opportunity?.type === "EVENT";
  const emoji = getCategoryEmoji(opportunity?.categories || []);

  if (!opportunity) {
    return (
      <div className="container mx-auto px-4 py-8">機会が見つかりません</div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      {isEvent ? (
        <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="absolute top-4 left-4 z-10">
            <Link
              href="/"
              className="bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <button className="bg-white/80 backdrop-blur-sm rounded-full p-2">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute -bottom-8 left-8">
            <div className="w-24 h-24 rounded-xl bg-white shadow-md flex items-center justify-center text-4xl">
              {emoji}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-4 left-4 z-10">
            <Link
              href="/"
              className="bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <button className="bg-white/80 backdrop-blur-sm rounded-full p-2">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
          <div className="bg-yellow-500/10 px-6 py-4 flex flex-col gap-4 border-b border-yellow-500/30">
            <div className="mt-14 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                  クエスト
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-700" />
                <span className="text-lg font-bold text-yellow-700">
                  獲得トークン: 100pt
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold">{opportunity.title}</h1>
            <div className="flex flex-wrap gap-2">
              {opportunity.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="bg-yellow-500/10 text-yellow-700"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`px-4 py-6 space-y-8 ${isEvent ? "pt-12" : ""}`}>
        {/* Opportunity Info */}
        <div
          className={`space-y-2 rounded-lg border ${
            isEvent ? "border-border" : "border-yellow-500/30"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-muted-foreground flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              開催日
            </span>
            <span>
              {format(new Date(opportunity.startsAt), "M月d日(E)", {
                locale: ja,
              })}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-muted-foreground flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              時間
            </span>
            <span>
              {format(new Date(opportunity.startsAt), "HH:mm", { locale: ja })}{" "}
              - {format(new Date(opportunity.endsAt), "HH:mm", { locale: ja })}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-muted-foreground flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              開催場所
            </span>
            <span>オンライン</span>
          </div>
          {!isEvent && (
            <div className="flex items-center justify-between p-4">
              <span className="text-muted-foreground flex items-center">
                <Users className="mr-2 h-4 w-4" />
                募集人数
              </span>
              <span>2名</span>
            </div>
          )}
        </div>

        {/* Host Message */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {isEvent
              ? "参加にあたってのメッセージ"
              : "参加にあたってのメッセージ"}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Image
                  src={opportunity.host.image || "/placeholder.svg"}
                  alt={opportunity.host.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium mb-2">{opportunity.host.name}</p>
                  <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                    {opportunity.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Required Skills */}
        {opportunity.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              {isEvent ? "関連スキル" : "必要なスキル"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {opportunity.skills.map((skill) => (
                <span
                  key={skill.id}
                  className={`text-sm px-3 py-1 rounded-full ${
                    isEvent ? "bg-muted" : "bg-yellow-500/5 text-yellow-700"
                  }`}
                >
                  #{skill.name}
                </span>
              ))}
            </div>
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
                      <div className="flex items-center gap-4">
                        <Image
                          src={article.source.icon}
                          alt={article.source.name}
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{article.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {article.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* Fixed Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <Button
          className={`w-full ${
            isEvent
              ? "bg-primary hover:bg-primary/90"
              : "bg-yellow-500 hover:bg-yellow-500/90"
          }`}
          onClick={() => setIsApplyModalOpen(true)}
        >
          {isEvent ? "イベントに参加する" : "クエストに応募する"}
        </Button>
      </div>

      <ApplyModal
        isOpen={isApplyModalOpen}
        onOpenChange={setIsApplyModalOpen}
        opportunity={opportunity}
      />
    </div>
  );
}
