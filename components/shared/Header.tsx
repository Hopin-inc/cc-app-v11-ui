import Link from "next/link";
import Image from "next/image";
import { dummyUser } from "@/lib/dummyUser";

export default function Header() {
  return (
    <header className="border-b border-border bg-background fixed w-full z-50">
      <div className="max-w-lg mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/neo88-logo.jpg" alt="NEO88" width={88} height={80} />
        </Link>
      </div>
    </header>
  );
}
