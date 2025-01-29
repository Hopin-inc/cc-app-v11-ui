"use client";

import * as React from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { categories, skills } from "@/lib/data";
import { usePathname } from "next/navigation";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  selectedSkills: string[];
  searchQuery: string;
  onCategoriesChange: (value: string[]) => void;
  onSkillsChange: (value: string[]) => void;
  onSearchChange: (value: string) => void;
}

export function FilterSheet({
  open,
  onOpenChange,
  selectedCategories,
  selectedSkills,
  searchQuery,
  onCategoriesChange,
  onSkillsChange,
  onSearchChange,
}: FilterSheetProps) {
  const pathname = usePathname();
  const [localCategories, setLocalCategories] =
    React.useState<string[]>(selectedCategories);
  const [localSkills, setLocalSkills] =
    React.useState<string[]>(selectedSkills);
  const [localSearch, setLocalSearch] = React.useState<string>(searchQuery);

  React.useEffect(() => {
    setLocalCategories(selectedCategories);
    setLocalSkills(selectedSkills);
    setLocalSearch(searchQuery);
  }, [selectedCategories, selectedSkills, searchQuery]);

  const handleApply = () => {
    onCategoriesChange(localCategories);
    onSkillsChange(localSkills);
    onSearchChange(localSearch);
    onOpenChange(false);
  };

  const handleClear = () => {
    setLocalCategories([]);
    setLocalSkills([]);
    setLocalSearch("");
  };

  const handleCategoryChange = (value: string) => {
    setLocalCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleSkillChange = (value: string) => {
    setLocalSkills((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle>フィルター</SheetTitle>
            <SheetClose className="rounded-full opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder={`${
                pathname === "/explore" ? "プロジェクト" : "関わり方"
              }を検索`}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </SheetHeader>
        <div className="py-6 space-y-6 flex-1 overflow-y-auto">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">カテゴリー</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    localCategories.includes(category.id)
                      ? "default"
                      : "outline"
                  }
                  onClick={() => handleCategoryChange(category.id)}
                  className="justify-start"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">スキル</h3>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <Button
                  key={skill.id}
                  variant={
                    localSkills.includes(skill.id) ? "default" : "outline"
                  }
                  onClick={() => handleSkillChange(skill.id)}
                  className="justify-start"
                >
                  {skill.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <SheetFooter className="border-t">
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={handleClear} className="flex-1">
              クリア
              {(localCategories.length > 0 ||
                localSkills.length > 0 ||
                localSearch) &&
                ` (${
                  localCategories.length +
                  localSkills.length +
                  (localSearch ? 1 : 0)
                })`}
            </Button>
            <Button onClick={handleApply} className="flex-1">
              絞り込み
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
