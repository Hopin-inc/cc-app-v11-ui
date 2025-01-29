import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Opportunity } from "@/types";
import { getCategoryEmoji } from "@/lib/utils/emoji-mapper";
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
  const emoji = getCategoryEmoji(session.categories);
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
            <div className="absolute top-4 right-4 flex gap-1.5">
              {session.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="bg-white/90 text-xs"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
            <div className="absolute -bottom-6 left-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-xl">
                {emoji}
              </div>
            </div>
          </div>

          {/* Event Content */}
          <div className="pt-8 px-4 pb-4">
            {/* Title */}
            <h3 className="text-base font-bold mb-2 line-clamp-1">
              {session.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {getShortDescription(session.description)}
            </p>

            {/* Project Badge */}
            <div className="mb-4 text-right">
              <ProjectBadge />
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {format(new Date(session.startsAt), "M月d日(E)", {
                    locale: ja,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {format(new Date(session.startsAt), "HH:mm", { locale: ja })}{" "}
                  - {format(new Date(session.endsAt), "HH:mm", { locale: ja })}
                </span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <MapPin className="w-3.5 h-3.5" />
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
        {/* Quest Header */}
        <div className="bg-yellow-500/10 px-4 py-3 flex justify-between items-center border-b border-yellow-500/30">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-yellow-500 text-white text-xs"
            >
              クエスト
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-yellow-700">
            <Trophy className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">獲得トークン: 100pt</span>
          </div>
        </div>

        {/* Quest Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-base font-bold mb-2 line-clamp-1">
            {session.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {getShortDescription(session.description)}
          </p>

          {/* Project Badge */}
          <div className="mb-4 text-right">
            <ProjectBadge />
          </div>

          {/* Categories */}
          {/* <div className="flex flex-wrap gap-1.5 mb-3">
                {session.categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant="secondary"
                    className="bg-yellow-500/10 text-yellow-700 text-xs"
                  >
                    {category.name}
                  </Badge>
                ))}
               </div> */}

          {/* Quest Details */}
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {format(new Date(session.startsAt), "M月d日(E)", {
                  locale: ja,
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {format(new Date(session.startsAt), "HH:mm", { locale: ja })} -{" "}
                {format(new Date(session.endsAt), "HH:mm", { locale: ja })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>オンライン</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>募集人数: 2名</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
