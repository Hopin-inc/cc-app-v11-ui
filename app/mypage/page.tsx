"use client";

import { useState } from "react";
import Image from "next/image";
import { format, isPast } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Star } from "lucide-react";
import { EditProfileModal } from "@/components/edit-profile-modal";
import {
  mockOpportunities,
  mockInvitationOpportunities,
  mockProjects,
} from "@/lib/data";
import { dummyUser } from "@/lib/dummyUser";
import OpportunityCard from "@/components/OpportunityCard";
import type { Opportunity } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock invitation data
const mockInvitation = {
  id: "1",
  opportunityId: "bbq-1",
  hostMessage:
    "美咲さん、BBQのおもてなしメンバーとして最適だと思い、ご招待させていただきました。ぜひご参加いただけますと嬉しいです！",
  requiredPoints: 1000,
  createdAt: new Date(),
  host: {
    id: "host1",
    name: "田中健一",
    title: "プロジェクトリーダー",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=host1",
  },
};

const mockBBQOpportunity = mockInvitationOpportunities[0];

// This would typically come from an API
const user = {
  ...dummyUser,
  bio: "神戸でIT会社に勤めつつ、週末は地元の人々と交流しながら、一緒に手を動かすことを楽しんでいます。",
  points: {
    available: 1050,
    total: 1200,
  },
  badges: [
    { id: "welfare-health", level: 2 },
    { id: "tourism-culture", level: 3 },
    { id: "environment", level: 1 },
  ],
  skills: [
    { id: "event-planning", level: 3 },
    { id: "it", level: 2 },
    { id: "marketing", level: 1 },
  ],
  projects: [mockProjects[0], mockProjects[1], mockProjects[2]],
  appliedSessions: mockOpportunities.filter((session) =>
    session.participants.some((p) => p.id === "user1")
  ),
  invitations: [mockInvitation],
};

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

        {/* Points Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 justify-between w-full px-8">
                <div className="space-y-0.5">
                  <div className="text-xs text-muted-foreground">利用可能</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-medium">
                      {user.points.available}
                    </span>
                    <span className="text-xs text-muted-foreground">pt</span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-muted-foreground">総獲得</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-medium">
                      {user.points.total}
                    </span>
                    <span className="text-xs text-muted-foreground">pt</span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-muted-foreground">
                    関わったプロジェクト
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium">
                      {user.projects.length}
                    </span>
                    <div className="flex -space-x-2">
                      {user.projects.map((project) => (
                        <div
                          key={project.id}
                          className="relative w-6 h-6 rounded-full bg-background border border-border overflow-hidden"
                        >
                          <Image
                            src={project.icon ?? "/placeholder.svg"}
                            alt={project.title}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invitations */}
        {user.invitations.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">招待されている関わり</h2>
            <div className="space-y-4">
              {user.invitations.map((invitation) => {
                const opportunity = mockBBQOpportunity;
                return (
                  <Card key={invitation.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <OpportunityCard session={opportunity} />
                        <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                          <div className="flex items-start gap-3">
                            <Image
                              src={invitation.host.image}
                              alt={invitation.host.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {invitation.host.name}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {invitation.host.title}
                                </span>
                              </div>
                              <p className="text-sm mt-2">
                                {invitation.hostMessage}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="ml-14 text-xs text-muted-foreground">
                              必要ポイント: {invitation.requiredPoints} pt
                            </p>
                            <div className="flex items-center gap-2 flex-col">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleRejectInvitation(invitation.id)
                                  }
                                >
                                  また今度
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleAcceptInvitation(invitation.id)
                                  }
                                  disabled={
                                    user.points.available <
                                    invitation.requiredPoints
                                  }
                                >
                                  承認する
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

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
          skills: user.skills.map((skill) => skill.id),
          interests: user.badges.map((badge) => badge.id),
        }}
      />
    </div>
  );
}
