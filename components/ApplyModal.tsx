import { Dispatch, SetStateAction, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Opportunity } from "@/types";

export interface ApplyModalProps {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  opportunity: Opportunity;
}

export function ApplyModal({
  isOpen,
  onOpenChange,
  opportunity,
}: ApplyModalProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    // Here you would typically send the application to your backend
    console.log(`Applying for opportunity with comment: ${comment}`);
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] max-w-lg mx-auto">
        <SheetHeader>
          <SheetTitle>関わり方申請</SheetTitle>
          <SheetDescription>{opportunity.title}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-6">
          <Textarea
            placeholder="例：関わり方の機会をいただき、ありがとうございます。スケジュールの調整をさせていただきたいです。関わり方後の懇親会も楽しみにしています。"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[200px]"
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit}>申請する</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
