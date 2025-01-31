"use client";

import { useState } from "react";
import Image from "next/image";
import { format, isPast } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { EditProfileModal } from "@/components/edit-profile-modal";
import {
  mockInvitationOpportunities,
  mockUser,
  mockProjects,
} from "@/lib/data";
import OpportunityCard from "@/components/OpportunityCard";
import type { Opportunity } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockBBQOpportunity = mockInvitationOpportunities[0];

// This would typically come from an API
const user = mockUser;

type GroupedSessions = {
  [date: string]: Opportunity[];
};

const TABS = [
  { value: "all", label: "すべて" },
  { value: "EVENT", label: "イベント" },
  { value: "QUEST", label: "クエスト" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

export default function MyPage() {
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>("all");

  // Filter sessions by type
  const filteredSessions = user.appliedSessions.filter((session) =>
    activeTab === "all" ? true : session.type === activeTab
  );

  // Group sessions by date
  const groupedSessions = filteredSessions.reduce<GroupedSessions>(
    (acc, session) => {
      const date = format(new Date(session.startsAt), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(session);
      return acc;
    },
    {}
  );

  // Sort sessions by date and time
  Object.keys(groupedSessions).forEach((date) => {
    groupedSessions[date].sort(
      (a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime()
    );
  });

  // Get current time for checking past events
  const now = new Date();

  const handleRejectInvitation = (id: string) => {
    console.log(`Reject invitation ${id}`);
  };

  const handleAcceptInvitation = (id: string) => {
    console.log(`Accept invitation ${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-3xl">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={user.image || "/placeholder.svg"}
              alt={user.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground mt-1">{user.bio}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditProfileOpen(true)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            編集
          </Button>
        </div>

        {/* Activity Summary */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">活動サマリー</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Participation Status */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-3">参加状況</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      イベント参加
                    </span>
                    <span className="font-medium">
                      {
                        user.appliedSessions.filter((s) => s.type === "EVENT")
                          .length
                      }
                      回
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      クエスト完了
                    </span>
                    <span className="font-medium">
                      {
                        user.appliedSessions.filter((s) => s.type === "QUEST")
                          .length
                      }
                      回
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      活動地域
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {
                          Array.from(
                            new Set(
                              user.projects.map((p) => p.location.prefecture)
                            )
                          ).length
                        }
                        県
                      </span>
                      <span className="text-xs text-muted-foreground">
                        （
                        {Array.from(
                          new Set(
                            user.projects.map((p) => p.location.prefecture)
                          )
                        ).join("・")}
                        ）
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-3">最近の活動</h3>
                <div className="space-y-3">
                  {user.appliedSessions
                    .sort(
                      (a, b) =>
                        new Date(b.startsAt).getTime() -
                        new Date(a.startsAt).getTime()
                    )
                    .slice(0, 3)
                    .map((session) => {
                      const project = mockProjects.find(
                        (p) => p.id === session.projectId
                      );
                      return (
                        <div
                          key={session.id}
                          className="flex items-start gap-3"
                        >
                          <div className="w-8 h-8 relative shrink-0">
                            <Image
                              src={project?.icon ?? "/placeholder.svg"}
                              alt={project?.title ?? ""}
                              width={32}
                              height={32}
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {session.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(
                                new Date(session.startsAt),
                                "yyyy/MM/dd",
                                { locale: ja }
                              )}
                            </p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {session.type === "EVENT" ? "イベント" : "クエスト"}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Project Engagement */}
            <Card className="md:col-span-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm">プロジェクト別の関わり</h3>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                    {user.projects.length}つ
                  </span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {user.projects.map((project) => {
                    const projectSessions = user.appliedSessions.filter(
                      (s) => s.projectId === project.id
                    );
                    const points = user.points?.[project.id] ?? 0;
                    return (
                      <div
                        key={project.id}
                        className="flex items-start gap-3 min-w-[240px]"
                      >
                        <div className="w-8 h-8 relative shrink-0">
                          <Image
                            src={project.icon ?? "/placeholder.svg"}
                            alt={project.title}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {project.title}
                          </p>
                          <div className="flex gap-3 mt-1">
                            <p className="text-xs text-muted-foreground">
                              イベント{" "}
                              {
                                projectSessions.filter((s) => s.type === "EVENT")
                                  .length
                              }
                              回
                            </p>
                            <p className="text-xs text-muted-foreground">
                              クエスト{" "}
                              {
                                projectSessions.filter((s) => s.type === "QUEST")
                                  .length
                              }
                              回
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-baseline gap-1">
                              <span className="text-sm font-medium text-primary">
                                {points.available}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                pt 利用可能
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">/</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-sm font-medium">
                                {points.total}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                pt 累計
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Invitations */}
        {user.invitations.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">招待されている関わり</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {user.invitations.map((invitation) => {
                const opportunity = mockBBQOpportunity;
                const project = mockProjects.find(
                  (p) => p.id === opportunity.projectId
                );
                if (!project) return null;

                return (
                  <div
                    key={invitation.id}
                    className="relative min-w-[280px] bg-card rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-200"
                  >
                    {/* Ticket stub dots */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 flex flex-col gap-1 px-0.5">
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                    </div>

                    <div className="p-4">
                      {/* Project info */}
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 relative shrink-0">
                          <Image
                            src={project.icon ?? "/placeholder.svg"}
                            alt={project.title}
                            width={48}
                            height={48}
                            className="rounded-xl"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">
                            {project.title}
                          </p>
                          <h3 className="font-bold text-base truncate mt-0.5">
                            {opportunity.title}
                          </h3>
                        </div>
                      </div>

                      {/* Date and location */}
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>
                          {format(
                            new Date(opportunity.startsAt),
                            "M/d (E) HH:mm",
                            {
                              locale: ja,
                            }
                          )}
                        </span>
                        <span>@</span>
                        <span className="truncate">{`${project.location.prefecture}${project.location.city}`}</span>
                      </div>

                      {/* Points and action */}
                      <div className="mt-4 pt-4 border-t border-dashed flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-primary">
                            - {invitation.requiredPoints}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            pt
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          承認する
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Applied Sessions */}
        <div>
          <h2 className="text-xl font-bold mb-4">地域との関わり</h2>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabValue)}
          >
            <TabsList className="mb-6">
              {TABS.map((tab) => {
                const count =
                  tab.value === "all"
                    ? user.appliedSessions.length
                    : user.appliedSessions.filter((s) => s.type === tab.value)
                        .length;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="relative"
                  >
                    {tab.label}
                    <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      {count}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <div className="space-y-8">
              {Object.entries(groupedSessions)
                .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
                .map(([date, sessions]) => (
                  <div key={date} className="space-y-4">
                    <h3 className="font-medium text-muted-foreground">
                      {format(new Date(date), "M月d日(E)", { locale: ja })}
                    </h3>
                    <div className="space-y-4">
                      {sessions.map((session) => (
                        <OpportunityCard
                          key={session.id}
                          session={{
                            ...session,
                            status: isPast(new Date(session.startsAt))
                              ? "closed"
                              : session.status,
                          }}
                          isJoined={true}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </Tabs>
        </div>

        <EditProfileModal
          open={isEditProfileOpen}
          onOpenChange={setIsEditProfileOpen}
          user={{
            name: user.name,
            bio: user.bio,
          }}
        />
      </div>
    </div>
  );
}
