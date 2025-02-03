"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockOpportunities, CURRENT_USER_DATA, mockUsers } from "@/lib/data";
import { OpportunityList } from "@/components/features/opportunity/OpportunityList";
import {
  groupOpportunitiesByDate,
  sortOpportunitiesByDate,
} from "@/lib/utils/opportunity";
import type { Opportunity } from "@/types";

const STEPS = [
  {
    currentStep: 1,
    totalSteps: 3,
    label: "地域の活動を探しましょう",
    description: "地域の活動を探しましょう",
  },
  {
    currentStep: 2,
    totalSteps: 3,
    label: "気になるクエストに応募してみましょう！",
    description: "応募して承認されると、地域の活動に参加することができます",
  },
  {
    currentStep: 3,
    totalSteps: 3,
    label: "プロフィールを充実させよう",
    description:
      "プロフィールを充実させると、魅力が伝わり応募が承認されやすくなります。",
  },
];

const currentStep = 2;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter opportunities based on search query
  const filteredOpportunities = mockOpportunities
    // 過去の Oppotunity は表示しない
    .filter((opportunity) => {
      const startsAt = new Date(opportunity.startsAt);
      const today = new Date();
      return today < startsAt;
    })
    .filter(
      (opportunity) =>
        !searchQuery ||
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        opportunity.community?.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

  // Sort opportunities by proximity to current time
  const sortedOpportunities = sortOpportunitiesByDate(filteredOpportunities);

  // Group opportunities by date
  const groupedOpportunities = groupOpportunitiesByDate(sortedOpportunities);

  const invitedOpportunities: Opportunity[] =
    CURRENT_USER_DATA?.invitations?.map((i) => i.opportunity) || [];

  const groupedInvitedOpportunities = groupOpportunitiesByDate(
    sortOpportunitiesByDate(invitedOpportunities)
  );

  const step = STEPS[currentStep - 1];

  return (
    <main className="container mx-auto py-6 space-y-8 max-w-3xl">
      {/* NEXT STEP */}
      <div className="px-4">
        <div className="flex items-center justify-between gap-2 bg-[#C37C09] text-white px-4 py-3 rounded-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-xs">NEXT STEP</div>
              <div className="text-xs text-white/80">
                {step.currentStep} of {step.totalSteps}
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-32 h-1 bg-white/20 rounded-full">
              <div className="w-2/3 h-full bg-white rounded-full" />
            </div>
            <div className="text-sm font-bold">{step.label}</div>
            <div className="text-xs text-white/80">{step.description}</div>
          </div>
        </div>
      </div>

      {invitedOpportunities.length > 0 && (
        <div className="px-4">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4">
            招待されている関わり
          </h2>
          <OpportunityList
            groupedOpportunities={groupedInvitedOpportunities}
            currentUserId={CURRENT_USER_DATA!.id}
            invitationInfo={{
              invitations: CURRENT_USER_DATA!.invitations ?? [],
              users: mockUsers,
            }}
          />
        </div>
      )}

      {/* Events */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-muted-foreground mb-4 mx-4">
          募集中の関わり
        </h2>
        {/* Search */}
        <div className="px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="キーワードから探す"
              className="w-full pl-10 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <OpportunityList
          groupedOpportunities={groupedOpportunities}
          currentUserId={CURRENT_USER_DATA!.id}
          emptyStateProps={{
            title: "該当する条件の関わりはありません",
            description: "条件を変えて、関わりを探しましょう。",
            actionLabel: "関わりを探す",
            onAction: () => setSearchQuery(""),
          }}
          invitationInfo={{
            invitations: CURRENT_USER_DATA!.invitations ?? [],
            users: mockUsers,
          }}
        />
      </div>
    </main>
  );
}
