"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Calendar,
  Globe,
  Share2,
  Coins,
  HelpCircle,
  MoreVertical,
} from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ParticipantsModal } from "@/components/ParticipantsModal";
import { mockOpportunities, mockProjects } from "@/lib/data";
import { useParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RelatedArticles } from "@/components/features/opportunity/RelatedArticles";
import { ParticipantsList } from "@/components/features/opportunity/ParticipantsList";
import { OpportunityModals } from "@/components/features/opportunity/OpportunityModals";

export default function OpportunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = useParams();
  const [isConfirmSheetOpen, setIsConfirmSheetOpen] = useState(false);
  const [isCompletedSheetOpen, setIsCompletedSheetOpen] = useState(false);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const opportunity = mockOpportunities.find((o) => o.id === id);

  useEffect(() => {
    if (!opportunity) return;
    setIsJoined(opportunity.participants?.some((p) => p.id === "user1"));
  }, [opportunity]);

  const project = opportunity
    ? mockProjects.find((p) => p.id === opportunity.projectId)
    : null;

  const isEvent = opportunity?.type === "EVENT";
  const isFull =
    (opportunity?.participants?.length ?? 0) >= (opportunity?.capacity ?? 0);

  const handleApply = useCallback(() => {
    if (isEvent) {
      setIsConfirmSheetOpen(true);
    } else {
      setIsConfirmSheetOpen(true);
    }
  }, [isEvent]);

  const handleConfirmJoin = useCallback(() => {
    setIsConfirmSheetOpen(false);
    setIsCompletedSheetOpen(true);
    setIsJoined(true);
  }, []);

  const handleCancelJoin = useCallback(() => {
    setIsJoined(false);
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: opportunity?.title,
          text: opportunity?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("URLをコピーしました");
    }
  }, [opportunity]);

  const handleAddToCalendar = useCallback(() => {
    if (!opportunity?.startsAt || !opportunity?.endsAt) return;
    const startTime = new Date(opportunity.startsAt);
    const endTime = new Date(opportunity.endsAt);

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      opportunity.title
    )}&details=${encodeURIComponent(
      `${project?.title}\n${opportunity.description}`
    )}&location=${encodeURIComponent(
      opportunity.location.name
    )}&dates=${startTime
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}\/${endTime
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}`;

    window.open(url, "_blank");
  }, [opportunity, project]);

  const getButtonLabel = useCallback(() => {
    if (isFull) return "満員です";
    if (!isJoined) return isEvent ? "参加する" : "応募する";
    return isEvent ? "参加予定" : "応募済み（未確定）";
  }, [isFull, isJoined, isEvent]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const SCROLL_THRESHOLD = 200;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > SCROLL_THRESHOLD) {
        setShowButton(currentScrollY > lastScrollY);
      } else {
        setShowButton(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!opportunity) {
    return <div>Not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-b from-green-800 to-green-900">
        <div className="absolute inset-0">
          <Image
            src={opportunity.image || "/placeholder.svg"}
            alt={opportunity.title}
            fill
            className="object-cover opacity-20"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative -mt-8 bg-background rounded-t-3xl">
        <div className="container max-w-2xl mx-auto px-8 py-6 space-y-8">
          {/* Title Section */}
          <div className="mb-8">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {opportunity.type === "EVENT" ? "イベント" : "クエスト"}
            </span>
            <h1 className="mt-2 text-2xl font-bold mb-4">{opportunity.title}</h1>

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
                {opportunity?.location?.isOnline ? (
                  <Globe className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                )}
                <span>{opportunity?.location?.name}</span>
              </div>

              {/* Points for Quest */}
              {!isEvent && opportunity?.pointsForComplete && (
                <div className="flex items-center gap-2 text-sm">
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {opportunity.pointsForComplete.toLocaleString()}ポイント獲得
                  </span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="cursor-help">
                        <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          ポイントについて
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          1000ポイントでプロジェクト懇親会への招待券をプレゼント
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {isEvent ? "イベントについて" : "クエストについて"}
              </h2>
              <div className="prose prose-sm max-w-none">
                {opportunity.description.split("\n").map((line, i) => (
                  <p key={i} className="mb-4">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Recommended For */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">こんな方におすすめ</h2>
              <ul className="space-y-2">
                {opportunity.recommendedFor.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="mt-1">
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Speaker/Host Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {isEvent ? "スピーカーの紹介" : "ホストの紹介"}
              </h2>
              <div className="flex items-start space-x-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={opportunity.host.image || "/placeholder.svg"}
                    alt={opportunity.host.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{opportunity.host.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {opportunity.host.title}
                  </p>
                  <p className="text-sm">{opportunity.host.bio}</p>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">プロジェクトについて</h2>
              <Link
                href={`/projects/${project?.id}`}
                className="mt-8 block group"
              >
                <div className="border rounded-xl p-4 hover:bg-muted/10 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden">
                      <Image
                        src={"/placeholder.svg"}
                        alt={project?.title || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium group-hover:text-primary">
                          {project?.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {project?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Related Articles */}
            {opportunity.relatedArticles && (
              <RelatedArticles articles={opportunity.relatedArticles} />
            )}

            {/* Participants List */}
            <ParticipantsList
              participants={opportunity.participants || []}
              capacity={opportunity.capacity}
              onOpenModal={() => setIsParticipantsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className="h-16" />

      {/* Fixed Bottom Button */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent ${
          showButton ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container max-w-lg mx-auto">
          <div className="sticky bottom-4 w-full">
            <div className="bg-background/80 backdrop-blur-sm rounded-xl px-8 flex gap-2 items-center">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleApply}
                disabled={isFull || isJoined}
              >
                {getButtonLabel()}
              </Button>
              {isJoined && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={handleCancelJoin}
                      className="text-destructive"
                    >
                      参加をキャンセル
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <OpportunityModals
        opportunity={opportunity}
        isEvent={isEvent}
        isJoined={isJoined}
        isConfirmSheetOpen={isConfirmSheetOpen}
        isCompletedSheetOpen={isCompletedSheetOpen}
        onConfirmSheetOpenChange={setIsConfirmSheetOpen}
        onCompletedSheetOpenChange={setIsCompletedSheetOpen}
        onConfirmJoin={handleConfirmJoin}
        onShare={handleShare}
        onAddToCalendar={handleAddToCalendar}
      />

      {/* Participants Modal */}
      <ParticipantsModal
        isOpen={isParticipantsModalOpen}
        onOpenChange={setIsParticipantsModalOpen}
        participants={opportunity?.participants || []}
      />
    </div>
  );
}
