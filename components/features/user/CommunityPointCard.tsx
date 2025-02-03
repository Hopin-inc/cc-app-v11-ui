import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Community } from "@/types";
import { useState } from "react";
import { TransferPointModal } from "./TransferPointModal";
import { ExchangePointModal } from "./ExchangePointModal";

type Props = {
  community: Community;
  points: { available: number; total: number } | undefined;
  onClick: () => void;
};

type Mode = "default" | "transfer" | "exchange";

export const CommunityPointCard = ({ community, points, onClick }: Props) => {
  const [mode, setMode] = useState<Mode>("default");
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  const membershipNumber = `${community.id
    .slice(0, 4)
    .toUpperCase()}${new Date().getFullYear().toString().slice(-2)}`;

  // ランクの計算
  const RANK_THRESHOLDS = {
    PLATINUM: 10000,
    GOLD: 5000,
    SILVER: 2000,
    BRONZE: 0,
  };

  const getRank = (total: number) => {
    if (total >= RANK_THRESHOLDS.PLATINUM) return "PLATINUM";
    if (total >= RANK_THRESHOLDS.GOLD) return "GOLD";
    if (total >= RANK_THRESHOLDS.SILVER) return "SILVER";
    return "BRONZE";
  };

  const rank = points ? getRank(points.total) : "BRONZE";

  // 次のランクまでの進捗を計算
  const getNextRankProgress = (total: number) => {
    const currentRank = getRank(total);
    const nextRankThreshold =
      currentRank === "BRONZE"
        ? RANK_THRESHOLDS.SILVER
        : currentRank === "SILVER"
        ? RANK_THRESHOLDS.GOLD
        : currentRank === "GOLD"
        ? RANK_THRESHOLDS.PLATINUM
        : null;

    if (!nextRankThreshold) return null;

    const prevRankThreshold =
      currentRank === "BRONZE"
        ? RANK_THRESHOLDS.BRONZE
        : currentRank === "SILVER"
        ? RANK_THRESHOLDS.SILVER
        : currentRank === "GOLD"
        ? RANK_THRESHOLDS.GOLD
        : null;

    if (prevRankThreshold === null) return null;

    const progress =
      ((total - prevRankThreshold) / (nextRankThreshold - prevRankThreshold)) *
      100;
    const remaining = nextRankThreshold - total;

    return { progress, remaining, nextRank: getRank(nextRankThreshold) };
  };

  const progress = points ? getNextRankProgress(points.total) : null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl min-w-[280px] p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-2 hover:rotate-1 hover:scale-[1.02]"
      )}
      onClick={onClick}
    >
      {/* グラデーション背景（ランクに応じて変更） */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          rank === "PLATINUM" && "from-slate-700 to-slate-900",
          rank === "GOLD" && "from-amber-500 to-amber-800",
          rank === "SILVER" && "from-slate-400 to-slate-700",
          rank === "BRONZE" && "from-orange-700 to-orange-900"
        )}
      />

      {/* キラキラエフェクト */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,rgba(255,255,255,0.1),transparent_50%)] opacity-50" />

      {/* メインコンテンツ */}
      <div className="relative space-y-6">
        {/* ヘッダー部分 */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="w-10 h-10 relative shrink-0 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm p-2">
              <Image
                src={community.icon ?? "/placeholder.svg"}
                alt={community.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] text-white/60">{rank}</p>
            <p className="text-xs font-mono tracking-widest">
              {membershipNumber}
            </p>
          </div>
        </div>

        {/* ポイント */}
        {points && (
          <div className="space-y-4">
            <p className="text-3xl font-bold tracking-tight">
              {points.available.toLocaleString()}
              <span className="text-sm font-normal ml-1 opacity-60">pt</span>
            </p>

            {progress && mode === "default" && (
              <div className="space-y-2">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/40 rounded-full transition-all duration-500"
                    style={{ width: `${progress.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-white/60">
                  <span>
                    {progress.remaining.toLocaleString()}pt to{" "}
                    {progress.nextRank}
                  </span>
                  <span>{Math.round(progress.progress)}%</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-base font-bold tracking-tight">
            {community.title}
          </h3>

          {/* モード切り替えボタン */}
          {/* <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white"
              onClick={(e) => {
                e.stopPropagation();
                setShowTransferModal(true);
              }}
            >
              送金
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white"
              onClick={(e) => {
                e.stopPropagation();
                setShowExchangeModal(true);
              }}
            >
              交換
            </Button>
          </div> */}
        </div>
      </div>

      {/* モーダル */}
      {points && (
        <>
          <TransferPointModal
            isOpen={showTransferModal}
            onClose={() => setShowTransferModal(false)}
            community={community}
            availablePoints={points.available}
          />
          <ExchangePointModal
            isOpen={showExchangeModal}
            onClose={() => setShowExchangeModal(false)}
            community={community}
            availablePoints={points.available}
          />
        </>
      )}
    </div>
  );
};
