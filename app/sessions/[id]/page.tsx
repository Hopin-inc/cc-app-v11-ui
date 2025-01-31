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
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ApplyModal } from "@/components/ApplyModal";
import { ParticipantsModal } from "@/components/ParticipantsModal";
import { mockOpportunities, mockProjects } from "@/lib/data";
import { useParams } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OpportunityCard from "@/components/OpportunityCard";

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
    const SCROLL_THRESHOLD = 200; // スクロールを開始する閾値

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 200px以上スクロールしたら表示を制御
      if (currentScrollY > SCROLL_THRESHOLD) {
        // 下スクロール時に表示、上スクロール時に非表示
        setShowButton(currentScrollY > lastScrollY);
      } else {
        // 閾値以下なら非表示
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
            <h1 className="mt-2 text-2xl font-bold mb-4">
              {opportunity.title}
            </h1>

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
              <Link href={`/projects/${project?.id}`} className="mt-8 block">
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
                        <h3 className="font-medium">{project?.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {project?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Capacity and Participants */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-6">参加者一覧</h2>
              <div className="bg-muted/20 rounded-2xl p-6 space-y-6 border">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {opportunity?.participants?.length || 0}
                    </span>
                    <span className="text-muted-foreground">
                      / {opportunity?.capacity || 0} 名
                    </span>
                  </div>
                  {isFull && (
                    <span className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-full">
                      満員
                    </span>
                  )}
                </div>

                {opportunity.participants?.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => setIsParticipantsModalOpen(true)}
                        className="flex items-center gap-4 hover:opacity-80"
                      >
                        <div className="flex">
                          {opportunity.participants
                            .slice(0, 2)
                            .map((participant, index) => (
                              <div
                                key={participant.id}
                                className="relative w-8 h-8 rounded-full border-2 border-background overflow-hidden hover:scale-110 transition-transform"
                                style={{
                                  marginLeft: index === 0 ? 0 : "-8px",
                                  zIndex: index,
                                }}
                              >
                                <Image
                                  src={participant.image || "/placeholder.svg"}
                                  alt={participant.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          {opportunity.participants.length > 2 && (
                            <div
                              className="relative w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium hover:scale-110 transition-transform"
                              style={{ marginLeft: "-8px", zIndex: 2 }}
                            >
                              +{opportunity.participants.length - 2}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {opportunity.participants.slice(0, 2).map((p, i) => (
                            <span key={p.id}>
                              {p.name}
                              {i <
                              Math.min(1, opportunity.participants.length - 1)
                                ? "、"
                                : ""}
                            </span>
                          ))}
                          {opportunity.participants.length > 2 && (
                            <span>ほか</span>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {opportunity.relatedArticles &&
            opportunity.relatedArticles.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">関連記事</h2>
                <div className="grid gap-4">
                  {opportunity.relatedArticles.map((article, i) => (
                    <Link
                      key={article.url}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:bg-muted/10 transition-all duration-200">
                        <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              {article.type === "interview"
                                ? "INTERVIEW"
                                : "ARTICLE"}
                            </span>
                          </div>
                          <h3 className="font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          {article.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {article.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>

      <div className="h-16" />

      <div
        className={`fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent ${
          showButton ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container max-w-lg mx-auto">
          <div className="sticky bottom-4 w-full">
            <div className="bg-background/80 backdrop-blur-sm rounded-xl px-4 flex gap-2 items-center">
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

      {/* Quest Apply Confirmation */}
      {!isEvent && (
        <Sheet open={isConfirmSheetOpen} onOpenChange={setIsConfirmSheetOpen}>
          <SheetContent side="bottom" className="max-w-lg mx-auto">
            <div className="container max-w-lg mx-auto px-4">
              <SheetHeader className="text-center mb-6">
                <SheetTitle>応募の確認</SheetTitle>
                <SheetDescription>
                  以下のクエストでお間違いありませんか?
                </SheetDescription>
              </SheetHeader>
              <div>
                <div className="text-xs text-muted-foreground mb-2">
                  {format(new Date(opportunity.startsAt), "M月d日(E)", {
                    locale: ja,
                  })}
                </div>
                <div className="bg-muted/20 rounded-xl">
                  <OpportunityCard session={opportunity} isJoined={isJoined} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-12 space-y-4">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleConfirmJoin}
                >
                  確定する
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Quest Apply Completed */}
      {!isEvent && (
        <Sheet
          open={isCompletedSheetOpen}
          onOpenChange={setIsCompletedSheetOpen}
        >
          <SheetContent side="bottom" className="max-w-lg mx-auto">
            <div className="container max-w-lg mx-auto px-4">
              <SheetHeader className="text-center mb-6">
                <SheetTitle>応募を受け付けました！</SheetTitle>
                <SheetDescription>
                  LINEで確定次第通知します。以下のボタンからLINE友達に追加してください。
                </SheetDescription>
              </SheetHeader>
              <div>
                <div className="text-xs text-muted-foreground mb-2">
                  {format(new Date(opportunity.startsAt), "M月d日(E)", {
                    locale: ja,
                  })}
                </div>
                <div className="bg-muted/20 rounded-xl">
                  <OpportunityCard session={opportunity} isJoined={isJoined} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-12 space-y-4">
                <Button
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() =>
                    window.open(
                      "https://line.me/R/ti/p/@your-line-id",
                      "_blank"
                    )
                  }
                >
                  <Phone className="mr-2 h-4 w-4" />
                  <span>LINE友達に追加</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  共有する
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Event Join Confirmation */}
      {isEvent && (
        <Sheet open={isConfirmSheetOpen} onOpenChange={setIsConfirmSheetOpen}>
          <SheetContent side="bottom" className="max-w-lg mx-auto">
            <div className="container max-w-lg mx-auto px-4">
              <SheetHeader className="text-center mb-6">
                <SheetTitle>参加の確認</SheetTitle>
                <SheetDescription>
                  以下のイベントでお間違いありませんか?
                </SheetDescription>
              </SheetHeader>
              <div>
                <div className="text-xs text-muted-foreground mb-2">
                  {format(new Date(opportunity.startsAt), "M月d日(E)", {
                    locale: ja,
                  })}
                </div>
                <div className="bg-muted/20 rounded-xl">
                  <OpportunityCard session={opportunity} isJoined={isJoined} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-12 space-y-4">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleConfirmJoin}
                >
                  確定する
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Event Join Completed */}
      {isEvent && (
        <Sheet
          open={isCompletedSheetOpen}
          onOpenChange={setIsCompletedSheetOpen}
        >
          <SheetContent side="bottom" className="max-w-lg mx-auto">
            <div className="container max-w-lg mx-auto px-4">
              <SheetHeader className="text-center mb-6">
                <SheetTitle>参加予定です！</SheetTitle>
                <SheetDescription>
                  以下のイベントへの参加を受け付けました
                </SheetDescription>
              </SheetHeader>
              <div>
                <div className="text-xs text-muted-foreground mb-2">
                  {format(new Date(opportunity.startsAt), "M月d日(E)", {
                    locale: ja,
                  })}
                </div>
                <div className="bg-muted/20 rounded-xl">
                  <OpportunityCard session={opportunity} isJoined={isJoined} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-12 space-y-4">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCalendar}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  カレンダーに追加
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  共有する
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Participants Modal */}
      <ParticipantsModal
        isOpen={isParticipantsModalOpen}
        onOpenChange={setIsParticipantsModalOpen}
        participants={opportunity?.participants || []}
      />
    </div>
  );
}
