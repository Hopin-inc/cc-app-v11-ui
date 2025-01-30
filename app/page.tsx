"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockOpportunities } from "@/lib/data";
import OpportunityCard from "@/components/OpportunityCard";
import { format, isToday, isTomorrow } from "date-fns";
import { ja } from "date-fns/locale";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter opportunities based on search query
  const filteredOpportunities = mockOpportunities.filter(
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

    if (isToday(date)) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">
            今日
          </span>
          <span>{displayDate}</span>
        </div>
      );
    }

    if (isTomorrow(date)) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">
            明日
          </span>
          <span>{displayDate}</span>
        </div>
      );
    }

    return displayDate;
  };

  return (
    <main>
      {/* Search Bar */}
      <div className="sticky top-0 bg-background z-20">
        <div className="container max-w-2xl mx-auto px-4 py-3">
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
      <div className="container max-w-2xl mx-auto px-4 space-y-6">
        {Object.entries(groupedOpportunities).map(([date, opportunities]) => (
          <div key={date}>
            <h2 className="text-base font-medium mb-2 sticky top-[60px] py-2 bg-background/80 backdrop-blur-sm text-muted-foreground z-10">
              {formatDate(date)}
            </h2>
            <div className="space-y-2">
              {opportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} session={opportunity} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
