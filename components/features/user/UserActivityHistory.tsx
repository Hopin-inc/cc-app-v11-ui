import { History } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { ActivityGrid } from "@/components/features/user/ActivityGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Community, Opportunity } from "@/types";

type Props = {
  selectedCommunityId: string;
  onSelectCommunity: (communityId: string) => void;
  userCommunities: Community[];
  groupedOpportunities: Record<string, Opportunity[]>;
  isOwner: boolean;
  communities: Community[];
};

export const UserActivityHistory = ({
  selectedCommunityId,
  onSelectCommunity,
  userCommunities,
  groupedOpportunities,
  isOwner,
  communities,
}: Props) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-lg font-semibold text-muted-foreground">
          これまでの活動
        </h2>
        <Select value={selectedCommunityId} onValueChange={onSelectCommunity}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="プロジェクトを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            {userCommunities.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {Object.keys(groupedOpportunities).length > 0 ? (
        <ActivityGrid
          opportunities={Object.values(groupedOpportunities).flat()}
          showCommunity={selectedCommunityId === "all"}
          communities={communities}
        />
      ) : (
        <EmptyState
          title="まだ活動履歴がありません"
          description={
            isOwner
              ? "地域の活動に参加して、タイムラインを作りましょう"
              : "地域の活動に参加すると、タイムラインが作成されます"
          }
          actionLabel="関わりを探す"
          onAction={() => {
            window.location.href = "/";
          }}
          hideActionButton={!isOwner}
          icon={<History className="w-8 h-8 text-muted-foreground font-thin" />}
        />
      )}
    </section>
  );
};
