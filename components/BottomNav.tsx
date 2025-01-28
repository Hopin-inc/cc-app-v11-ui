"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", icon: Home, label: "ホーム" },
    { href: "/explore", icon: Search, label: "探す" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full relative",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
