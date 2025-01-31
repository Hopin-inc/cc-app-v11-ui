import Link from "next/link";
import Image from "next/image";
import type { Opportunity } from "@/types";
import { Clock, Globe, MapPin } from "lucide-react";
import { format } from "date-fns";
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

  return (
    <Link href={`/sessions/${session.id}`}>
      <div className="flex items-start gap-4 py-4 px-2">
        <div className="relative w-15 h-15 flex-shrink-0">
          <Image
            src={session?.image || "/placeholder.svg"}
            alt={session?.title || ""}
            width={60}
            height={60}
            className="rounded-xl"
          />
          {isJoined && (
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 py-1 text-[10px] text-center text-white font-medium rounded-b-xl",
                isEvent ? "bg-primary" : "bg-primary/60"
              )}
            >
              {isEvent ? "参加予定" : "応募済"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            {project?.title && (
              <span className="truncate">{project.title}</span>
            )}
          </div>
          <h3 className="font-bold text-base mb-1 truncate">{session.title}</h3>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>
                {format(new Date(session.startsAt), "HH:mm", { locale: ja })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {session.location.isOnline ? (
                <>
                  <Globe className="w-3 h-3" />
                  <span>{session.location.name}</span>
                </>
              ) : (
                <>
                  <MapPin className="w-3 h-3" />
                  <span>{session.location.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
