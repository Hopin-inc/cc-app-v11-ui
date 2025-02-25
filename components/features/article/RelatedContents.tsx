import { Activity, Article, Opportunity } from "@/types";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ActivityCard } from "@/components/features/activity/ActivityCard";
import { OpportunityList } from "../opportunity/OpportunityList";
import { CURRENT_USER_DATA, mockUsers } from "@/lib/data";
import { groupOpportunitiesByDate } from "@/lib/utils/opportunity";

type Props = {
  activities?: Activity[];
  opportunities?: Opportunity[];
};

export function RelatedContents({ activities, opportunities }: Props) {
  const groupedOpportunities = opportunities
    ? groupOpportunitiesByDate(opportunities)
    : [];
  return (
    <div className="space-y-6">
      {activities && activities.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-muted-foreground mb-4">
            おすすめの体験
          </h2>
          <div className="grid gap-4 grid-cols-2">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      )}

      {Object.keys(groupedOpportunities ?? {}).length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-muted-foreground mb-4">
            おすすめの関わり
          </h2>
          <OpportunityList
            groupedOpportunities={
              groupedOpportunities as Record<string, Opportunity[]>
            }
            currentUserId={CURRENT_USER_DATA!.id}
            showDateDivider={false}
            invitationInfo={{
              invitations: CURRENT_USER_DATA!.invitations ?? [],
              users: mockUsers,
            }}
          />
        </section>
      )}
    </div>
  );
}
