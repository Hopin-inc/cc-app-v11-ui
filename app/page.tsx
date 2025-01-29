"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockOpportunities } from "@/lib/data";
import OpportunityCard from "@/components/OpportunityCard";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const groupedOpportunities = useMemo(() => {
    const filtered = mockOpportunities.filter(
      (opportunity) =>
        !searchQuery ||
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group by date
    const groups = filtered.reduce((acc, opportunity) => {
      const date = format(new Date(opportunity.startsAt), "yyyy年M月d日(E)", {
        locale: ja,
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(opportunity);
      return acc;
    }, {} as Record<string, typeof mockOpportunities>);

    // Sort dates
    return Object.entries(groups).sort(
      (a, b) => new Date(b[1][0].startsAt).getTime() - new Date(a[1][0].startsAt).getTime()
    );
  }, [searchQuery]);

  return (
    <main>
      {/* Search Bar */}
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="イベントを検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      {/* Opportunity List */}
      <div className="container max-w-2xl mx-auto px-4">
        {groupedOpportunities.map(([date, opportunities]) => (
          <div key={date}>
            <div className="text-sm font-medium py-2">{date}</div>
            <div className="divide-y">
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
