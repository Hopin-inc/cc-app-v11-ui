import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Participant = {
  id: string;
  name: string;
  image?: string;
};

type ParticipantsModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  participants: Participant[];
};

export function ParticipantsModal({
  isOpen,
  onOpenChange,
  participants,
}: ParticipantsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>参加者一覧</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={participant.image || "/placeholder.svg"}
                  alt={participant.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">{participant.name}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
