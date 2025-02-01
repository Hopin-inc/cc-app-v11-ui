"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Hammer, User } from "lucide-react";

const NAVIGATION_ITEMS = [
  {
    href: "/",
    label: "ホーム",
    icon: Home,
  },
  {
    href: "/communities",
    label: "コミュニティ",
    icon: Hammer,
  },
  {
    href: "/mypage",
    label: "マイページ",
    icon: User,
  },
] as const;

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="container mx-auto py-2 px-2 space-y-8 max-w-2xl">
        <nav className="flex items-center justify-around">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
