"use client";

import { Activity, Opportunity } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpportunityList } from "@/components/features/opportunity/OpportunityList";
import { ActivityCard } from "@/components/features/activity/ActivityCard";
import { useRouter, useSearchParams } from "next/navigation";
import { CURRENT_USER_DATA, mockUsers } from "@/lib/data";
import MapView from "./MapView";
import { Suspense } from "react";

// TabsWrapperコンポーネントを作成
function TabsWrapper({
  defaultTab = "all",
  children,
}: {
  defaultTab?: string;
  children: (
    currentTab: string,
    handleTabChange: (value: string) => void
  ) => React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || defaultTab;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return children(currentTab, handleTabChange);
}

type Props = {
  activities: Activity[];
  events: Opportunity[];
  quests: Opportunity[];
  currentUserId: string;
  groupedEvents: Record<string, Opportunity[]>;
  groupedQuests: Record<string, Opportunity[]>;
  invitationInfo?: {
    invitations: {
      id: string;
      opportunityId: string;
      pointsForBonus?: number;
    }[];
    users: {
      id: string;
      name: string;
      image?: string;
    }[];
  };
};

export function ContentTabs(props: Props) {
  return (
    <TabsWrapper>
      {(currentTab, handleTabChange) => (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="space-y-8">
            {props.activities.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-muted-foreground mb-4">
                  体験
                </h2>
                <div className="grid gap-4 grid-cols-2">
                  {props.activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </section>
            )}

            {props.events.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-muted-foreground mb-4">
                  イベント
                </h2>
                <OpportunityList
                  groupedOpportunities={props.groupedEvents}
                  currentUserId={props.currentUserId}
                  showDateDivider={true}
                  invitationInfo={{
                    invitations: CURRENT_USER_DATA!.invitations ?? [],
                    users: mockUsers,
                  }}
                />
              </section>
            )}

            {props.quests.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-muted-foreground mb-4">
                  クエスト
                </h2>
                <OpportunityList
                  groupedOpportunities={props.groupedQuests}
                  currentUserId={props.currentUserId}
                  showDateDivider={true}
                  invitationInfo={{
                    invitations: CURRENT_USER_DATA!.invitations ?? [],
                    users: mockUsers,
                  }}
                />
              </section>
            )}
          </div>
        </Suspense>
      )}
    </TabsWrapper>
  );
}
