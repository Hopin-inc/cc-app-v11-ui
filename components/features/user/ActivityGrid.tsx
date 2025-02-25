import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Community, Opportunity } from "@/types";

type Props = {
  opportunities: Opportunity[];
  showCommunity?: boolean;
  communities?: Community[];
};

export const ActivityGrid = ({
  opportunities,
  showCommunity = false,
  communities,
}: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {opportunities.map((opportunity) => {
        const community = communities?.find(
          (p) => p.id === opportunity.communityId
        );
        const images = opportunity.images || [];
        const mainImage = images[0];
        const imageUrl =
          typeof mainImage === "string"
            ? mainImage
            : mainImage?.url || "/placeholder.jpg";

        return (
          <Dialog key={opportunity.id}>
            <DialogTrigger asChild>
              <div className="cursor-pointer group relative">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={imageUrl}
                    alt={opportunity.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {opportunity.participants &&
                    opportunity.participants.length > 0 && (
                      <div className="absolute bottom-2 right-2">
                        <AvatarGroup className="justify-start">
                          {opportunity.participants.map((participant) => (
                            <Avatar
                              key={participant.id}
                              className="w-6 h-6 border border-white bg-white"
                            >
                              <AvatarImage src={participant.image} />
                              <AvatarFallback className="text-xs">
                                {participant.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </div>
                    )}
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-medium line-clamp-2 mb-1">
                    {opportunity.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-1 text-xs text-muted-foreground">
                    <time className="shrink-0">
                      {format(new Date(opportunity.startsAt), "yyyy/M/d", {
                        locale: ja,
                      })}
                    </time>
                    <span className="shrink-0">・</span>
                    <span className="truncate text-xs">
                      {opportunity.location.name}
                    </span>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(opportunity.startsAt), "yyyy年M月d日(E)", {
                      locale: ja,
                    })}
                  </div>
                  <Link
                    href={`/opportunities/${opportunity.id}`}
                    className="block group"
                  >
                    <h3 className="text-xl font-medium group-hover:text-primary">
                      {opportunity.title}
                    </h3>
                  </Link>
                  {showCommunity && community && (
                    <div className="text-sm text-muted-foreground">
                      {community.title}
                    </div>
                  )}
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={opportunity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-muted-foreground">
                  {opportunity.description}
                </p>
                <div className="flex items-center gap-2">
                  <AvatarGroup>
                    {opportunity.participants?.map((participant) => (
                      <Avatar key={participant.id}>
                        <AvatarImage src={participant.image} />
                        <AvatarFallback>
                          {participant.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <span className="text-sm text-muted-foreground">
                    {opportunity.participants?.length || 0}人が参加
                  </span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};
