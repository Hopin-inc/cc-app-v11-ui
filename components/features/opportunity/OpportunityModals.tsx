import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar, Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import OpportunityCard from "@/components/OpportunityCard";
import { type Opportunity } from "@/types";

type OpportunityModalsProps = {
  opportunity: Opportunity;
  isEvent: boolean;
  isJoined: boolean;
  isConfirmSheetOpen: boolean;
  isCompletedSheetOpen: boolean;
  onConfirmSheetOpenChange: (open: boolean) => void;
  onCompletedSheetOpenChange: (open: boolean) => void;
  onConfirmJoin: () => void;
  onShare: () => void;
  onAddToCalendar: () => void;
};

export function OpportunityModals({
  opportunity,
  isEvent,
  isJoined,
  isConfirmSheetOpen,
  isCompletedSheetOpen,
  onConfirmSheetOpenChange,
  onCompletedSheetOpenChange,
  onConfirmJoin,
  onShare,
  onAddToCalendar,
}: OpportunityModalsProps) {
  return (
    <>
      {/* Quest Apply Confirmation */}
      {!isEvent && (
        <Sheet open={isConfirmSheetOpen} onOpenChange={onConfirmSheetOpenChange}>
          <SheetContent side="bottom" className="max-w-lg mx-auto rounded-t-lg">
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
                <Button size="lg" className="w-full" onClick={onConfirmJoin}>
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
          onOpenChange={onCompletedSheetOpenChange}
        >
          <SheetContent side="bottom" className="max-w-lg mx-auto rounded-t-lg">
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
                    window.open("https://line.me/R/ti/p/@your-line-id", "_blank")
                  }
                >
                  <Phone className="mr-2 h-4 w-4" />
                  <span>LINE友達に追加</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={onShare}
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
        <Sheet open={isConfirmSheetOpen} onOpenChange={onConfirmSheetOpenChange}>
          <SheetContent side="bottom" className="max-w-lg mx-auto rounded-t-lg">
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
                <Button size="lg" className="w-full" onClick={onConfirmJoin}>
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
          onOpenChange={onCompletedSheetOpenChange}
        >
          <SheetContent side="bottom" className="max-w-lg mx-auto rounded-t-lg">
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
                <Button size="lg" className="w-full" onClick={onAddToCalendar}>
                  <Calendar className="mr-2 h-4 w-4" />
                  カレンダーに追加
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={onShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  共有する
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
