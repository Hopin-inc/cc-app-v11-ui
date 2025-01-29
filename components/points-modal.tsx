"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PointsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availablePoints: number;
}

const rewards = [
  {
    id: "1",
    title: "地域カフェでのコーヒー1杯無料券",
    description:
      "地元で人気の「まちカフェ」でお好きなコーヒー1杯と交換できます",
    image: "/placeholder.svg?height=80&width=80",
    points: 50,
  },
  {
    id: "2",
    title: "コワーキングスペース3時間無料券",
    description:
      "地域のコワーキングスペース「みんなの仕事場」で3時間無料で利用できます",
    image: "/placeholder.svg?height=80&width=80",
    points: 100,
  },
  {
    id: "3",
    title: "地元農家の規格外野菜セット(1kg)",
    description:
      "地元農家さんの採れたて新鮮野菜の詰め合わせです。形は不揃いでもおいしさは抜群！",
    image: "/placeholder.svg?height=80&width=80",
    points: 150,
  },
  {
    id: "4",
    title: "地域の伝統工芸品ミニ体験チケット",
    description: "地元の職人さんから伝統工芸品の作り方を学べる体験チケットです",
    image: "/placeholder.svg?height=80&width=80",
    points: 200,
  },
];

export function PointsModal({
  open,
  onOpenChange,
  availablePoints,
}: PointsModalProps) {
  const [selectedReward, setSelectedReward] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleExchange = () => {
    setIsConfirmed(true);
  };

  const handleClose = () => {
    setSelectedReward("");
    setIsConfirmed(false);
    onOpenChange(false);
  };

  if (isConfirmed) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto rounded-full bg-green-100 p-3 text-green-600">
              <Check className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center">
              {rewards.find((r) => r.id === selectedReward)?.title}
              と交換しました！
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-sm text-muted-foreground">
              以下のQRコードを保存して、サービス利用時に提示してください。
            </p>
            <div className="relative aspect-square w-48">
              <Image
                src="/placeholder.svg?height=192&width=192"
                alt="QR Code"
                fill
                className="rounded-lg"
              />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                // Here you would typically trigger the QR code download
                handleClose();
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              QRコードを保存
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            ポイント利用
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full p-1 hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>
        <div className="text-sm mb-4">
          利用可能ポイント:{" "}
          <span className="font-bold">{availablePoints}pt</span>
        </div>
        <div className="flex-1 overflow-auto">
          <RadioGroup
            value={selectedReward}
            onValueChange={setSelectedReward}
            className="space-y-2"
          >
            {rewards.map((reward) => {
              const isDisabled = reward.points > availablePoints;
              return (
                <Label
                  key={reward.id}
                  className={cn(
                    "flex items-start space-x-4 rounded-lg border p-4",
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-accent",
                  )}
                >
                  <RadioGroupItem
                    value={reward.id}
                    disabled={isDisabled}
                    className="mt-1"
                  />

                  <div className="flex flex-1 gap-4">
                    <Image
                      src={reward.image}
                      alt=""
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />

                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{reward.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {reward.description}
                      </p>
                      <p className="font-medium">{reward.points}pt</p>
                    </div>
                  </div>
                </Label>
              );
            })}
          </RadioGroup>
        </div>
        <Button
          className="w-full mt-4"
          disabled={!selectedReward}
          onClick={handleExchange}
        >
          選択したアイテムと交換する
        </Button>
      </DialogContent>
    </Dialog>
  );
}
