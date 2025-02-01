import Image from "next/image";
import Link from "next/link";
import { mockProjects, mockOpportunities } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, CalendarDays, Medal } from "lucide-react";
import { isPast } from "date-fns";

export default function CommunitiesPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-3xl">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="コミュニティを探す"
            className="pl-10"
          />
        </div>

        {/* Communities List */}
        <div className="grid gap-4">
          {mockProjects.map((project) => {
            const opportunities = mockOpportunities.filter(
              (o) => o.projectId === project.id
            );

            const activeEvents = opportunities.filter(
              (o) => !isPast(new Date(o.endsAt)) && o.type === "EVENT"
            ).length;

            const activeQuests = opportunities.filter(
              (o) => !isPast(new Date(o.endsAt)) && o.type === "QUEST"
            ).length;

            const memberCount = [
              ...new Set(
                opportunities.flatMap(
                  (o) => o.participants?.map((p) => p.id) ?? []
                )
              ),
            ].length;

            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="p-3 hover:bg-muted/50 transition-colors group">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 relative shrink-0">
                      <Image
                        src={project.icon ?? "/placeholder.svg"}
                        alt={project.title}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base truncate group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
                        <div className="inline-flex items-center gap-1 text-xs text-muted-foreground/80">
                          <Users className="w-3 h-3" />
                          <span>{memberCount}人のメンバー</span>
                        </div>
                        <div className="inline-flex items-center gap-1 text-xs text-muted-foreground/80">
                          <MapPin className="w-3 h-3" />
                          <span>
                            {project.location.prefecture}
                            {project.location.city}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
