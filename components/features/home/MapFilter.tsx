"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  X,
  Sparkles,
  Flag,
  PartyPopper,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentType, DateFilter } from "@/types";
import { DateRange } from "react-day-picker";

type MapFilterProps = {
  selectedType: ContentType;
  onTypeChange: (type: ContentType) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  contentCounts: Record<ContentType, number>;
  filteredCounts: Record<ContentType, number>;
  isSheetExpanded?: boolean;
};

export function MapFilter({
  selectedType,
  onTypeChange,
  dateFilter,
  onDateFilterChange,
  contentCounts,
  filteredCounts,
  isSheetExpanded = false,
}: MapFilterProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const contentTypes: {
    type: ContentType;
    label: string;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      type: "EXPERIENCE",
      label: "体験",
      icon: <Sparkles className="h-4 w-4" />,
      description: "地域の魅力を体験",
    },
    {
      type: "QUEST",
      label: "クエスト",
      icon: <Flag className="h-4 w-4" />,
      description: "地域課題を解決",
    },
    {
      type: "EVENT",
      label: "イベント",
      icon: <PartyPopper className="h-4 w-4" />,
      description: "みんなで参加",
    },
    {
      type: "ARTICLE",
      label: "記事",
      icon: <BookOpen className="h-4 w-4" />,
      description: "地域の情報",
    },
  ];

  const dateRange: DateRange = {
    from: dateFilter.startDate ?? undefined,
    to: dateFilter.endDate ?? undefined,
  };

  const formatDateRange = (from: Date | null, to: Date | null) => {
    if (!from) return "";
    if (!to) return format(from, "M/d");
    return `${format(from, "M/d")} - ${format(to, "M/d")}`;
  };

  return (
    <div
      className={cn(
        "absolute left-4 right-4 z-10 bg-white rounded-lg shadow-lg top-6 p-2"
      )}
    >
      <div className="flex flex-col gap-2">
        {/* Content Type Filter */}
        <div
          className={cn(
            "grid gap-1.5",
            isSheetExpanded ? "grid-cols-4" : "grid-cols-4"
          )}
        >
          {contentTypes.map(({ type, label, icon, description }) => {
            const count =
              dateFilter.startDate || dateFilter.endDate
                ? filteredCounts[type]
                : contentCounts[type];
            const isSelected = selectedType === type;

            return (
              <Button
                key={type}
                variant={isSelected ? "default" : "outline"}
                onClick={() => onTypeChange(type)}
                className={cn(
                  "h-auto transition-all duration-200",
                  isSheetExpanded
                    ? "py-1.5 px-2 flex flex-row items-center gap-1.5 justify-start"
                    : "py-2 px-2 flex flex-col items-center gap-1",
                  isSelected && "scale-[1.02] shadow-md",
                  !isSelected && "hover:bg-gray-50"
                )}
              >
                <div
                  className={cn(
                    "rounded-full p-1.5 transition-colors",
                    isSelected ? "bg-white/20" : "bg-primary/10"
                  )}
                >
                  {icon}
                </div>
                <div
                  className={cn(
                    isSheetExpanded
                      ? "flex flex-row items-center gap-1.5"
                      : "flex flex-col items-center"
                  )}
                >
                  <span className="text-sm font-bold">{label}</span>
                  {!isSheetExpanded && (
                    <span
                      className={cn(
                        "text-[10px] leading-tight text-center",
                        isSelected ? "text-white/80" : "text-gray-500"
                      )}
                    >
                      {description}
                    </span>
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isSheetExpanded ? "ml-auto" : "mt-0.5",
                      isSelected ? "text-white" : "text-primary"
                    )}
                  >
                    {count}件
                  </span>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Date Range Filter - Only show when not expanded */}
        {!isSheetExpanded && (
          <div className="flex gap-1.5 items-center">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-[160px] justify-start text-left font-normal h-8 text-sm",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    {dateRange.from
                      ? formatDateRange(
                          dateFilter.startDate,
                          dateFilter.endDate
                        )
                      : "日程で絞り込む"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={(range) => {
                    onDateFilterChange({
                      startDate: range?.from || null,
                      endDate: range?.to || null,
                    });
                    setCalendarOpen(false);
                  }}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>

            {(dateFilter.startDate || dateFilter.endDate) && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  onDateFilterChange({ startDate: null, endDate: null })
                }
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
