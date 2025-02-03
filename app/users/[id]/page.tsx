"use client";

import { useState } from "react";
import Image from "next/image";
import { mockUsers, mockCommunities, CURRENT_USER } from "@/lib/data";
import type { Opportunity, Community } from "@/types";
import { UserPointCardSlider } from "@/components/features/user/UserPointCardSlider";
import { UserActivityHistory } from "@/components/features/user/UserActivityHistory";
import { UserUpcomingActivities } from "@/components/features/user/UserUpcomingActivities";
import { CommunityPointModal } from "@/components/features/user/CommunityPointModal";
import { sortOpportunitiesByDate, groupOpportunitiesByYear } from "@/lib/utils/opportunity";

export default function UserPage({ params }: { params: { id: string } }) {
  const [selectedCommunity, setSelectedCommunity] = useState<{
    community: Community;
    points: { available: number; total: number } | undefined;
  } | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>("all");
  const [showAllFutureOpportunities, setShowAllFutureOpportunities] =
    useState(false);

  const user = mockUsers.find((u) => u.id === params.id);
  const isOwner = user?.id === CURRENT_USER.id;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6">
        ユーザーが見つかりません
      </div>
    );
  }

  const invitedOpportunities = (user.invitations ?? []).flatMap(
    (t) => t.opportunity
  );
  const opportunities = [...user.appliedOppotunities, ...invitedOpportunities];

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
  const sortedFutureOpportunities = sortOpportunitiesByDate(futureOpportunities);

  // 表示する機会を制限
  const displayedFutureOpportunities = showAllFutureOpportunities
    ? sortedFutureOpportunities
    : sortedFutureOpportunities.slice(0, 3);

  // ユーザーが参加しているコミュニティを取得
  const userCommunities = mockCommunities
    .filter((community) =>
      opportunities
        .filter((opp) => opp.communityId === community.id)
        .some((opp) => opp.participants?.some((p) => p.id === user.id))
    )
    .sort((a, b) => user.points[b.id].total - user.points[a.id].total);

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-3xl">
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
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground mt-1 text-sm">{user.bio}</p>
            </div>
          </div>
        </div>

        <UserPointCardSlider
          userCommunities={userCommunities}
          points={user.points}
          isOwner={isOwner}
          userId={user.id}
          onSelectCommunity={(community, points) =>
            setSelectedCommunity({ community, points })
          }
        />

        <div>
          <div className="space-y-8 mt-12">
            <UserUpcomingActivities
              opportunities={displayedFutureOpportunities}
              showAllOpportunities={showAllFutureOpportunities}
              onShowMore={() => setShowAllFutureOpportunities(true)}
            />

            <UserActivityHistory
              selectedCommunityId={selectedCommunityId}
              onSelectCommunity={setSelectedCommunityId}
              userCommunities={userCommunities}
              groupedOpportunities={filteredGroupedPastOpportunities}
              isOwner={isOwner}
              communities={mockCommunities}
            />
          </div>
        </div>
      </div>

      {selectedCommunity && (
        <CommunityPointModal
          isOpen={!!selectedCommunity}
          onClose={() => setSelectedCommunity(null)}
          community={selectedCommunity.community}
          points={selectedCommunity.points}
          currentUserId={CURRENT_USER.id}
        />
      )}
    </div>
  );
}
