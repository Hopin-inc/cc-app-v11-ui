import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Opportunity } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { mockProjects } from "@/lib/data";

interface EventCardProps {
  event: Opportunity;
}

export default function EventCard({ event }: EventCardProps) {
  const project = mockProjects.find((p) => p.id === event.projectId);

  return (
    <Link href={`/sessions/${event.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {event.categories.map((category) => (
              <Badge
                key={category.id}
                variant="secondary"
                className="bg-white/80 backdrop-blur-sm"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          {project && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>プロジェクト：</span>
              <span className="font-medium text-foreground">{project.title}</span>
            </div>
          )}
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {format(new Date(event.startsAt), "M月d日(E) HH:mm", {
                  locale: ja,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {format(new Date(event.startsAt), "HH:mm", { locale: ja })} -{" "}
                {format(new Date(event.endsAt), "HH:mm", { locale: ja })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>オンライン</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 bg-muted/50">
          <div className="flex items-center gap-3">
            <Image
              src={event.host.image}
              alt={event.host.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm">{event.host.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
