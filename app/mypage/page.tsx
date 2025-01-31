"use client";

import { useState } from "react";
import Image from "next/image";
import { format, isPast } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { PointsModal } from "@/components/points-modal";
import { EditProfileModal } from "@/components/edit-profile-modal";
import { mockOpportunities } from "@/lib/data";
import { dummyUser } from "@/lib/dummyUser";
import OpportunityCard from "@/components/OpportunityCard";
import type { Opportunity } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This would typically come from an API
const user = {
  ...dummyUser,
  bio: "神戸でIT会社に勤めつつ、週末は地元の人々と交流しながら、一緒に手を動かすことを楽しんでいます。",
  points: {
    available: 500,
    total: 1500,
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

  appliedSessions: mockOpportunities.filter((session) =>
    session.participants.some((p) => p.id === "user1")
  ),
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

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-3xl">
      {/* Profile Header */}
      <div className="space-y-6">
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
            className="flex items-center gap-2"
            onClick={() => setIsEditProfileOpen(true)}
          >
            <Pencil className="h-4 w-4" />
            編集
          </Button>
        </div>

        {/* Points Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">ポイント</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {user.points.available}
                  </span>
                  <span className="text-muted-foreground">
                    / {user.points.total} pt
                  </span>
                </div>
              </div>
              <Button onClick={() => setIsPointsModalOpen(true)}>
                ポイントを利用する
              </Button>
            </div>
          </CardContent>
        </Card>
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

      <PointsModal
        open={isPointsModalOpen}
        onOpenChange={setIsPointsModalOpen}
        availablePoints={user.points.available}
      />

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
