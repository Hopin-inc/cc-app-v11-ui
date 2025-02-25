"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { CURRENT_USER, CURRENT_COMMUNITY } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();

  if (pathname.includes("/admin")) {
    return (
      <header className="border-b border-border bg-background fixed w-full z-50">
        <div className="max-w-lg mx-auto px-4 h-16 flex justify-between items-center">
          <Link href="/admin" className="flex items-center space-x-2">
            <span className="text-lg font-bold">管理画面</span>
          </Link>

          <Link
            href={`/communities/${CURRENT_COMMUNITY.id}`}
            className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
          >
            <Image
              src={CURRENT_COMMUNITY.image}
              alt={CURRENT_COMMUNITY.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-border bg-background fixed w-full z-50">
      <div className="max-w-lg mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/neo88-logo.jpg" alt="NEO88" width={88} height={80} />
        </Link>

        <Link
          href={`/users/${CURRENT_USER.id}`}
          className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
        >
          <Image
            src={CURRENT_USER.image}
            alt={CURRENT_USER.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
