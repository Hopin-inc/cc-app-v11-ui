import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Project, Opportunity } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Users, MessageCircle } from "lucide-react";

interface ProjectCardProps {
  project: Project & { opportunities?: Opportunity[] };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const openSessions =
    project.opportunities?.filter((session) => session.status === "open") || [];

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="hover:bg-accent/50 transition-colors mb-2">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <Image
                src={project.icon || "/placeholder.svg?height=24&width=24"}
                alt={project.title}
                width={24}
                height={24}
                className="mr-2"
              />
              <h3 className="text-lg font-medium">{project.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="text-xs"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 py-3">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{project.opportunities?.length || 0} 人のメンバー</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{openSessions.length} 件の関わり方</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
