"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockActivities } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ActivityCard } from "@/components/features/activity/ActivityCard";
import { formatDuration } from "@/lib/utils/activity";

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivities = mockActivities.filter(
    (activity) =>
      !searchQuery ||
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.prefecture
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      activity.location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container mx-auto py-6 space-y-8 max-w-3xl pb-24">
      <div className="px-4">
        <h1 className="text-2xl font-bold mb-2">NEO四国88祭</h1>
        <p className="text-muted-foreground mb-3">
          「わたしふるえる体験」を巡ることで自分の中の心に気づき、新たな自分を始めていく旅
        </p>
        <img src="http://s3-ap-northeast-1.amazonaws.com/seiryu/6718f7bb421aa900012fcffd/upload_files/files/original.jpg?1729689531" />
      </div>

      {/* Search */}
      <div className="px-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="キーワード・エリアから探す"
            className="w-full pl-10 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Activities Grid */}
      <div className="px-4 grid gap-6 sm:grid-cols-2">
        {filteredActivities.map((activity) => (
          <Link key={activity.id} href={`/activities/${activity.id}`}>
            <ActivityCard activity={activity} />
          </Link>
        ))}
      </div>
    </main>
  );
}
