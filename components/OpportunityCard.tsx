import Link from "next/link";
import Image from "next/image";
import type { Opportunity } from "@/types";
import { Clock, Globe, MapPin, Coins, Gift } from "lucide-react";
import { format, isPast } from "date-fns";
import { ja } from "date-fns/locale";
import { mockProjects } from "@/lib/data";
import { cn } from "@/lib/utils";

type OpportunityCardProps = {
  session: Opportunity;
  isJoined?: boolean;
};

export default function OpportunityCard({
  session,
  isJoined,
}: OpportunityCardProps) {
  const isEvent = session.type === "EVENT";
  const project = mockProjects.find((p) => p.id === session.projectId);
  const isPastEvent = isPast(new Date(session.startsAt));

  return (
    <Link href={`/sessions/${session.id}`}>
      <div className="flex items-start gap-4 py-4 px-2 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm group rounded-lg">
        <div className="relative w-15 h-15 flex-shrink-0">
          <Image
            src={session?.image || "/placeholder.svg"}
            alt={session?.title || ""}
            width={60}
            height={60}
            className="rounded-xl transition-transform duration-200 group-hover:scale-[1.02]"
          />
          {isJoined && (
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 py-1 text-[10px] text-center text-white font-medium rounded-b-xl",
                isPastEvent
                  ? "bg-muted-foreground"
                  : isEvent
                  ? "bg-primary"
                  : "bg-primary/60"
              )}
            >
              {isPastEvent ? "参加済み" : isEvent ? "参加予定" : "応募済"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            {project?.title && (
              <span className="truncate">{project.title}</span>
            )}
          </div>
          <h3 className="text-base mb-1 truncate  font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {session.title}
          </h3>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 shrink-0" />
              <span>
                {format(new Date(session.startsAt), "HH:mm", { locale: ja })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {session.location.isOnline ? (
                <>
                  <Globe className="w-3 h-3 shrink-0" />
                  <span>{session.location.name}</span>
                </>
              ) : (
                <>
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{session.location.name}</span>
                </>
              )}
            </div>
            {session.pointsForComplete && (
              <div className="flex items-center gap-2">
                <Gift className="w-3 h-3 shrink-0" />
                <span>{session.pointsForComplete}pt獲得</span>
              </div>
            )}
            {session.pointsForJoin && (
              <div className="flex items-center gap-2">
                <Coins className="w-3 h-3 shrink-0" />
                <span>{session.pointsForJoin}pt必要</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
