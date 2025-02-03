import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import OpportunityCard from "@/components/features/opportunity/OpportunityCard";
import type { Opportunity } from "@/types";

type Props = {
  groupedOpportunities: Record<string, Opportunity[]>;
  allOpportunities: Opportunity[];
  showAllActive: boolean;
  onShowAllChange: (show: boolean) => void;
  currentUserId: string;
};

export const CommunityActiveOpportunities = ({
  groupedOpportunities,
  allOpportunities,
  showAllActive,
  onShowAllChange,
  currentUserId,
}: Props) => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-muted-foreground pb-2">
        募集中の関わり
      </h2>
      <div className="relative space-y-3">
        {Object.entries(groupedOpportunities).map(([date, opportunities]) => (
          <div key={date} className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              {date}
            </h3>
            <div className="space-y-2">
              {opportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  isJoined={opportunity.participants?.some(
                    (participant) => participant.id === currentUserId
                  )}
                />
              ))}
            </div>
          </div>
        ))}
        {allOpportunities.length > 3 && (
          <div className="w-full flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => onShowAllChange(true)}
            >
              もっと見る
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </div>
        )}
      </div>
      {showAllActive && (
        <Sheet open={showAllActive} onOpenChange={onShowAllChange}>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader className="mb-4">
              <SheetTitle>募集中の関わり</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 overflow-y-auto">
              {allOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  isJoined={opportunity.participants?.some(
                    (participant) => participant.id === currentUserId
                  )}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </section>
  );
};
