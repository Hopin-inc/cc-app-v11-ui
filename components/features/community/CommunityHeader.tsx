import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  MapPin,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import type { Community } from "@/types";

const socialIcons = {
  website: Globe,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
} as const;

type Props = {
  community: Community;
  memberCount: number;
};

export const CommunityHeader = ({ community, memberCount }: Props) => {
  return (
    <>
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg" />
        <div className="absolute left-6 -bottom-6">
          <div className="w-24 h-24 relative shrink-0 rounded-2xl overflow-hidden ring-4 ring-background">
            <Image
              src={community.icon ?? "/placeholder.svg"}
              alt={community.title}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-8 px-4">
        <div>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">{community.title}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Users className="w-3.5 h-3.5" />
                {memberCount}人
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed mt-2">
            {community.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>
                {community.location.prefecture}
                {community.location.city}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {community.socialLinks?.map((link, i) => {
                const Icon = socialIcons[link.type];
                return (
                  <Button
                    key={i}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-secondary hover:bg-secondary/80 group"
                    asChild
                  >
                    <Link href={link.url} target="_blank">
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-secondary-foreground" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
