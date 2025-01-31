import Image from "next/image";
import { type Participant } from "@/types";

type ParticipantsListProps = {
  participants: Participant[];
  capacity: number;
  onOpenModal: () => void;
};

export function ParticipantsList({
  participants,
  capacity,
  onOpenModal,
}: ParticipantsListProps) {
  const isFull = participants.length >= capacity;

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-6">参加者一覧</h2>
      <div className="bg-muted/20 rounded-2xl p-6 space-y-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{participants.length}</span>
            <span className="text-muted-foreground">/ {capacity} 名</span>
          </div>
          {isFull && (
            <span className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-full">
              満員
            </span>
          )}
        </div>

        {participants.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center">
              <button
                onClick={onOpenModal}
                className="flex items-center gap-4 hover:opacity-80"
              >
                <div className="flex">
                  {participants.slice(0, 2).map((participant, index) => (
                    <div
                      key={participant.id}
                      className="relative w-8 h-8 rounded-full border-2 border-background overflow-hidden hover:scale-110 transition-transform"
                      style={{
                        marginLeft: index === 0 ? 0 : "-8px",
                        zIndex: index,
                      }}
                    >
                      <Image
                        src={participant.image || "/placeholder.svg"}
                        alt={participant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {participants.length > 2 && (
                    <div
                      className="relative w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium hover:scale-110 transition-transform"
                      style={{ marginLeft: "-8px", zIndex: 2 }}
                    >
                      +{participants.length - 2}
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {participants.slice(0, 2).map((p, i) => (
                    <span key={p.id}>
                      {p.name}
                      {i < Math.min(1, participants.length - 1) ? "、" : ""}
                    </span>
                  ))}
                  {participants.length > 2 && <span>ほか</span>}
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
