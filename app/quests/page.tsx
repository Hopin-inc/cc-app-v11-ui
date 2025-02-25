"use client";

import { ContentList } from "@/components/shared/ContentList";
import { Opportunity } from "@/types";
import { useEffect, useState } from "react";

export default function QuestsPage() {
  const [quests, setQuests] = useState<Opportunity[]>([]);

  useEffect(() => {
    // TODO: Fetch quests from API
    setQuests([]);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">クエスト一覧</h1>
      <ContentList type="QUEST" items={quests} />
    </div>
  );
}
