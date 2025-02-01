"use client";

import { Card } from "@/components/ui/card";

type SpeakerDeckEmbedProps = {
  title: string;
  embedUrl: string;
};

export function SpeakerDeckEmbed({ title, embedUrl }: SpeakerDeckEmbedProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] relative">
        <iframe
          src={embedUrl}
          title={title}
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
      </div>
    </Card>
  );
}
