"use client";

import MapView from "@/components/features/home/MapView";

export default function MapPage() {
  return (
    <main className="h-[calc(100vh-88px)]">
      <MapView defaultSelectedType="EXPERIENCE" />
    </main>
  );
}
