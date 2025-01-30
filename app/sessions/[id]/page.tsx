"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ApplyModal } from "@/components/ApplyModal";
import { mockOpportunities, mockProjects } from "@/lib/data";
import { useParams } from "next/navigation";

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const opportunity = mockOpportunities.find((o) => o.id === id);
  const project = opportunity
    ? mockProjects.find((p) => p.id === opportunity.projectId)
    : null;

  const isEvent = opportunity?.type === "EVENT";

  const handleApply = useCallback(() => {
    setIsApplyModalOpen(true);
  }, []);

  if (!opportunity) {
    return <div>Not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-64 bg-gradient-to-b from-green-800 to-green-900">
        <div className="absolute inset-0">
          <Image
            src={opportunity.image || "/placeholder.svg"}
            alt={opportunity.title}
            fill
            className="object-cover opacity-20"
          />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-black/80">
              <ChevronLeft className="h-4 w-4 mr-1" />
              戻る
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="relative -mt-8 bg-background rounded-t-3xl">
        <div className="container max-w-2xl mx-auto px-8 py-6">
          {/* Title Section */}
          <div className="mb-8">
            {project?.title && (
              <Link href={`/projects/${project.id}`}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 hover:text-primary">
                  <Image
                    src={"/placeholder.svg"}
                    alt={project.title}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>{project.title}</span>
                </div>
              </Link>
            )}

            <h1 className="text-2xl font-bold mb-4">{opportunity.title}</h1>

            {/* Event Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(new Date(opportunity.startsAt), "yyyy年M月d日(E)", {
                    locale: ja,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(new Date(opportunity.startsAt), "HH:mm", {
                    locale: ja,
                  })}
                  {" - "}
                  {format(new Date(opportunity.endsAt), "HH:mm", {
                    locale: ja,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>場所</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              {isEvent ? "イベント詳細" : "クエスト詳細"}
            </h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {opportunity.description.split("\n").map((line, i) => (
                <p key={i} className="mb-4">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="sticky bottom-4 pt-4">
            <Button className="w-full" size="lg" onClick={handleApply}>
              {isEvent ? "参加する" : "応募する"}
            </Button>
          </div>
        </div>
      </div>

      <ApplyModal
        isOpen={isApplyModalOpen}
        onOpenChange={setIsApplyModalOpen}
        opportunity={opportunity}
      />
    </div>
  );
}
