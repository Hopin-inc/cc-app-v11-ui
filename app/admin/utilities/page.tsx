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
  Plus,
  Users as UsersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Utility = {
  id: string;
  name: string;
  description: string;
  image: string;
  pointsRequired: number;
  stock: number;
  purchasers: {
    id: string;
    name: string;
    image: string;
    purchaseDate: string;
  }[];
};

// モックデータ
const utilities: Utility[] = [
  {
    id: "1",
    name: "古民家宿泊券",
    description: "小豆島の伝統的な古民家で1泊できる宿泊券です。",
    image:
      "https://images.unsplash.com/photo-1565618754154-c8011e5df2a6?w=800&auto=format&fit=crop&q=60",
    pointsRequired: 5000,
    stock: 3,
    purchasers: [
      {
        id: "u1",
        name: "山田太郎",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        purchaseDate: "2024-03-15",
      },
    ],
  },
  {
    id: "2",
    name: "小豆島おもてなしBBQ参加券",
    description: "地元の食材を使った特別なBBQイベントに参加できます。",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60",
    pointsRequired: 3000,
    stock: 10,
    purchasers: [],
  },
  {
    id: "3",
    name: "オリーブ収穫/テイスティング体験参加券",
    description: "オリーブの収穫から試食までを体験できます。",
    image: "/images/activities/olive.jpg",
    pointsRequired: 2000,
    stock: 5,
    purchasers: [],
  },
];

export default function UtilityManagement() {
  const handleDelete = (utilityId: string) => {
    // TODO: API呼び出しで削除
    console.log(`Utility ${utilityId} deleted`);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">ユーティリティ管理</h1>
        <Link href="/admin/utilities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規作成
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {utilities.map((utility) => (
          <div
            key={utility.id}
            className="rounded-lg border bg-card p-4 text-card-foreground hover:bg-gray-50"
          >
            <div className="flex gap-6">
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={utility.image}
                  alt={utility.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold">{utility.name}</h3>
                      <p className="text-sm text-gray-600">
                        {utility.description}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="secondary" className="font-medium">
                          {utility.pointsRequired.toLocaleString()}ポイント
                        </Badge>
                        <span className="text-gray-600">
                          残り{utility.stock}個
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {utility.purchasers.length}名が購入
                        </span>
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
                    <DropdownMenuContent
                      align="end"
                      className="w-[200px] p-0 overflow-hidden"
                    >
                      <div className="p-1">
                        <DropdownMenuItem asChild className="text-gray-600">
                          <Link
                            href={`/admin/utilities/${utility.id}/edit`}
                            className="w-full flex items-center"
                          >
                            <Pencil className="mr-2 h-4 w-4 text-gray-500" />
                            編集
                          </Link>
                        </DropdownMenuItem>
                      </div>
                      <div className="border-t border-gray-100">
                        <DropdownMenuItem
                          className="text-red-600 relative p-2"
                          onClick={() => handleDelete(utility.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                          削除
                        </DropdownMenuItem>
                      </div>
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
