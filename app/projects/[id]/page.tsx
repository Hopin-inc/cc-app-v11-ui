"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockProjects, mockOpportunities, CURRENT_USER } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpeakerDeckEmbed } from "@/components/speaker-deck-embed";
import OpportunityCard from "@/components/OpportunityCard";
import {
  Users,
  MapPin,
  CalendarDays,
  Medal,
  Globe,
  Instagram,
  ArrowUpRight,
  Target,
  History,
  Activity,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import { isPast } from "date-fns";

export default function ProjectDetailPage() {
  const params = useParams();
  const project = mockProjects.find((p) => p.id === params.id);
  if (!project) return notFound();

  const opportunities = mockOpportunities.filter(
    (o) => o.projectId === project.id
  );
  const activeEvents = opportunities.filter(
    (o) => !isPast(new Date(o.endsAt)) && o.type === "EVENT"
  );
  const activeQuests = opportunities.filter(
    (o) => !isPast(new Date(o.endsAt)) && o.type === "QUEST"
  );
  const pastEvents = opportunities.filter(
    (o) => isPast(new Date(o.endsAt)) && o.type === "EVENT"
  );
  const pastQuests = opportunities.filter(
    (o) => isPast(new Date(o.endsAt)) && o.type === "QUEST"
  );
  const memberCount = [
    ...new Set(
      opportunities.flatMap((o) => o.participants?.map((p) => p.id) ?? [])
    ),
  ].length;

  return (
    <div className="container max-w-2xl py-6 space-y-6">
      {/* ヘッダー */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg" />
        <div className="absolute left-6 -bottom-6">
          <div className="w-24 h-24 relative shrink-0 rounded-2xl overflow-hidden ring-4 ring-background">
            <Image
              src={project.icon ?? "/placeholder.svg"}
              alt={project.title}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-8">
        <div>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Users className="w-3.5 h-3.5" />
                {memberCount}人
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Activity className="w-3.5 h-3.5" />
                {((pastEvents.length + pastQuests.length) / 6).toFixed(1)}回/月
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>
              {project.location.prefecture}
              {project.location.city}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.socialLinks?.map((link, i) => {
            const icons = {
              website: Globe,
              instagram: Instagram,
              twitter: Twitter,
              facebook: Facebook,
              youtube: Youtube,
            } as const;
            const Icon = icons[link.type];
            return (
              <Button key={i} variant="outline" size="sm" asChild>
                <Link href={link.url} target="_blank" className="gap-1.5">
                  <Icon className="w-4 h-4" />
                  <span className="capitalize">{link.type}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </Button>
            );
          })}
        </div>
      </div>

      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="about" className="gap-1.5">
            <Target className="w-4 h-4" />
            目的と展望
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1.5">
            <History className="w-4 h-4" />
            活動履歴
          </TabsTrigger>
          <TabsTrigger value="members" className="gap-1.5">
            <Users className="w-4 h-4" />
            メンバー
          </TabsTrigger>
        </TabsList>

        {/* 目的と展望 */}
        <TabsContent value="about" className="space-y-6 mt-0">
          <Card className="p-6">
            <h2 className="font-bold text-lg mb-3">プロジェクトについて</h2>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {project.description}
            </p>
          </Card>
          {project.speakerDeckEmbed && (
            <div className="space-y-3">
              <h2 className="font-bold text-lg">プロジェクト資料</h2>
              <SpeakerDeckEmbed
                title={project.speakerDeckEmbed.title}
                embedUrl={project.speakerDeckEmbed.embedUrl}
              />
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="w-5 h-5 text-primary" />
                <h2 className="font-bold">イベント募集</h2>
              </div>
              {activeEvents.length > 0 ? (
                <div className="space-y-3">
                  {activeEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/opportunities/${event.id}`}
                      className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <h3 className="font-medium line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {event.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  現在募集中のイベントはありません
                </p>
              )}
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Medal className="w-5 h-5 text-primary" />
                <h2 className="font-bold">クエスト募集</h2>
              </div>
              {activeQuests.length > 0 ? (
                <div className="space-y-3">
                  {activeQuests.map((quest) => (
                    <Link
                      key={quest.id}
                      href={`/opportunities/${quest.id}`}
                      className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <h3 className="font-medium line-clamp-1">
                        {quest.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {quest.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  現在募集中のクエストはありません
                </p>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* 活動履歴 */}
        <TabsContent value="history" className="space-y-6 mt-0">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="w-5 h-5 text-primary" />
                <h2 className="font-bold">イベント</h2>
              </div>
              <div className="text-3xl font-bold">
                {pastEvents.length}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  件
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                平均
                {Math.round(
                  pastEvents.reduce(
                    (acc, event) => acc + (event.participants?.length ?? 0),
                    0
                  ) / Math.max(pastEvents.length, 1)
                )}
                人が参加
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Medal className="w-5 h-5 text-primary" />
                <h2 className="font-bold">クエスト</h2>
              </div>
              <div className="text-3xl font-bold">
                {pastQuests.length}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  件
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                平均
                {Math.round(
                  pastQuests.reduce(
                    (acc, quest) => acc + (quest.participants?.length ?? 0),
                    0
                  ) / Math.max(pastQuests.length, 1)
                )}
                人が参加
              </p>
            </Card>
          </div>
          <div className="space-y-4">
            {[...pastEvents, ...pastQuests]
              .sort(
                (a, b) =>
                  new Date(b.startsAt).getTime() -
                  new Date(a.startsAt).getTime()
              )
              .map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  session={{
                    ...opportunity,
                    status: isPast(new Date(opportunity.startsAt))
                      ? "closed"
                      : opportunity.status,
                  }}
                  isJoined={opportunity.participants?.some(
                    (participant) => participant.id === CURRENT_USER.id
                  )}
                />
              ))}
          </div>
        </TabsContent>

        {/* メンバー */}
        <TabsContent value="members" className="space-y-6 mt-0">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-bold">メンバー概要</h2>
              </div>
              <div className="text-3xl font-bold">
                {memberCount}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  人が参加
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                月間{((pastEvents.length + pastQuests.length) / 6).toFixed(1)}
                回の活動頻度
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-primary" />
                <h2 className="font-bold">参加状況</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>平均イベント参加</span>
                  <span className="font-medium">
                    {Math.round(
                      pastEvents.reduce(
                        (acc, event) => acc + (event.participants?.length ?? 0),
                        0
                      ) / Math.max(pastEvents.length, 1)
                    )}
                    人/回
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>平均クエスト参加</span>
                  <span className="font-medium">
                    {Math.round(
                      pastQuests.reduce(
                        (acc, quest) => acc + (quest.participants?.length ?? 0),
                        0
                      ) / Math.max(pastQuests.length, 1)
                    )}
                    人/回
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="p-4 flex items-center justify-between border-b">
              <h2 className="font-bold">メンバー一覧</h2>
              <Badge variant="secondary" className="gap-1">
                <Users className="w-3.5 h-3.5" />
                {project.members.length}人
              </Badge>
            </div>
            <div className="divide-y">
              {project.members.map((member) => (
                <div key={member.id} className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 relative shrink-0 rounded-full overflow-hidden">
                    <Image
                      src={member.image ?? "/placeholder.svg"}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{member.name}</h3>
                      {member.title && (
                        <Badge variant="secondary" className="shrink-0">
                          {member.title}
                        </Badge>
                      )}
                    </div>
                    {member.title && (
                      <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {member.title}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
