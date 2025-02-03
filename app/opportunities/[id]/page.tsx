"use client";

import { useCallback, useState, useEffect } from "react";
import { Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticipantsModal } from "@/components/features/opportunity/ParticipantsModal";
import {
  mockOpportunities,
  mockCommunities,
  CURRENT_USER,
  mockUsers,
} from "@/lib/data";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { OpportunityDetailHeader } from "@/components/features/opportunity/OpportunityDetailHeader";
import { OpportunityDetailContent } from "@/components/features/opportunity/OpportunityDetailContent";
import { OpportunityConfirmModal } from "@/components/features/opportunity/OpportunityConfirmModal";
import { OpportunityCompletedModal } from "@/components/features/opportunity/OpportunityCompletedModal";

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

  if (!opportunity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-base font-bold mb-2 text-gray-800">
          お探しの活動が見つかりません
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          申し訳ありません。お探しの活動は削除されたか、まだ準備中の可能性があります。
        </p>
        <Link
          href="/"
          className="text-blue-700 hover:text-blue-900 border-b-2 border-blue-700 pb-0.5 transition-colors"
        >
          トップページへ戻る
        </Link>
      </div>
    );
  }

  useEffect(() => {
    if (opportunity) {
      setIsJoined(opportunity.participants?.some((p) => p.id === "user1"));
    }
  }, [opportunity]);

  const community = opportunity?.communityId
    ? mockCommunities.find((p) => p.id === opportunity.communityId)
    : null;

  const isEvent = opportunity?.type === "EVENT";
  const isFull =
    opportunity?.participants && opportunity?.capacity
      ? opportunity.participants.length >= opportunity?.capacity
      : false;

  const userPoints =
    mockUsers.find((u) => u.id === CURRENT_USER.id)?.points[
      opportunity?.communityId ?? ""
    ]?.available ?? 0;

  const hasEnoughPoints = userPoints >= (opportunity?.pointsForJoin ?? 0);

  const handleApply = useCallback(() => {
    setIsConfirmSheetOpen(true);
  }, []);

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
      `${community?.title}\n${opportunity.description}`
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
  }, [opportunity, community]);

  const getButtonLabel = useCallback(() => {
    if (isFull) return "満員です";
    if (!isJoined) return isEvent ? "参加する" : "応募する";
    return isEvent ? "参加予定" : "応募済み（未確定）";
  }, [isFull, isJoined, isEvent]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowButton(currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <OpportunityDetailHeader opportunity={opportunity} />
      <OpportunityDetailContent
        opportunity={opportunity}
        community={community ?? null}
        userPoints={userPoints}
        hasEnoughPoints={hasEnoughPoints}
        onParticipantsClick={() => setIsParticipantsModalOpen(true)}
      />

      <div className="h-16" />

      {/* Floating Action Button */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-4 pb-20 bg-gradient-to-t from-background to-transparent transition-transform duration-300 ease-in-out ${
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
                disabled={isFull || !hasEnoughPoints || isJoined}
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
      <OpportunityConfirmModal
        isOpen={isConfirmSheetOpen}
        onClose={() => setIsConfirmSheetOpen(false)}
        onConfirm={handleConfirmJoin}
        opportunity={opportunity}
        isJoined={isJoined}
        isEvent={isEvent}
      />

      <OpportunityCompletedModal
        isOpen={isCompletedSheetOpen}
        onClose={() => setIsCompletedSheetOpen(false)}
        opportunity={opportunity}
        isJoined={isJoined}
        isEvent={isEvent}
        onShare={handleShare}
        onAddToCalendar={handleAddToCalendar}
      />

      <ParticipantsModal
        isOpen={isParticipantsModalOpen}
        onOpenChange={setIsParticipantsModalOpen}
        participants={opportunity?.participants || []}
      />
    </div>
  );
}
