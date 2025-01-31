"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Instagram, Youtube, Globe, Facebook, Twitter } from "lucide-react";
import OpportunityCard from "@/components/OpportunityCard";
import { mockProjects, mockOpportunities } from "@/lib/data";
import type { Opportunity } from "@/types";

type GroupedOpportunities = {
  [date: string]: Opportunity[];
};

const SOCIAL_ICONS = {
  instagram: Instagram,
  youtube: Youtube,
  website: Globe,
  facebook: Facebook,
  twitter: Twitter,
} as const;

export default function ProjectDetailPage() {
  const params = useParams();
  const project = mockProjects.find((p) => p.id === params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  // Get opportunities for this project
  const projectOpportunities = mockOpportunities.filter(
    (o) => o.projectId === project.id
  );

  // Group opportunities by date
  const groupedOpportunities =
    projectOpportunities.reduce<GroupedOpportunities>((acc, opportunity) => {
      const date = format(new Date(opportunity.startsAt), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(opportunity);
      return acc;
    }, {});

  // Sort opportunities within each date group
  Object.keys(groupedOpportunities).forEach((date) => {
    groupedOpportunities[date].sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    );
  });

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-3xl">
      {/* Project Header */}
      <div className="flex items-start gap-6">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={project.icon || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
          <p className="text-muted-foreground whitespace-pre-wrap mb-4">
            {project.description}
          </p>
          {project.socialLinks && project.socialLinks.length > 0 && (
            <div className="flex gap-2">
              {project.socialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[link.type];
                return (
                  <a
                    key={link.type}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Members */}
      <div>
        <h2 className="text-xl font-semibold mb-4">メンバー</h2>
        <div className="flex flex-wrap gap-4">
          {project.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50"
            >
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-muted-foreground">
                  {member.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div>
        <h2 className="text-xl font-semibold mb-4">関わり方一覧</h2>
        <div className="space-y-8">
          {Object.entries(groupedOpportunities)
            .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
            .map(([date, opportunities]) => (
              <div key={date} className="space-y-4">
                <h3 className="font-medium text-muted-foreground">
                  {format(new Date(date), "M月d日(E)", { locale: ja })}
                </h3>
                <div className="space-y-4">
                  {opportunities.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity.id}
                      session={opportunity}
                      isJoined={opportunity.participants?.some(
                        (p) => p.id === "user1"
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
