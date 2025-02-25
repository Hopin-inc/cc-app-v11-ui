import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Community } from "@/types";
import { ArrowUpRight, ArrowDownRight, Gift } from "lucide-react";

type PointHistory = {
  id: string;
  type: "transfer" | "exchange" | "earn";
  title: string;
  amount: number;
  date: Date;
};

// TODO: 実際の履歴データを用意する
const MOCK_HISTORY: PointHistory[] = [
  {
    id: "1",
    type: "earn",
    title: "オリーブ畑の整備活動に参加",
    amount: 1000,
    date: new Date("2024-01-10T09:00:00"),
  },
  {
    id: "2",
    type: "earn",
    title: "オリーブオイル搾油体験に参加",
    amount: 1200,
    date: new Date("2024-01-15T10:00:00"),
  },
  {
    id: "3",
    type: "earn",
    title: "オリーブ収穫祭の運営をサポート",
    amount: 800,
    date: new Date("2024-01-20T13:00:00"),
  },
  {
    id: "4",
    type: "exchange",
    title: "プレミアムオリーブオイルと交換",
    amount: -1000,
    date: new Date("2024-01-25T15:00:00"),
  },
  {
    id: "5",
    type: "exchange",
    title: "オリーブ石鹸セットと交換",
    amount: -800,
    date: new Date("2024-01-30T11:00:00"),
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  community: Community;
};

export const PointHistoryModal = ({ isOpen, onClose, community }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>ポイント履歴</DialogTitle>
          <DialogDescription>
            {community.title}のポイント獲得・利用履歴
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            {MOCK_HISTORY.map((history) => (
              <div
                key={history.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      history.type === "earn"
                        ? "bg-green-100 text-green-600"
                        : history.type === "exchange"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {history.type === "earn" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : history.type === "exchange" ? (
                      <Gift className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{history.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {history.date.toLocaleString("ja-JP", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    history.amount > 0 ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {history.amount > 0 ? "+" : ""}
                  {history.amount.toLocaleString()} pt
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
