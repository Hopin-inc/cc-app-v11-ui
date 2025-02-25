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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ExchangeItem = {
  id: string;
  title: string;
  description: string;
  points: number;
  image?: string;
  category: "ticket" | "idle_asset";
};

// TODO: 実際の交換アイテムデータを用意する
const MOCK_EXCHANGE_ITEMS: ExchangeItem[] = [
  {
    id: "1",
    title: "体験チケット",
    description: "地域の伝統工芸を体験できるチケットです",
    points: 2000,
    image: "/placeholder.svg",
    category: "ticket",
  },
  {
    id: "2",
    title: "おもてなしパーティー",
    description: "地域の方々との交流会に参加できるチケットです",
    points: 3000,
    image: "/placeholder.svg",
    category: "ticket",
  },
  {
    id: "3",
    title: "古民家宿泊券",
    description: "地域の古民家に1泊できる宿泊券です",
    points: 5000,
    image: "/placeholder.svg",
    category: "idle_asset",
  },
  {
    id: "4",
    title: "どんぐりの殻",
    description: "地域の子どもたちが集めたどんぐりの殻です",
    points: 100,
    image: "/placeholder.svg",
    category: "idle_asset",
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
  const [selectedCategory, setSelectedCategory] = useState<
    "ticket" | "idle_asset"
  >("ticket");

  const handleExchange = () => {
    // TODO: 交換処理の実装
    console.log("Exchange", { selectedItem });
    onClose();
  };

  const filteredItems = MOCK_EXCHANGE_ITEMS.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
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
          <Tabs
            value={selectedCategory}
            onValueChange={(v) =>
              setSelectedCategory(v as "ticket" | "idle_asset")
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ticket">有料チケット</TabsTrigger>
              <TabsTrigger value="idle_asset">遊休資産チケット</TabsTrigger>
            </TabsList>
            <TabsContent value="ticket" className="mt-4">
          <div className="grid gap-4">
                {filteredItems.map((item) => (
                  <ExchangeItemCard
                key={item.id}
                    item={item}
                    isSelected={selectedItem?.id === item.id}
                    availablePoints={availablePoints}
                    onSelect={() =>
                      setSelectedItem(
                        selectedItem?.id === item.id ? null : item
                      )
                    }
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="idle_asset" className="mt-4">
              <div className="grid gap-4">
                {filteredItems.map((item) => (
                  <ExchangeItemCard
                    key={item.id}
                    item={item}
                    isSelected={selectedItem?.id === item.id}
                    availablePoints={availablePoints}
                    onSelect={() =>
                      setSelectedItem(
                        selectedItem?.id === item.id ? null : item
                      )
                    }
                  />
            ))}
          </div>
            </TabsContent>
          </Tabs>
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

const ExchangeItemCard = ({
  item,
  isSelected,
  availablePoints,
  onSelect,
}: {
  item: ExchangeItem;
  isSelected: boolean;
  availablePoints: number;
  onSelect: () => void;
}) => (
  <div
    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
      isSelected ? "border-primary bg-primary/5" : "hover:bg-muted"
    } ${availablePoints < item.points ? "opacity-50 cursor-not-allowed" : ""}`}
    onClick={() => {
      if (availablePoints >= item.points) {
        onSelect();
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
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <p className="text-sm font-semibold mt-1">
          {item.points.toLocaleString()} pt
        </p>
      </div>
    </div>
  </div>
);
