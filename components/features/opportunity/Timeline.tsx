"use client";

import Link from "next/link";
import Image from "next/image";
import { Opportunity, Community } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type TimelineProps = {
  groupedOpportunities: Record<string, Opportunity[]>;
  showCommunity?: boolean;
  communities?: Community[];
  sortDirection?: "asc" | "desc";
};

export const Timeline = ({
  groupedOpportunities,
  showCommunity = false,
  communities,
  sortDirection = "asc",
}: TimelineProps) => {
  return (
    <div className="space-y-8">
      {Object.entries(groupedOpportunities)
        .sort(([a], [b]) => {
          return sortDirection === "desc"
            ? b.localeCompare(a)
            : a.localeCompare(b);
        })
        .map(([year, opportunities]) => (
          <div key={year} className="space-y-2">
            <h3 className="sticky top-16 z-20 -mx-4 bg-background/95 backdrop-blur-sm py-2 px-4 text-base font-semibold text-muted-foreground">
              {year}年
            </h3>
            <div className="relative space-y-2 pl-6">
              {/* Timeline line */}
              <div className="absolute left-[10px] top-[24px] bottom-2 w-[1px] bg-border" />
              {opportunities.map((opportunity) => {
                const community = communities?.find(
                  (p) => p.id === opportunity.communityId
                );
                return (
                  <div key={opportunity.id} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-[-22px] top-[20px] w-4 h-4 rounded-full border-2 border-border bg-muted" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pt-[18px]">
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(opportunity.startsAt), "M月d日(E)", {
                            locale: ja,
                          })}
                        </div>
                      </div>
                      <div className="flex items-start flex-col gap-4">
                        <Link
                          href={`/opportunities/${opportunity.id}`}
                          className="block space-y-2 group/link relative rounded-lg px-2 -mx-2 transition-all duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-lg group-hover/link:text-primary">
                                {opportunity.title}
                              </h4>
                              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover/link:text-primary duration-200 hidden group-hover/link:block" />
                            </div>
                            <p className="text-muted-foreground line-clamp-3 mt-2 text-sm">
                              {opportunity.description}
                            </p>
                          </div>
                        </Link>
                        {showCommunity && community && (
                          <Link
                            href={`/communities/${community.id}`}
                            className="block group/link relative"
                          >
                            <div className="flex items-center gap-x-2">
                              <div className="w-6 h-6 relative">
                                {community.icon && (
                                  <Image
                                    src={community.icon || ""}
                                    alt={community?.title || ""}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground group-hover/link:text-primary">
                                {community?.title}
                              </span>
                            </div>
                          </Link>
                        )}
                        {/* Images */}
                        {opportunity.images &&
                          opportunity.images.length > 0 && (
                            <div
                              className={cn(
                                "w-full",
                                opportunity.images.length >= 3
                                  ? "flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
                                  : "grid grid-cols-2 gap-2"
                              )}
                            >
                              {opportunity.images.map((image, index) => (
                                <Dialog key={index}>
                                  <DialogTrigger asChild>
                                    <button
                                      className={cn(
                                        "relative overflow-hidden rounded-md hover:opacity-90 transition-opacity",
                                        (opportunity?.images ?? []).length >= 3
                                          ? "min-w-[240px] aspect-[4/3] snap-center shrink-0 first:ml-0 mr-2"
                                          : "aspect-[4/3]"
                                      )}
                                    >
                                      <Image
                                        src={image.url}
                                        alt={image.caption || opportunity.title}
                                        fill
                                        className="object-cover transition-transform duration-200 hover:scale-[1.2] hover:opacity-90"
                                      />
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <div className="relative aspect-[4/3]">
                                      <Image
                                        src={image.url}
                                        alt={image.caption || opportunity.title}
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                    {image.caption && (
                                      <p className="text-sm text-muted-foreground mt-2">
                                        {image.caption}
                                      </p>
                                    )}
                                  </DialogContent>
                                </Dialog>
                              ))}
                            </div>
                          )}

                        {/* Participants */}
                        {opportunity.participants &&
                          opportunity.participants.length > 0 && (
                            <div className="flex items-center gap-x-2">
                              <AvatarGroup>
                                {opportunity.participants.map((participant) => (
                                  <Avatar key={participant.id}>
                                    <Link
                                      href={`/users/${participant.id}`}
                                      className="group"
                                    >
                                      {participant.image ? (
                                        <AvatarImage
                                          src={participant.image}
                                          alt={participant.name}
                                          className="bg-white border rounded-full   transition-transform duration-200 group-hover:scale-[1.2] group-hover:opacity-90"
                                        />
                                      ) : (
                                        <AvatarFallback>
                                          {participant.name.slice(0, 2)}
                                        </AvatarFallback>
                                      )}
                                    </Link>
                                  </Avatar>
                                ))}
                              </AvatarGroup>
                              <span className="text-sm text-muted-foreground">
                                {opportunity.participants.length}人が参加
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};
