import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSearchCombobox } from "@/components/features/user/UserSearchCombobox";
import { useState } from "react";
import type { Community } from "@/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  community: Community;
  availablePoints: number;
};

export const TransferPointModal = ({
  isOpen,
  onClose,
  community,
  availablePoints,
}: Props) => {
  const [amount, setAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleTransfer = () => {
    // TODO: 送金処理の実装
    console.log("Transfer", { amount, selectedUser });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ポイントを送金</DialogTitle>
          <DialogDescription>
            {community.title}のポイントを他のユーザーに送金します
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>送金先</Label>
            <UserSearchCombobox
              onSelect={(userId) => setSelectedUser(userId)}
            />
          </div>
          <div className="space-y-2">
            <Label>送金額</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min={0}
                max={availablePoints}
              />
              <span className="text-sm text-muted-foreground">pt</span>
            </div>
            <p className="text-xs text-muted-foreground">
              利用可能ポイント: {availablePoints.toLocaleString()} pt
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            onClick={handleTransfer}
            disabled={
              !selectedUser ||
              !amount ||
              Number(amount) <= 0 ||
              Number(amount) > availablePoints
            }
          >
            送金する
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
