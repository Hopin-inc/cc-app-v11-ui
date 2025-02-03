"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, User } from "lucide-react";
import { CURRENT_USER } from "@/lib/data";

const NAVIGATION_ITEMS = [
  {
    href: "/",
    label: "ホーム",
    icon: Home,
  },
  // {
  //   href: "/communities",
  //   label: "コミュニティ",
  //   icon: Hammer,
  // },
  {
    href: `/users/${CURRENT_USER.id}`,
    label: "マイページ",
    icon: User,
  },
] as const;

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <nav className="container mx-auto max-w-xl">
        <ul className="flex items-center justify-around py-2">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
