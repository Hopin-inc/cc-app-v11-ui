import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { Opportunity } from "@/types";

export const groupOpportunitiesByDate = (
  opportunities: Opportunity[],
  formatStr: string = "yyyy-MM-dd"
) => {
  return opportunities.reduce((acc, opportunity) => {
    const date = format(new Date(opportunity.startsAt), formatStr);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(opportunity);
    return acc;
  }, {} as Record<string, Opportunity[]>);
};

export const groupOpportunitiesByYear = (opportunities: Opportunity[]) => {
  return opportunities.reduce((acc, opportunity) => {
    const year = new Date(opportunity.startsAt).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(opportunity);
    return acc;
  }, {} as Record<string, Opportunity[]>);
};

export const formatDateWithWeekday = (dateStr: string) => {
  const date = new Date(dateStr);
  return format(date, "M月d日(E)", { locale: ja });
};

export const sortOpportunitiesByDate = (
  opportunities: Opportunity[],
  direction: "asc" | "desc" = "asc"
) => {
  return [...opportunities].sort((a, b) => {
    const timeA = new Date(a.startsAt).getTime();
    const timeB = new Date(b.startsAt).getTime();
    return direction === "asc" ? timeA - timeB : timeB - timeA;
  });
};
