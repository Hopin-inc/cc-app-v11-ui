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
    <main className="container mx-auto py-6 px-4 space-y-8 max-w-3xl">
      {/* Search Bar */}
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="関わり方を探す"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Opportunities List */}
      <div>
        {Object.entries(groupedOpportunities).map(([date, opportunities]) => (
          <div key={date}>
            <h2 className="text-base font-medium sticky top-[65px] py-1.5 bg-background/80 backdrop-blur-sm text-muted-foreground z-10">
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
