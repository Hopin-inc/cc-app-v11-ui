'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Link from 'next/link'

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([
    { id: '1', content: '新しいセッションが追加されました', read: false },
    { id: '2', content: 'メッセージが届いています', read: false, messageId: '1' },
  ])

  const handleNotificationClick = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.some(n => !n.read) && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-medium">通知</h3>
          {notifications.map(notification => (
            <div key={notification.id} className="text-sm">
              {notification.messageId ? (
                <Link 
                  href={`/messages/${notification.messageId}`}
                  onClick={() => handleNotificationClick(notification.id)}
                  className="block p-2 hover:bg-accent rounded-md"
                >
                  {notification.content}
                </Link>
              ) : (
                <div className="p-2">{notification.content}</div>
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

