import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Opportunity } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, Trophy, Users, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Project } from "@/types";
import { mockProjects } from "@/lib/data";

interface QuestCardProps {
  quest: Opportunity;
}

export default function QuestCard({ quest }: QuestCardProps) {
  const project: Project | undefined = mockProjects.find((p) => p.id === quest.projectId);

  return (
    <Link href={`/sessions/${quest.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-yellow-500/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2">
              {quest.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="bg-yellow-500/10 text-yellow-700"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold mb-4">{quest.title}</h3>
          {project && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>プロジェクト：</span>
              <span className="font-medium text-foreground">{project.title}</span>
            </div>
          )}
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>所要時間: {format(new Date(quest.endsAt).getTime() - new Date(quest.startsAt).getTime(), "H時間mm分")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>募集人数: 若干名</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {format(new Date(quest.startsAt), "M月d日(E)", { locale: ja })}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 bg-yellow-500/5 border-t border-yellow-500/20">
          <div className="flex items-center gap-3">
            <Image
              src={quest.host.image}
              alt={quest.host.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm">{quest.host.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
