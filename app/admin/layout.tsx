"use client";

import BottomNavigation from "@/components/shared/BottomNavigation";
import type { BottomNavigationItem } from "@/components/shared/BottomNavigation";

type Props = {
  children: React.ReactNode;
};

// モックデータ（実際の実装ではAPIから取得）
const pendingReservationsCount = 1;

const adminNavItems: BottomNavigationItem[] = [
  {
    label: "予約の管理",
    href: "/admin/reservations",
    icon: "calendar",
    badge: pendingReservationsCount,
  },
  {
    label: "機会の管理",
    href: "/admin/activities",
    icon: "sparkles",
  },
  {
    label: "メンバー管理",
    href: "/admin/members",
    icon: "users",
  },
  {
    label: "設定",
    href: "/admin/settings",
    icon: "settings",
  },
];

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-1 container mx-auto max-w-[1400px] px-6 py-6">
        <div className="rounded-lg bg-white shadow-sm">{children}</div>
      </main>
      <BottomNavigation items={adminNavItems} />
    </div>
  );
}
