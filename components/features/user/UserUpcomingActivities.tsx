import { format } from "date-fns";
import { ja } from "date-fns/locale";
import OpportunityCard from "@/components/features/opportunity/OpportunityCard";
import type { Opportunity } from "@/types";

type Props = {
  opportunities: Opportunity[];
  showAllOpportunities: boolean;
  onShowMore: () => void;
};

export const UserUpcomingActivities = ({
  opportunities,
  showAllOpportunities,
  onShowMore,
}: Props) => {
  if (opportunities.length === 0) return null;

  const opportunitiesByDate = opportunities.reduce((acc, opp) => {
    const date = format(new Date(opp.startsAt), "yyyy-MM-dd");
    if (!acc[date]) acc[date] = [];
    acc[date].push(opp);
    return acc;
  }, {} as Record<string, Opportunity[]>);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-muted-foreground mb-4">
        参加予定の関わり
      </h2>
      <div className="space-y-4">
        {Object.entries(opportunitiesByDate)
          .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
          .map(([date, opportunities]) => (
            <div key={date}>
              <h3 className="text-muted-foreground">
                {format(new Date(date), "M月d日(E)", {
                  locale: ja,
                })}
              </h3>
              <div className="space-y-4 pt-2">
                {opportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    isJoined={true}
                  />
                ))}
              </div>
            </div>
          ))}
        {opportunities.length > 3 && !showAllOpportunities && (
          <div className="flex justify-end">
            <button
              onClick={onShowMore}
              className="text-xs text-muted-foreground hover:text-primary/80 transition-colors"
            >
              もっと見る
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
