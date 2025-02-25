"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Users, Calendar, Sparkles, Gift, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type IconName =
  | "home"
  | "users"
  | "calendar"
  | "sparkles"
  | "gift"
  | "settings";

const icons: Record<IconName, React.ComponentType<{ className?: string }>> = {
  home: Home,
  users: Users,
  calendar: Calendar,
  sparkles: Sparkles,
  gift: Gift,
  settings: Settings,
};

export type BottomNavigationItem = {
  label: string;
  href: string;
  icon: IconName;
  badge?: number;
};

type BottomNavigationProps = {
  items: BottomNavigationItem[];
};

export default function BottomNavigation({ items }: BottomNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-white">
      <div className="container mx-auto max-w-lg">
        <div className="grid h-16 grid-cols-4">
          {items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-sm relative",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge ? (
                    <Badge
                      className="absolute -right-3 -top-2 h-4 min-w-4 px-1 flex items-center justify-center bg-red-500 text-white"
                      variant="secondary"
                    >
                      {item.badge}
                    </Badge>
                  ) : null}
                </div>
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
