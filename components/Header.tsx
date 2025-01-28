import Link from 'next/link'
import Image from 'next/image'
import { Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NotificationBell from '@/components/NotificationBell'
import { dummyUser } from '@/lib/dummyUser'

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="max-w-lg mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
            共
          </div>
          <p className="font-bold">APP_NAME</p>
        </Link>
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <Link href="/mypage">
            <Image
              src={dummyUser.image}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

