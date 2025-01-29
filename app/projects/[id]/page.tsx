"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OpportunityCard from "@/components/OpportunityCard";
import { mockProjects, mockOpportunities } from "@/lib/data";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        プロジェクトが見つかりません
      </div>
    );
  }

  const projectOpportunities = mockOpportunities.filter(
    (w) => w.projectId === project.id,
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Project Info */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
            <Image
              src={project.icon || "/placeholder.svg?height=64&width=64"}
              alt=""
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>

        {/* Categories and Skills */}
        <div>
          <div className="flex flex-wrap gap-2">
            {project.categories.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Members */}
        <div>
          <h2 className="text-xl font-semibold mb-4">メンバー</h2>
          <div className="flex -space-x-2 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="/placeholder.svg?height=40&width=40"
                alt={`Member ${i + 1}`}
                width={40}
                height={40}
              />
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div>
          <h2 className="text-xl font-semibold mb-4">機会一覧</h2>
          <div className="space-y-4">
            {projectOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} session={opportunity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
