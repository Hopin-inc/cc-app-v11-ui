"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, MapPin, X } from "lucide-react";
import { FilterParams } from "./FilterDialog";
import { Label } from "@/components/ui/label";

type Props = {
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
};

const prefectures = ["香川県", "愛媛県", "徳島県", "高知県"];

export function FilterBar({ filters, onFilterChange }: Props) {
  const hasActiveFilters =
    filters.location ||
    filters.startDate ||
    filters.endDate ||
    (filters.type && filters.type !== "all");

  const handleClearFilter = (key: keyof FilterParams) => {
    onFilterChange({
      ...filters,
      [key]: key === "type" ? "all" : "",
    });
  };

  const handleClearAll = () => {
    onFilterChange({
      location: "",
      startDate: "",
      endDate: "",
      type: "all",
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Location Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={filters.location ? "default" : "outline"}
            className="h-10 gap-2"
          >
            <MapPin className="h-4 w-4" />
            {filters.location || "場所を選択"}
            {filters.location && (
              <X
                className="h-3 w-3 text-muted"
                onClick={(e) => {

                  handleClearFilter("location");
                                    e.stopPropagation();
                }}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4" align="start">
          <div className="space-y-4">
            <Label className="font-medium">エリアを選択</Label>
            <div className="grid grid-cols-2 gap-2">
              {prefectures.map((pref) => (
                <Button
                  key={pref}
                  variant={filters.location === pref ? "default" : "outline"}
                  className="h-9 text-sm justify-start"
                  onClick={() => onFilterChange({ ...filters, location: pref })}
                >
                  {pref}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Date Range Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={
              filters.startDate || filters.endDate ? "default" : "outline"
            }
            className="h-10 gap-2"
          >
            <CalendarIcon className="h-4 w-4" />
            {filters.startDate && filters.endDate
              ? `${format(new Date(filters.startDate), "M/d")} - ${format(
                  new Date(filters.endDate),
                  "M/d"
                )}`
              : filters.startDate
              ? `${format(new Date(filters.startDate), "M/d")}から`
              : filters.endDate
              ? `${format(new Date(filters.endDate), "M/d")}まで`
              : "日付を選択"}
            {(filters.startDate || filters.endDate) && (
              <X
                className="h-3 w-3 text-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  onFilterChange({
                    ...filters,
                    startDate: "",
                    endDate: "",
                  });
                }}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b">
            <h3 className="font-medium">日付を選択</h3>
          </div>
          <Calendar
            mode="range"
            locale={ja}
            selected={{
              from: filters.startDate ? new Date(filters.startDate) : undefined,
              to: filters.endDate ? new Date(filters.endDate) : undefined,
            }}
            onSelect={(range) => {
              onFilterChange({
                ...filters,
                startDate: range?.from
                  ? format(range.from, "yyyy-MM-dd'T'HH:mm:ss")
                  : "",
                endDate: range?.to
                  ? format(range.to, "yyyy-MM-dd'T'23:59:59")
                  : "",
              });
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Clear All Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          className="h-10 px-3 text-muted-foreground"
          onClick={handleClearAll}
        >
          絞り込みをクリア
        </Button>
      )}
    </div>
  );
}
