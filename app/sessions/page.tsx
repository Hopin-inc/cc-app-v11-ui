import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

// This would typically come from an API or database
const sessions = [
  {
    id: '1',
    title: '親子で楽しめる木工体験、ちょっと話しませんか？',
    duration: 60,
    skills: ['木工', 'イベント企画'],
    category: '観光・文化振興',
    project: '歴史的木造建築観光プラン',
    host: '山田太郎',
  },
  {
    id: '2',
    title: '木材を活用した健康体験イベント、アイデアください！',
    duration: 30,
    skills: ['健康', 'イベント企画'],
    category: '福祉・健康',
    project: '地域資源活用プロジェクト',
    host: '鈴木花子',
  },
]

export default function SessionsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">壁打ちセッションを探す</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <CardTitle>{session.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>所要時間: {session.duration}分</p>
              <p>必要なスキル: {session.skills.join(', ')}</p>
              <p>カテゴリー: {session.category}</p>
              <p>関連プロジェクト: {session.project}</p>
              <p>ホスト: {session.host}</p>
              <div className="mt-4">
                <Link href={`/sessions/${session.id}`}>
                  <Badge>詳細を見る</Badge>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

