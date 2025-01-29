import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Opportunity } from "@/types";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Building2,
} from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { mockProjects } from "@/lib/data";

interface OpportunityCardProps {
  session: Opportunity;
}

export default function OpportunityCard({ session }: OpportunityCardProps) {
  const isEvent = session.type === "EVENT";
  const project = mockProjects.find((p) => p.id === session.projectId);

  // 説明文を最初の2行に制限する関数
  const getShortDescription = (description: string) => {
    const lines = description.split("\n").filter((line) => line.trim() !== "");
    return lines.slice(0, 2).join("\n");
  };

  const ProjectBadge = () =>
    project && (
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-50 text-xs text-muted-foreground">
        主催：
        <span className="line-clamp-1">{project.title}</span>
      </div>
    );

  if (isEvent) {
    return (
      <Link href={`/sessions/${session.id}`}>
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border my-4">
          {/* Event Header */}
          <div className="relative h-28 bg-gradient-to-r from-blue-500 to-purple-500 p-4">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative">
              <ProjectBadge />
            </div>
          </div>

          {/* Event Content */}
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{session.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {getShortDescription(session.description)}
            </p>

            {/* Event Details */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(session.startsAt), "M月d日(E)", {
                    locale: ja,
                  })}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(session.startsAt), "HH:mm", { locale: ja })} -{" "}
                  {format(new Date(session.endsAt), "HH:mm", { locale: ja })}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>オンライン</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/sessions/${session.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border-2 border-yellow-500/20 my-4">
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              クエスト
            </Badge>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-700" />
              <span className="text-sm font-bold text-yellow-700">
                獲得トークン: 100pt
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2">{session.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {getShortDescription(session.description)}
          </p>

          {/* Quest Details */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                {format(new Date(session.startsAt), "M月d日(E)", {
                  locale: ja,
                })}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>
                {format(new Date(session.startsAt), "HH:mm", { locale: ja })} -{" "}
                {format(new Date(session.endsAt), "HH:mm", { locale: ja })}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <span>オンライン</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              <span>2名</span>
            </div>
          </div>

          {project && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>主催：{project.title}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
