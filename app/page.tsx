"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import OpportunityCard from "@/components/OpportunityCard"
import { FilterSheet } from "@/components/filter-sheet"
import { mockOpportunities, categories, skills } from "@/lib/data"
import { Opportunity, Category, Skill } from "@/types"

export default function Home() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOpportunities = useMemo(() => {
    if (!Array.isArray(mockOpportunities)) {
      console.error("mockOpportunities is not an array:", mockOpportunities)
      return []
    }

    return mockOpportunities.filter((opportunity) => {
      const searchMatch =
        !searchQuery ||
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.categories.some((c) => c?.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        opportunity.skills.some((s) => s?.name.toLowerCase().includes(searchQuery.toLowerCase()))

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((categoryId) => opportunity.categories.some((c) => c?.id === categoryId))
      const skillMatch =
        selectedSkills.length === 0 ||
        selectedSkills.some((skillId) => opportunity.skills.some((s) => s?.id === skillId))
      return searchMatch && categoryMatch && skillMatch
    })
  }, [selectedCategories, selectedSkills, searchQuery])

  const removeCategory = (categoryId: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== categoryId))
  }

  const removeSkill = (skillId: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skillId))
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedSkills([])
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="壁打ちを検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setFilterOpen(true)}>
            <SlidersHorizontal className="h-4 w-4" />
            フィルター
            {(selectedCategories.length > 0 || selectedSkills.length > 0) && (
              <Badge variant="secondary" className="ml-2">
                {selectedCategories.length + selectedSkills.length}
              </Badge>
            )}
          </Button>
        </div>

        {(selectedCategories.length > 0 || selectedSkills.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId)
              return (
                <Badge
                  key={categoryId}
                  variant="secondary"
                  className="gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={() => removeCategory(categoryId)}
                >
                  {category?.name}
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {category?.name}</span>
                </Badge>
              )
            })}
            {selectedSkills.map((skillId) => {
              const skill = skills.find((s) => s.id === skillId)
              return (
                <Badge
                  key={skillId}
                  variant="secondary"
                  className="gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={() => removeSkill(skillId)}
                >
                  {skill?.name}
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {skill?.name}</span>
                </Badge>
              )
            })}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {filteredOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} session={opportunity} />
        ))}
      </div>
      {filteredOpportunities.length === 0 && (
        <div className="text-center text-muted-foreground py-8">条件に一致する壁打ちがありません</div>
      )}

      <FilterSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        selectedCategories={selectedCategories}
        selectedSkills={selectedSkills}
        searchQuery={searchQuery}
        onCategoriesChange={setSelectedCategories}
        onSkillsChange={setSelectedSkills}
        onSearchChange={setSearchQuery}
      />
    </div>
  )
}

