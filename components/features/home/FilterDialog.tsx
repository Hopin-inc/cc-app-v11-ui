"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export type FilterParams = {
  location?: string;
  startDate?: string;
  endDate?: string;
  type?: "all" | "activity" | "event" | "quest";
};

type Props = {
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
};

export function FilterDialog({ filters, onFilterChange }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>絞り込み条件</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="location">場所</Label>
            <Input
              id="location"
              placeholder="地域を入力"
              value={filters.location}
              onChange={(e) =>
                onFilterChange({ ...filters, location: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="startDate">開始日時</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={filters.startDate || ""}
              onChange={(e) =>
                onFilterChange({ ...filters, startDate: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endDate">終了日時</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={filters.endDate || ""}
              onChange={(e) =>
                onFilterChange({ ...filters, endDate: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">種別</Label>
            <Select
              value={filters.type || "all"}
              onValueChange={(value) =>
                onFilterChange({
                  ...filters,
                  type: value as "all" | "activity" | "event" | "quest",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="種別を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="activity">体験</SelectItem>
                <SelectItem value="event">イベント</SelectItem>
                <SelectItem value="quest">クエスト</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() =>
              onFilterChange({
                location: "",
                startDate: "",
                endDate: "",
                type: "all",
              })
            }
          >
            条件をクリア
          </Button>
          <DialogTrigger asChild>
            <Button type="submit">この条件で絞り込む</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
