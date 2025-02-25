"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type Reservation = {
  id: string;
  activityTitle: string;
  activityType: "experience" | "quest" | "event";
  userName: string;
  userImage: string;
  date: string;
  startTime: string;
  endTime: string;
  numberOfGuests: number;
  totalPrice: number;
  status: "pending" | "approved" | "cancelled";
};

const activityTypeLabels = {
  experience: { label: "体験", className: "bg-gray-100 text-gray-800" },
  quest: { label: "クエスト", className: "bg-gray-100 text-gray-800" },
  event: { label: "イベント", className: "bg-gray-100 text-gray-800" },
};

const statusLabels = {
  pending: { label: "未承認", className: "bg-yellow-100 text-yellow-800" },
  approved: { label: "承認済み", className: "bg-green-100 text-green-800" },
  cancelled: { label: "キャンセル", className: "bg-gray-100 text-gray-800" },
};

// モックデータ（実際の実装ではAPIから取得）
const mockReservations: Reservation[] = [
  {
    id: "1",
    activityTitle: "オリーブ収穫・テイスティング体験",
    activityType: "experience",
    userName: "山田太郎",
    userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    date: "2024-03-15",
    startTime: "10:00",
    endTime: "12:00",
    numberOfGuests: 2,
    totalPrice: 6000,
    status: "pending",
  },
  {
    id: "2",
    activityTitle: "小豆島オリーブ収穫祭 2025",
    activityType: "event",
    userName: "佐藤花子",
    userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    date: "2024-03-16",
    startTime: "14:00",
    endTime: "16:00",
    numberOfGuests: 1,
    totalPrice: 3000,
    status: "approved",
  },
];

export default function ReservationManagement() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredReservations = mockReservations.filter(
    (reservation) =>
      statusFilter === "all" || reservation.status === statusFilter
  );

  const handleStatusChange = (
    reservationId: string,
    newStatus: "approved" | "cancelled"
  ) => {
    // TODO: API呼び出しで予約のステータスを更新
    console.log(`Reservation ${reservationId} status changed to ${newStatus}`);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">予約の管理</h1>
        <div className="w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="ステータス" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="pending">未承認</SelectItem>
              <SelectItem value="approved">承認済み</SelectItem>
              <SelectItem value="cancelled">キャンセル</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="rounded-lg border bg-card p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={reservation.userImage}
                  alt={reservation.userName}
                  className="h-10 w-10 rounded-full"
                />
                <span className="font-medium">{reservation.userName}</span>
              </div>
              <Badge className={statusLabels[reservation.status].className}>
                {statusLabels[reservation.status].label}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    activityTypeLabels[reservation.activityType].className
                  }
                >
                  {activityTypeLabels[reservation.activityType].label}
                </Badge>
                <span className="font-medium">{reservation.activityTitle}</span>
              </div>

              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">日時：</span>
                  <span>
                    {format(new Date(reservation.date), "M月d日(E)", {
                      locale: ja,
                    })}{" "}
                    {reservation.startTime} - {reservation.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">人数：</span>
                  <span>{reservation.numberOfGuests}名</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">料金：</span>
                  <span>¥{reservation.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {reservation.status === "pending" && (
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleStatusChange(reservation.id, "approved")}
                >
                  承認
                </Button>
                <Button
                  className="flex-1"
                  variant="destructive"
                  onClick={() =>
                    handleStatusChange(reservation.id, "cancelled")
                  }
                >
                  キャンセル
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
