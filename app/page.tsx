"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockOpportunities, mockInvitationOpportunities } from "@/lib/data";
import OpportunityCard from "@/components/OpportunityCard";
import { format, isToday, isTomorrow } from "date-fns";
import { ja } from "date-fns/locale";

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
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Sort opportunities by proximity to current time
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    const now = new Date();
    const diffA = Math.abs(new Date(a.startsAt).getTime() - now.getTime());
    const diffB = Math.abs(new Date(b.startsAt).getTime() - now.getTime());
    return diffA - diffB;
  });

  // Group opportunities by date
  const groupedOpportunities = sortedOpportunities.reduce(
    (groups, opportunity) => {
      const date = format(new Date(opportunity.startsAt), "yyyy-MM-dd");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(opportunity);
      return groups;
    },
    {} as Record<string, typeof mockOpportunities>
  );

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const displayDate = format(date, "M月d日(E)", { locale: ja });
    return displayDate;
  };

  return (
    <main>
      {/* Search Bar */}
      <div className="sticky top-16 bg-background z-20">
        <div className="container max-w-2xl mx-auto px-4 py-2">
          <div className="relative flex-1 items-center">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="地域との関わり方を検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="container max-w-2xl mx-auto px-4 space-y-3">
        {Object.entries(groupedOpportunities).map(([date, opportunities]) => (
          <div key={date}>
            <h2 className="text-base font-medium sticky top-[120px] py-1.5 bg-background/80 backdrop-blur-sm text-muted-foreground z-10">
              {formatDate(date)}
            </h2>
            <div className="space-y-1.5">
              {opportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  session={opportunity}
                  isJoined={opportunity.participants?.some(
                    (p) => p.id === "user1"
                  )}
                  isInvited={mockInvitationOpportunities.some(
                    (invite) => invite.id === opportunity.id
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
