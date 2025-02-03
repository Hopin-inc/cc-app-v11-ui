import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import { Community } from "@/types";
import { ArrowRight, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { mockPointHistory, mockUsers } from "@/lib/data";
import { UserSearchCombobox } from "./UserSearchCombobox";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  community: Community;
  points?: { available: number; total: number };
  currentUserId: string;
};

export const CommunityPointModal = ({
  isOpen,
  onClose,
  community,
  points,
  currentUserId,
}: Props) => {
  const [amount, setAmount] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [startY, setStartY] = useState<number | null>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (modalRef.current?.scrollTop === 0) {
      setStartY(e.touches[0].clientY);
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff > 0) {
      const resistance = 0.4; // 抵抗値を追加して、より自然な動きに
      setOffsetY(diff * resistance);
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (offsetY > 50) {
      const duration = 300;
      const startValue = offsetY;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // イージング関数を使用してよりスムーズに
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentOffset =
          startValue + (window.innerHeight - startValue) * easeOutQuart;

        setOffsetY(currentOffset);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // アニメーション完了後に状態をリセット
          setIsDragging(false);
          setOffsetY(0);
          // アニメーションが完全に終わってから閉じる
          setTimeout(() => {
            onClose();
          }, 50);
        }
      };

      requestAnimationFrame(animate);
    } else {
      // 閉じない場合は元の位置に戻る
      const duration = 200;
      const startValue = offsetY;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // イージング関数でスムーズに戻る
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentOffset = startValue * (1 - easeOutQuart);

        setOffsetY(currentOffset);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setOffsetY(0);
          setIsDragging(false);
        }
      };

      requestAnimationFrame(animate);
    }
    setStartY(null);
  };

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
  const pointHistory = mockPointHistory[community.id] ?? [];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setAmount("");
      return;
    }
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;
    if (points && numValue > points.available) return;
    if (numValue < 0) return;
    setAmount(numValue.toString());
  };

  const selectedUser = selectedUserId
    ? mockUsers.find((user) => user.id === selectedUserId)
    : undefined;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center sm:items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-12"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <Dialog.Panel
                ref={modalRef}
                className={cn(
                  "w-full transform overflow-hidden bg-white shadow-xl transition-all sm:rounded-2xl sm:max-w-md",
                  isDragging
                    ? "transition-none"
                    : "transition-transform duration-300"
                )}
                style={{
                  transform: `translateY(${offsetY}px)`,
                  touchAction: isDragging ? "none" : "auto",
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={cn(
                    "relative h-30 p-6 flex items-end",
                    "before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/0 before:to-black/60"
                  )}
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

                  <div className="relative flex items-center gap-4 text-white">
                    <div className="w-16 h-16 relative shrink-0 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm p-3">
                      <Image
                        src={community.icon ?? "/placeholder.svg"}
                        alt={community.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/80">
                        {rank}
                      </p>
                      <Dialog.Title as="h3" className="text-xl font-bold">
                        {community.title}
                      </Dialog.Title>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-muted/50">
                  <div className="p-6 space-y-6">
                    {points && (
                      <div className="space-y-6">
                        <div className="bg-muted/50 rounded-xl p-4 space-y-1">
                          <p className="text-sm text-muted-foreground">
                            利用可能なポイント
                          </p>
                          <p className="text-2xl font-bold">
                            {points.available.toLocaleString()}
                            <span className="text-sm font-normal ml-1 text-muted-foreground">
                              pt
                            </span>
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-muted-foreground">
                              送金先
                            </label>
                            <UserSearchCombobox
                              onSelect={setSelectedUserId}
                              selectedUserId={selectedUserId}
                              excludeUserId={currentUserId}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor="amount"
                                className="block text-sm font-medium text-muted-foreground"
                              >
                                送金額
                              </label>
                              <button
                                type="button"
                                className="text-xs text-primary hover:text-primary/80"
                                onClick={() =>
                                  setAmount(points.available.toString())
                                }
                              >
                                全額を使用
                              </button>
                            </div>
                            <div className="relative rounded-xl shadow-sm">
                              <input
                                type="number"
                                name="amount"
                                id="amount"
                                value={amount}
                                onChange={handleAmountChange}
                                className="block w-full rounded-xl border-muted bg-muted/50 pl-4 pr-12 py-3 focus:border-primary focus:ring-primary sm:text-sm"
                                placeholder="0"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <span className="text-muted-foreground sm:text-sm">
                                  pt
                                </span>
                              </div>
                            </div>
                            {amount && (
                              <p className="text-xs text-muted-foreground">
                                送金後の残高:{" "}
                                {(
                                  points.available - parseInt(amount)
                                ).toLocaleString()}
                                pt
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-xl border border-muted bg-muted/50 px-6 py-3 text-sm font-medium text-muted-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2"
                            onClick={onClose}
                          >
                            キャンセル
                          </button>
                          <button
                            type="button"
                            className={cn(
                              "inline-flex items-center justify-center rounded-xl border border-transparent px-6 py-3 text-sm font-medium gap-2",
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                              amount && parseInt(amount) > 0 && selectedUserId
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                            )}
                            onClick={() => {
                              if (!selectedUserId || !amount) return;
                              // TODO: Implement transfer logic
                              console.log("Transfer points to:", {
                                fromUserId: currentUserId,
                                toUserId: selectedUserId,
                                projectId: community.id,
                                amount: parseInt(amount),
                              });
                              onClose();
                            }}
                            disabled={
                              !amount ||
                              parseInt(amount) <= 0 ||
                              !selectedUserId
                            }
                          >
                            {selectedUser
                              ? `${selectedUser.name}に送金`
                              : "送金する"}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      ポイント履歴
                    </h4>
                    <div className="space-y-4 max-h-[240px] overflow-y-auto">
                      {pointHistory.length > 0 ? (
                        pointHistory.map((history) => (
                          <div
                            key={history.id}
                            className="flex items-start justify-between gap-4"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  "mt-1 p-2 rounded-lg",
                                  history.type === "EARNED"
                                    ? "bg-emerald-100"
                                    : "bg-amber-100"
                                )}
                              >
                                {history.type === "EARNED" ? (
                                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <ArrowDownRight className="w-4 h-4 text-amber-600" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm">{history.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  {format(
                                    new Date(history.createdAt),
                                    "M月d日(E) HH:mm",
                                    {
                                      locale: ja,
                                    }
                                  )}
                                </p>
                              </div>
                            </div>
                            <p
                              className={cn(
                                "tabular-nums",
                                history.type === "EARNED"
                                  ? "text-emerald-600"
                                  : "text-amber-600"
                              )}
                            >
                              {history.type === "EARNED" ? "+" : "-"}
                              {history.amount.toLocaleString()}
                              <span className="text-xs ml-0.5">pt</span>
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-center text-muted-foreground py-8">
                          履歴がありません
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
