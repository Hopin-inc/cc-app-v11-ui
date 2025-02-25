"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArticleSlider } from "@/components/features/article/ArticleSlider";
import { ContentTabs } from "@/components/features/home/ContentTabs";
import { FilterBar } from "@/components/features/home/FilterBar";
import { FilterParams } from "@/components/features/home/FilterDialog";
import {
  groupOpportunitiesByDate,
  sortOpportunitiesByDate,
} from "@/lib/utils/opportunity";

type Props = {
  mockOpportunities: any[];
  currentUserData: any;
  mockUsers: any[];
  mockArticles: any[];
  mockActivities: any[];
  currentUser: any;
};

export function HomeContent({
  mockOpportunities,
  currentUserData,
  mockUsers,
  mockArticles,
  mockActivities,
  currentUser,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState<FilterParams>({
    location: searchParams.get("location") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
    type: (searchParams.get("type") as FilterParams["type"]) || "all",
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (filters.location) params.set("location", filters.location);
    if (filters.startDate) params.set("startDate", filters.startDate);
    if (filters.endDate) params.set("endDate", filters.endDate);
    if (filters.type && filters.type !== "all")
      params.set("type", filters.type);

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/", { scroll: false });
  }, [searchQuery, filters, router]);

  // Filter and group opportunities by type
  const { events, quests, filteredActivities, allFilteredContent } =
    useMemo(() => {
      const lowerQuery = searchQuery.toLowerCase();
      const lowerLocation = filters.location?.toLowerCase() || "";
      const now = new Date();

      // Helper function to check if a date is within the filter range and in the future
      const isWithinDateRange = (date: string) => {
        const targetDate = new Date(date);
        // Return false if the date is in the past
        if (targetDate < now) return false;

        if (!filters.startDate && !filters.endDate) return true;
        if (filters.startDate && new Date(filters.startDate) > targetDate)
          return false;
        if (filters.endDate && new Date(filters.endDate) < targetDate)
          return false;
        return true;
      };

      // Helper function to check if a location matches
      const matchesLocation = (location: string) => {
        if (!lowerLocation) return true;
        return location.toLowerCase().includes(lowerLocation);
      };

      // Filter opportunities by type and search query
      const filteredOpportunities = mockOpportunities.filter(
        (opp) =>
          (opp.title.toLowerCase().includes(lowerQuery) ||
            opp.description.toLowerCase().includes(lowerQuery)) &&
          isWithinDateRange(opp.startsAt) &&
          matchesLocation(opp.location?.address || "")
      );

      const events = filteredOpportunities.filter(
        (opp) => opp.type === "EVENT"
      );
      const quests = filteredOpportunities.filter(
        (opp) => opp.type === "QUEST"
      );

      // Filter activities
      const filteredActivities = mockActivities.filter(
        (activity) =>
          (activity.title.toLowerCase().includes(lowerQuery) ||
            activity.description.toLowerCase().includes(lowerQuery)) &&
          matchesLocation(activity.location?.city || "")
      );

      // Apply type filter
      const filteredByType = {
        activities:
          filters.type === "all" || filters.type === "activity"
            ? filteredActivities
            : [],
        events:
          filters.type === "all" || filters.type === "event" ? events : [],
        quests:
          filters.type === "all" || filters.type === "quest" ? quests : [],
      };

      return {
        events: filteredByType.events,
        quests: filteredByType.quests,
        filteredActivities: filteredByType.activities,
        allFilteredContent: filteredByType,
      };
    }, [searchQuery, filters, mockActivities, mockOpportunities]);

  // Group opportunities by date
  const groupedEvents = useMemo(
    () => groupOpportunitiesByDate(sortOpportunitiesByDate(events)),
    [events]
  );

  const groupedQuests = useMemo(
    () => groupOpportunitiesByDate(sortOpportunitiesByDate(quests)),
    [quests]
  );

  return (
    <main className="flex min-h-screen flex-col px-4">
      <div className="container py-6 space-y-8">
        {/* Article Slider */}
        <ArticleSlider articles={mockArticles} />

        {/* Search and Filter Section */}
        <div className="space-y-6">
          {/* Search and Results */}
          <div className="space-y-4">
            {/* Search Bar with Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="キーワードで検索（例：農業、お祭り、など）"
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Bar */}
              <div className="flex gap-2 items-center text-sm">
                <FilterBar filters={filters} onFilterChange={setFilters} />
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <ContentTabs
            activities={filteredActivities}
            events={events}
            quests={quests}
            currentUserId={currentUserData.id}
            groupedEvents={groupedEvents}
            groupedQuests={groupedQuests}
            invitationInfo={{
              invitations: currentUserData.invitations ?? [],
              users: mockUsers,
            }}
          />
        </div>
      </div>
    </main>
  );
}
