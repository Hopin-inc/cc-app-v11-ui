import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'

interface ApplyModalProps {
  isOpen: boolean
  onClose: () => void
  sessionId: string
  sessionTitle: string
}

export function ApplyModal({ isOpen, onClose, sessionId, sessionTitle }: ApplyModalProps) {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    // Here you would typically send the application to your backend
    console.log(`Applying for session ${sessionId} with comment: ${comment}`)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] max-w-lg mx-auto">
        <SheetHeader>
          <SheetTitle>壁打ち申請</SheetTitle>
          <SheetDescription>
            {sessionTitle}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-6">
          <Textarea
            placeholder="例：壁打ちの機会をいただき、ありがとうございます。スケジュールの調整をさせていただきたいです。壁打ち後の懇親会も楽しみにしています。"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
        <SheetFooter>
          <Button className="w-full" onClick={handleSubmit}>
            申し込む
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

