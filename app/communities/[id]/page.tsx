"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { mockCommunities, mockOpportunities, CURRENT_USER } from "@/lib/data";
import { isPast } from "date-fns";
import { useState, useMemo } from "react";
import { Timeline } from "@/components/features/opportunity/Timeline";
import { CommunityHeader } from "@/components/features/community/CommunityHeader";
import { CommunityImage } from "@/components/features/community/CommunityImage";
import { CommunityActiveOpportunities } from "@/components/features/community/CommunityActiveOpportunities";
import { sortOpportunitiesByDate, groupOpportunitiesByYear, groupOpportunitiesByDate } from "@/lib/utils/opportunity";

export default function communityDetailPage() {
  const params = useParams();
  const community = mockCommunities.find((p) => p.id === params.id);
  if (!community) return notFound();

  const opportunities = mockOpportunities.filter(
    (o) => o.communityId === community.id
  );

  const memberCount = [
    ...new Set(
      opportunities.flatMap((o) => o.participants?.map((p) => p.id) ?? [])
    ),
  ].length;

  const [showAllActive, setShowAllActive] = useState(false);

  const activeOpportunities = useMemo(() => {
    return sortOpportunitiesByDate(
      mockOpportunities
        .filter((o) => o.communityId === community.id)
        .filter((o) => o.status === "open")
    );
  }, [community.id]);

  const groupedPastOpportunities = useMemo(() => {
    const pastOpportunities = sortOpportunitiesByDate(
      mockOpportunities
        .filter((o) => o.communityId === community.id)
        .filter((o) => isPast(new Date(o.startsAt))),
      "desc"
    );

    return groupOpportunitiesByYear(pastOpportunities);
  }, [community.id]);

  const groupedActiveOpportunities = useMemo(() => {
    return groupOpportunitiesByDate(activeOpportunities.slice(0, 3));
  }, [activeOpportunities]);

  return (
    <div className="container max-w-2xl py-6 space-y-6">
      <CommunityHeader community={community} memberCount={memberCount} />

      <CommunityImage
        imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cJlP8qa356Wj60GazGoXTpBBpmiK9r.png"
        title={community.title}
      />

      <div className="space-y-12 px-4">
        <CommunityActiveOpportunities
          groupedOpportunities={groupedActiveOpportunities}
          allOpportunities={activeOpportunities}
          showAllActive={showAllActive}
          onShowAllChange={setShowAllActive}
          currentUserId={CURRENT_USER.id}
        />

        {/* これまでの活動 */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground pb-2">
            これまでの活動
          </h2>
          <div className="space-y-8">
            <Timeline
              groupedOpportunities={groupedPastOpportunities}
              showCommunity={false}
              communities={mockCommunities}
              sortDirection="desc"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
