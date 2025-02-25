import { Search } from "lucide-react";
import OpportunityCard from "@/components/features/opportunity/OpportunityCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Opportunity, User } from "@/types";
import { formatDateWithWeekday } from "@/lib/utils/opportunity";

type Props = {
  groupedOpportunities: Record<string, Opportunity[]>;
  currentUserId?: string;
  showDateDivider?: boolean;
  emptyStateProps?: {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
  };
  invitationInfo?: {
    invitations: {
      opportunityId: string;
      senderUserId: string;
      pointsForBonus?: number;
    }[];
    users: User[];
  };
};

export const OpportunityList = ({
  groupedOpportunities,
  currentUserId,
  showDateDivider = true,
  emptyStateProps,
  invitationInfo,
}: Props) => {
  if (Object.entries(groupedOpportunities).length === 0) {
    return emptyStateProps ? (
      <EmptyState
        title={emptyStateProps.title}
        description={emptyStateProps.description}
        actionLabel={emptyStateProps.actionLabel}
        icon={<Search className="w-10 h-10 text-muted-foreground" />}
        onAction={emptyStateProps.onAction}
      />
    ) : null;
  }

  return (
    <>
      {Object.entries(groupedOpportunities).map(([date, opportunities]) => (
        <div key={date} className="relative">
          {showDateDivider ? (
            <div className="sticky top-16 z-20 -mx-4 bg-background/95 backdrop-blur-sm py-2">
              <div className="flex items-center gap-2 px-4">
                <div className="w-3 h-3 rounded-full border border-border bg-muted" />
                <div className="flex-1">
                  <p className="text-muted-foreground text-base">
                    {formatDateWithWeekday(date)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-2">
              <p className="text-muted-foreground text-base">
                {formatDateWithWeekday(date)}
              </p>
            </div>
          )}
          <div
            className={
              showDateDivider
                ? "relative before:absolute before:left-[5px] before:-top-[12px] before:h-[calc(100%+1rem)] before:w-px before:bg-border before:z-10"
                : ""
            }
          >
            <div
              className={showDateDivider ? "space-y-4 pl-4" : "space-y-4 mb-4"}
            >
              {opportunities.map((opportunity) => {
                const invitation = invitationInfo?.invitations.find(
                  (i) => i.opportunityId === opportunity.id
                );
                const invitedBy = invitation
                  ? invitationInfo?.users.find(
                      (u) => u.id === invitation.senderUserId
                    )
                  : undefined;

                return (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    isJoined={
                      currentUserId
                        ? opportunity.participants?.some(
                            (p) => p.id === currentUserId
                          )
                        : false
                    }
                    isInvited={!!invitation}
                    bonusPoints={invitation?.pointsForBonus}
                    invitedBy={
                      invitedBy
                        ? {
                            id: invitedBy.id,
                            name: invitedBy.name,
                            image: invitedBy.image ?? "/placeholder.svg",
                          }
                        : undefined
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
