"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockActivities } from "@/lib/data";
import { ActivityDetailHeader } from "@/components/features/activity/ActivityDetailHeader";
import { ActivityDetailContent } from "@/components/features/activity/ActivityDetailContent";
import { ActivityReservationSheet } from "@/components/features/activity/ActivityReservationSheet";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isConfirmSheetOpen, setIsConfirmSheetOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const activity = mockActivities.find((a) => a.id === params.id);

  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-base font-bold mb-2 text-gray-800">
          お探しの体験が見つかりません
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          申し訳ありません。お探しの体験は削除されたか、まだ準備中の可能性があります。
        </p>
        <Link
          href="/activities"
          className="text-blue-700 hover:text-blue-900 border-b-2 border-blue-700 pb-0.5 transition-colors"
        >
          体験一覧へ戻る
        </Link>
      </div>
    );
  }

  const handleApply = useCallback(() => {
    setIsConfirmSheetOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    if (!selectedDate) {
      toast({
        title: "日程を選択してください",
        description: "予約には参加希望日の選択が必要です",
        variant: "destructive",
      });
      return;
    }

    // 予約申請処理（モック）
    toast({
      title: "予約申請を受け付けました",
      description: "主催者からの連絡をお待ちください",
    });
    setIsConfirmSheetOpen(false);
    router.push("/activities");
  }, [selectedDate, toast, router]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: activity?.title,
          text: activity?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "URLをコピーしました",
      });
    }
  }, [activity, toast]);

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
      <ActivityDetailHeader activity={activity} />
      <ActivityDetailContent 
        activity={activity} 
        onReservationClick={handleApply}
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
              <Button className="flex-1" size="lg" onClick={handleApply}>
                予約する
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Sheet */}
      {activity && (
        <ActivityReservationSheet
          activity={activity}
          isOpen={isConfirmSheetOpen}
          onOpenChange={setIsConfirmSheetOpen}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
