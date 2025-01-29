"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { PointsModal } from "@/components/points-modal";
import { EditProfileModal } from "@/components/edit-profile-modal";
import { categories, mockOpportunities, skills } from "@/lib/data";
import { dummyUser } from "@/lib/dummyUser";
import OpportunityCard from "@/components/OpportunityCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  appliedSessions: [mockOpportunities[0], mockOpportunities[1]],
};

export default function MyPage() {
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const groupedSessions = user.appliedSessions.reduce<
    Record<string, typeof user.appliedSessions>
  >((acc, session) => {
    acc[session.status] = [...(acc[session.status] || []), session];
    return acc;
  }, {});

  const statusTabs = Object.keys(groupedSessions).map((status) => ({
    value: status,
    label: status,
    count: groupedSessions[status].length,
  }));

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

      {/* Skills Section */}
      <div>
        <div className="group relative mb-4">
          <h2 className="text-xl font-bold">スキル</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditProfileOpen(true)}
            className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Pencil className="h-4 w-4 mr-2" />
            編集
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((userSkill) => {
            const skill = skills.find((s) => s.id === userSkill.id);
            return skill ? (
              <Badge
                key={skill.id}
                variant="outline"
                className="flex items-center gap-1"
              >
                {skill.name}
                <span className="bg-primary/10 text-primary text-xs px-1 rounded">
                  Lv{userSkill.level}
                </span>
              </Badge>
            ) : null;
          })}
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <div className="group relative mb-4">
          <h2 className="text-xl font-bold">バッジ</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditProfileOpen(true)}
            className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Pencil className="h-4 w-4 mr-2" />
            編集
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.badges.map((badge) => {
            const category = categories.find((c) => c.id === badge.id);
            return category ? (
              <Badge
                key={category.id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {category.name}
                <span className="bg-secondary-foreground/10 text-secondary-foreground text-xs px-1 rounded">
                  Lv{badge.level}
                </span>
              </Badge>
            ) : null;
          })}
        </div>
      </div>

      {/* Applied Sessions */}
      <div>
        <h2 className="text-xl font-bold mb-4">申し込んだ機会</h2>
        <Tabs defaultValue={statusTabs[0].value}>
          <TabsList>
            {statusTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label} ({tab.count})
              </TabsTrigger>
            ))}
          </TabsList>
          {statusTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="space-y-4">
                {groupedSessions[tab.value].map((session) => (
                  <OpportunityCard key={session.id} session={session} />
                ))}
              </div>
            </TabsContent>
          ))}
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
