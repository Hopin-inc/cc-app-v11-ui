import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Opportunity } from "@/types"
import { getCategoryEmoji } from "@/lib/utils/emoji-mapper"
import { Clock } from "lucide-react"

interface OpportunityCardProps {
  session: Opportunity
}

export default function OpportunityCard({ session }: OpportunityCardProps) {
  const emoji = getCategoryEmoji(session.categories)

  return (
    <Link href={`/sessions/${session.id}`}>
      <div className="bg-card rounded-lg p-4 hover:bg-accent/50 transition-colors border border-border my-3">
        <div className="flex flex-col gap-3">
          {/* Header with emoji and duration */}
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-xl">
              {emoji}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              {session.durationMinutes}分
            </div>
          </div>

          {/* Title and Categories */}
          <div className="space-y-2">
            <h3 className="text-base font-medium leading-snug">{session.title}</h3>
            <div className="flex flex-wrap gap-1.5">
              {session.categories.map((category) => (
                <Badge key={category.id} variant="secondary" className="text-xs">
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skills and Host */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {session.skills.map((skill) => (
                <span key={skill.id}>#{skill.name}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Image
                src={session.host.image || "/placeholder.svg"}
                alt={session.host.name}
                width={20}
                height={20}
                className="rounded-full bg-muted"
              />
              <span className="text-xs text-muted-foreground">{session.host.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

