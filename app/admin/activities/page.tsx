"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Pencil,
  Trash2,
  ToggleLeft,
  ImagePlus,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Users,
  Camera,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";

type OpportunityType = "experience" | "event" | "quest";
type OpportunityStatus = "open" | "closed";

type RecurringSchedule = {
  dayOfWeek: number; // 0-6 (日-土)
  startTime: string;
  endTime: string;
};

type Opportunity = {
  id: string;
  title: string;
  type: OpportunityType;
  thumbnail: string;
  images: string[]; // 複数の写真を格納
  price: number;
  capacity: number;
  status: OpportunityStatus;
  // 定期開催の場合
  recurringSchedule?: RecurringSchedule;
  // 単発開催の場合
  date?: string;
  startTime?: string;
  endTime?: string;
  location: {
    name: string;
    address: string;
  };
};

const typeLabels: Record<
  OpportunityType,
  { label: string; className: string }
> = {
  experience: {
    label: "体験",
    className: "bg-blue-50 text-blue-700 text-sm font-medium",
  },
  event: {
    label: "イベント",
    className: "bg-blue-50 text-blue-700 text-sm font-medium",
  },
  quest: {
    label: "クエスト",
    className: "bg-blue-50 text-blue-700 text-sm font-medium",
  },
};

const statusLabels: Record<
  OpportunityStatus,
  { label: string; className: string }
> = {
  open: {
    label: "公開中",
    className: "text-xs text-green-600",
  },
  closed: {
    label: "非公開",
    className: "text-xs text-gray-500",
  },
};

// モックデータ（実際の実装ではAPIから取得）
const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "オリーブ収穫・テイスティング体験",
    type: "experience",
    thumbnail:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=60",
    images: [
      "https://s3-ap-northeast-1.amazonaws.com/seiryu/66b7cbe0421aa90001d53e2f/programs/66b863bb421aa90001d55278/image2s/display.jpg?1726814464",
      "https://s3-ap-northeast-1.amazonaws.com/seiryu/66b7cbe0421aa90001d53e2f/programs/66b863bb421aa90001d55278/image3s/display.jpg?1726814467",
      "https://s3-ap-northeast-1.amazonaws.com/seiryu/66b7cbe0421aa90001d53e2f/programs/66b863bb421aa90001d55278/image4s/display.jpeg?1728529519",
      "https://s3-ap-northeast-1.amazonaws.com/seiryu/66b7cbe0421aa90001d53e2f/programs/66b863bb421aa90001d55278/image2s/display.jpg?1726814464",
    ],
    price: 3000,
    capacity: 10,
    status: "open",
    recurringSchedule: {
      dayOfWeek: 4,
      startTime: "12:00",
      endTime: "14:00",
    },
    location: {
      name: "○○農園",
      address: "東京都渋谷区神南1-2-3",
    },
  },
  {
    id: "2",
    title: "小豆島オリーブ収穫祭 2025",
    type: "event",
    thumbnail:
      "https://s3-ap-northeast-1.amazonaws.com/seiryu/66b7cbe0421aa90001d53e2f/programs/66b85e4d421aa90001d551b4/image1s/display.jpg?1726553592",
    images: [
      "http://s3-ap-northeast-1.amazonaws.com/seiryu/66e91a8c421aa90001379420/upload_files/files/original.jpg?1726552716",
      "http://s3-ap-northeast-1.amazonaws.com/seiryu/66e928f8421aa900013797fe/upload_files/files/original.jpg?1726556408",
      "http://s3-ap-northeast-1.amazonaws.com/seiryu/66e91a9d421aa90001379423/upload_files/files/original.jpg?1726552733",
    ],
    price: 2000,
    capacity: 15,
    status: "closed",
    date: "2024-03-25",
    startTime: "14:00",
    endTime: "16:00",
    location: {
      name: "△△広場",
      address: "東京都渋谷区神南4-5-6",
    },
  },
  {
    id: "3",
    title: "オリーブ畑の整備活動",
    type: "quest",
    thumbnail: "/images/activities/olive.jpg",
    images: [],
    price: 5000,
    capacity: 5,
    status: "open",
    date: "2024-03-30",
    startTime: "13:00",
    endTime: "17:00",
    location: {
      name: "小豆島町内オリーブ畑",
      address: "東京都渋谷区神南7-8-9",
    },
  },
];

const dayOfWeekLabels = ["日", "月", "火", "水", "木", "金", "土"];

export default function OpportunityManagement() {
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredOpportunities = opportunities.filter(
    (opportunity) => typeFilter === "all" || opportunity.type === typeFilter
  );

  const handleStatusChange = (opportunityId: string) => {
    // TODO: API呼び出しでステータスを更新
    console.log(`Opportunity ${opportunityId} status changed`);
  };

  const handleDelete = (opportunityId: string) => {
    // TODO: API呼び出しで削除
    console.log(`Opportunity ${opportunityId} deleted`);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">機会の管理</h1>
        <Link href="/admin/opportunities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規作成
          </Button>
        </Link>
      </div>

      <div className="w-full sm:w-[200px] mb-6">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="種別" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="experience">体験</SelectItem>
            <SelectItem value="event">イベント</SelectItem>
            <SelectItem value="quest">クエスト</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredOpportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="rounded-lg border bg-card p-4 text-card-foreground hover:bg-gray-50"
          >
            <div className="flex gap-6">
              <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden rounded-lg">
                {opportunity.images.length > 1 ? (
                  <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                    {opportunity.images.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative w-full h-full">
                        <img
                          src={image}
                          alt={`${opportunity.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <img
                    src={opportunity.thumbnail}
                    alt={opportunity.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            className={typeLabels[opportunity.type].className}
                          >
                            {typeLabels[opportunity.type].label}
                          </Badge>
                          <span
                            className={
                              statusLabels[opportunity.status].className
                            }
                          >
                            {statusLabels[opportunity.status].label}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold">
                          {opportunity.title}
                        </h3>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-baseline gap-1">
                          <span>
                            {opportunity.recurringSchedule ? (
                              <>
                                毎週
                                {
                                  dayOfWeekLabels[
                                    opportunity.recurringSchedule.dayOfWeek
                                  ]
                                }
                                曜日
                              </>
                            ) : (
                              format(new Date(opportunity.date!), "M月d日(E)", {
                                locale: ja,
                              })
                            )}
                          </span>
                          <span>
                            {opportunity.recurringSchedule
                              ? `${opportunity.recurringSchedule.startTime}-${opportunity.recurringSchedule.endTime}`
                              : `${opportunity.startTime}-${opportunity.endTime}`}
                          </span>
                        </div>
                        <div>{opportunity.location.name}</div>
                        <div className="flex items-center gap-3">
                          <span>¥{opportunity.price.toLocaleString()}</span>
                          <span>定員{opportunity.capacity}名</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">メニューを開く</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin/opportunities/${opportunity.id}/edit`}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          編集
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ImagePlus className="mr-2 h-4 w-4" />
                        写真を追加
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(opportunity.id)}
                      >
                        <ToggleLeft className="mr-2 h-4 w-4" />
                        ステータス変更
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(opportunity.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
