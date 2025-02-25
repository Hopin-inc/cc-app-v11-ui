import { CreditCard, HelpCircle } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { CommunityPointCard } from "@/components/features/user/CommunityPointCard";
import type { Community } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  userCommunities: Community[];
  points: Record<string, { available: number; total: number }>;
  isOwner: boolean;
  userId: string;
  onSelectCommunity: (
    community: Community,
    points: { available: number; total: number }
  ) => void;
};

export const UserPointCardSlider = ({
  userCommunities,
  points,
  isOwner,
  userId,
  onSelectCommunity,
}: Props) => {
  return (
    <div className="md:col-span-2 mb-4 mt-8">
      <div className="flex items-center justify-between mb-2 pb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-muted-foreground">
            ウォレット
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-3">
                <p className="font-medium">
                  地域活動でポイントを貯めて特典と交換
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>・特別イベントへの参加</li>
                  <li>・遊休資産の利用</li>
                  <li>・地域限定の特典</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {userCommunities.length > 0 ? (
        <div className="space-y-4">
          {userCommunities.map((community) => {
            const projectPoints = points[community.id];
            return (
              <CommunityPointCard
                key={community.id}
                community={community}
                points={projectPoints}
                onClick={() => onSelectCommunity(community, projectPoints)}
                isOwner={isOwner}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="まだ会員証を持っていません"
          description={
            isOwner
              ? "地域の活動に参加して、会員証を獲得しましょう"
              : "地域の活動に参加すると、会員証を獲得できます"
          }
          actionLabel="関わりを探す"
          onAction={() => {
            window.location.href = "/";
          }}
          icon={<CreditCard className="w-10 h-10 text-muted-foreground" />}
          hideActionButton={!isOwner}
        />
      )}
    </div>
  );
};
