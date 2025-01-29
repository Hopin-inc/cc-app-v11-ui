"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

export default function ClientBottomNav() {
  const pathname = usePathname();

  // Hide BottomNav on session detail pages
  if (pathname?.startsWith("/sessions/")) {
    return null;
  }

  return <BottomNav />;
}
