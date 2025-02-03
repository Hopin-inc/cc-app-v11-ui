import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Community } from "@/types";
import Image from "next/image";

type ExchangeItem = {
  id: string;
  title: string;
  description: string;
  points: number;
  image?: string;
};

// TODO: 実際の交換アイテムデータを用意する
const MOCK_EXCHANGE_ITEMS: ExchangeItem[] = [
  {
    id: "1",
    title: "オリジナルTシャツ",
    description: "コミュニティロゴ入りのTシャツです",
    points: 1000,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "ステッカーセット",
    description: "コミュニティロゴのステッカー5枚セット",
    points: 300,
    image: "/placeholder.svg",
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  community: Community;
  availablePoints: number;
};

export const ExchangePointModal = ({
  isOpen,
  onClose,
  community,
  availablePoints,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<ExchangeItem | null>(null);

  const handleExchange = () => {
    // TODO: 交換処理の実装
    console.log("Exchange", { selectedItem });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ポイントを交換</DialogTitle>
          <DialogDescription>
            {community.title}のポイントを特典と交換します
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            利用可能ポイント: {availablePoints.toLocaleString()} pt
          </p>
          <div className="grid gap-4">
            {MOCK_EXCHANGE_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedItem?.id === item.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted"
                } ${
                  availablePoints < item.points
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  if (availablePoints >= item.points) {
                    setSelectedItem(selectedItem?.id === item.id ? null : item);
                  }
                }}
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 relative rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.image ?? "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      {item.points.toLocaleString()} pt
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleExchange} disabled={!selectedItem}>
            交換する
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
