"use client";

import { useState } from "react";
import Image from "next/image";
import { mockUsers, mockCommunities, CURRENT_USER } from "@/lib/data";
import type { Opportunity, Community, User } from "@/types";
import { UserPointCardSlider } from "@/components/features/user/UserPointCardSlider";
import { UserActivityHistory } from "@/components/features/user/UserActivityHistory";
import { UserUpcomingActivities } from "@/components/features/user/UserUpcomingActivities";
import { CommunityPointModal } from "@/components/features/user/CommunityPointModal";
import {
  sortOpportunitiesByDate,
  groupOpportunitiesByYear,
} from "@/lib/utils/opportunity";
import { UserSocialLinks } from "@/components/features/user/UserSocialLinks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Wallet, History, ImagePlus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DEFAULT_SOCIAL_LINKS: NonNullable<User["socialLinks"]> = [
  {
    type: "twitter",
    url: "https://twitter.com/misaki_yamada",
  },
  {
    type: "instagram",
    url: "https://instagram.com/misaki_yamada",
  },
  {
    type: "facebook",
    url: "https://facebook.com/misaki.yamada",
  },
];

export default function UserPage({ params }: { params: { id: string } }) {
  const [selectedCommunity, setSelectedCommunity] = useState<{
    community: Community;
    points: { available: number; total: number } | undefined;
  } | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>("all");
  const [showAllFutureOpportunities, setShowAllFutureOpportunities] =
    useState(false);
  const [userData, setUserData] = useState<User | null>(() => {
    const user = mockUsers.find((u) => u.id === params.id);
    if (!user) return null;
    return {
      ...user,
      socialLinks:
        user.id === CURRENT_USER.id ? [...DEFAULT_SOCIAL_LINKS] : undefined,
    };
  });
  const isOwner = userData?.id === CURRENT_USER.id;

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-6">
        ユーザーが見つかりません
      </div>
    );
  }

  const invitedOpportunities = (userData.invitations ?? []).flatMap(
    (t) => t.opportunity
  );
  const opportunities = [
    ...userData.appliedOppotunities,
    ...invitedOpportunities,
  ];

  // 機会を未来と過去に分類
  const now = new Date();
  const futureOpportunities = opportunities.filter(
    (opp) => new Date(opp.startsAt) > now
  );
  const pastOpportunities = sortOpportunitiesByDate(
    opportunities.filter((opp) => new Date(opp.startsAt) <= now),
    "desc"
  );

  // 過去の活動をプロジェクトでフィルタリング
  const filteredPastOpportunities = pastOpportunities.filter((opp) =>
    selectedCommunityId === "all"
      ? true
      : opp.communityId === selectedCommunityId
  );
  const filteredGroupedPastOpportunities = groupOpportunitiesByYear(
    filteredPastOpportunities
  );

  // 機会を日付でソート
  const sortedFutureOpportunities =
    sortOpportunitiesByDate(futureOpportunities);

  // 表示する機会を制限
  const displayedFutureOpportunities = showAllFutureOpportunities
    ? sortedFutureOpportunities
    : sortedFutureOpportunities.slice(0, 3);

  // ユーザーが参加しているコミュニティを取得
  const userCommunities = mockCommunities
    .filter((community) =>
      opportunities
        .filter((opp) => opp.communityId === community.id)
        .some((opp) => opp.participants?.some((p) => p.id === userData.id))
    )
    .sort((a, b) => userData.points[b.id].total - userData.points[a.id].total);

  const handleUpdateSocialLinks = (socialLinks: User["socialLinks"]) => {
    // TODO: APIを使って更新する
    setUserData({
      ...userData,
      socialLinks,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-3xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={userData.image || "/placeholder.svg"}
              alt={userData.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {userData.bio}
              </p>
              <UserSocialLinks
                user={userData}
                className="mt-3"
                isOwner={isOwner}
                onUpdate={isOwner ? handleUpdateSocialLinks : undefined}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 p-1 pb-10">
            <TabsTrigger
              value="history"
              className="flex items-center justify-center gap-1.5 px-3 py-2"
            >
              <History className="w-4 h-4" />
              <span className="text-sm">活動履歴</span>
              {pastOpportunities.length > 0 && (
                <span className="ml-1 text-xs leading-none bg-primary/10 text-primary px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                  {pastOpportunities.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="flex items-center justify-center gap-1.5 px-3 py-2"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm">参加予定</span>
              {futureOpportunities.length > 0 && (
                <span className="ml-1 text-xs leading-none bg-primary/10 text-primary px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                  {futureOpportunities.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="flex items-center justify-center gap-1.5 px-3 py-2"
            >
              <Wallet className="w-4 h-4" />
              <span className="text-sm">ウォレット</span>
              {userCommunities.length > 0 && (
                <span className="ml-1 text-xs leading-none bg-primary/10 text-primary px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                  {userCommunities.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6 pb-8 space-y-6">
            <UserActivityHistory
              selectedCommunityId={selectedCommunityId}
              onSelectCommunity={setSelectedCommunityId}
              userCommunities={userCommunities}
              groupedOpportunities={filteredGroupedPastOpportunities}
              isOwner={isOwner}
              communities={mockCommunities}
            />
            {/* #TODO: 検討（任意の活動を追加できるか） */}
            {/* {isOwner && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground hover:text-foreground"
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                活動を追加
              </Button>
            )} */}
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6 pb-8 space-y-6">
            <UserUpcomingActivities
              opportunities={displayedFutureOpportunities}
              showAllOpportunities={showAllFutureOpportunities}
              onShowMore={() => setShowAllFutureOpportunities(true)}
            />
          </TabsContent>

          <TabsContent value="wallet" className="mt-6 pb-8 space-y-6">
            <UserPointCardSlider
              userCommunities={userCommunities}
              points={userData.points}
              isOwner={isOwner}
              userId={userData.id}
              onSelectCommunity={(community, points) =>
                setSelectedCommunity({ community, points })
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
