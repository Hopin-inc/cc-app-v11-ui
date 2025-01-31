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
import type { Opportunity, Project } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockBBQOpportunity = mockInvitationOpportunities[0];

// This would typically come from an API
const user = mockUser;
const CURRENT_USER_ID = "user1"; // Simulating current user ID

type GroupedSessions = {
  [date: string]: Opportunity[];
};

const TABS = [
  { value: "all", label: "すべて" },
  { value: "EVENT", label: "イベント" },
  { value: "QUEST", label: "クエスト" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

const ProjectCard = ({
  project,
  sessions,
  points,
}: {
  project: Project;
  sessions: Opportunity[];
  points: { available: number; total: number } | undefined;
}) => {
  const eventCount = sessions.filter((s) => s.type === "EVENT").length;
  const questCount = sessions.filter((s) => s.type === "QUEST").length;

  return (
    <div className="flex items-start gap-3 min-w-[240px]">
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
        <p className="text-sm font-medium truncate">{project.title}</p>
        <div className="flex gap-3 mt-1">
          <p className="text-xs text-muted-foreground">
            イベント {eventCount}回
          </p>
          <p className="text-xs text-muted-foreground">
            クエスト {questCount}回
          </p>
        </div>
        {points && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-medium text-primary">
                {points.available}
              </span>
              <span className="text-xs text-muted-foreground">pt 利用可能</span>
            </div>
            <span className="text-xs text-muted-foreground">/</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-medium">{points.total}</span>
              <span className="text-xs text-muted-foreground">pt 累計</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MyPage({
  searchParams,
}: {
  searchParams?: { userId?: string };
}) {
  const userId = searchParams?.userId ?? CURRENT_USER_ID;
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const isOwner = userId === CURRENT_USER_ID;

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
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditProfileOpen(true)}
            >
              <Pencil className="w-4 h-4 mr-2" />
              編集
            </Button>
          )}
        </div>

        {/* Invitations */}
        {isOwner && user.invitations.length > 0 && (
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
                    className="relative min-w-[280px] bg-card rounded-lg overflow-hidden group hover:bg-muted/50 hover:shadow-sm transition-all duration-200"
                  >
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
                          <h3 className="font-bold text-base truncate mt-0.5 group-hover:text-primary">
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
          {/* Project Engagement */}
          <Card className="md:col-span-2 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">コミュニティ</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                    {user.projects.length}つ
                  </span>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {user.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    sessions={user.appliedSessions.filter(
                      (s) => s.projectId === project.id
                    )}
                    points={isOwner ? user.points?.[project.id] : undefined}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
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

        {/* Modals - Only visible to owner */}
        {isOwner && (
          <>
            <EditProfileModal
              open={isEditProfileOpen}
              onOpenChange={setIsEditProfileOpen}
              user={user}
            />
          </>
        )}
      </div>
    </div>
  );
}
