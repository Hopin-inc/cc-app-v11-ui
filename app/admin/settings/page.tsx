"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Plus,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
  Users as UsersIcon,
  MoreVertical,
  Camera,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PointHistory = {
  id: string;
  type: "reward" | "purchase";
  amount: number;
  description: string;
  date: string;
};

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
const communityData = {
  name: "小豆島オリーブプロジェクト",
  description:
    "小豆島の伝統的なオリーブ栽培を次世代に継承しながら、新しい特産品の開発や観光プログラムの企画を行っています。",
  logo: "https://api.dicebear.com/7.x/shapes/svg?seed=shodoshima",
  socialLinks: {
    facebook: "https://facebook.com/shodoshima",
    instagram: "https://instagram.com/shodoshima",
    twitter: "https://twitter.com/shodoshima",
  },
  points: 50000,
  pointHistory: [
    {
      id: "1",
      type: "reward",
      amount: -1000,
      description: "クエスト参加報酬：地域清掃活動",
      date: "2024-03-15",
    },
    {
      id: "2",
      type: "purchase",
      amount: 5000,
      description: "ポイント追加発行",
      date: "2024-03-14",
    },
  ] as PointHistory[],
};

// モックデータ - ユーティリティ
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

export default function SettingsPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddPointsDialogOpen, setIsAddPointsDialogOpen] = useState(false);
  const [pointsToAdd, setPointsToAdd] = useState("");

  const handleDeleteCommunity = () => {
    // TODO: API呼び出しでコミュニティを削除
    console.log("コミュニティを削除");
    setIsDeleteDialogOpen(false);
  };

  const handleAddPoints = () => {
    // TODO: API呼び出しでポイントを追加
    console.log(`${pointsToAdd}ポイントを追加`);
    setPointsToAdd("");
    setIsAddPointsDialogOpen(false);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: API呼び出しでロゴをアップロード
    const file = event.target.files?.[0];
    if (file) {
      console.log(`ロゴをアップロード: ${file.name}`);
    }
  };

  const handleDeleteUtility = (utilityId: string) => {
    // TODO: API呼び出しでユーティリティを削除
    console.log(`Utility ${utilityId} deleted`);
  };

  return (
    <div className="space-y-6">
      {/* コミュニティ設定 */}
      <Card>
        <CardHeader>
          <CardTitle>コミュニティ設定</CardTitle>
          <CardDescription>コミュニティの基本情報を設定します</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">コミュニティ名</Label>
              <Input
                id="name"
                defaultValue={communityData.name}
                placeholder="コミュニティ名を入力"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                defaultValue={communityData.description}
                placeholder="コミュニティの説明を入力"
              />
            </div>
            <div className="space-y-2">
              <Label>ロゴ</Label>
              <div className="flex items-center gap-4">
                <img
                  src={communityData.logo}
                  alt="Community Logo"
                  className="w-20 h-20 rounded-lg"
                />
                <Button variant="outline" className="relative">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  <Camera className="mr-2 h-4 w-4" />
                  変更
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>SNSリンク</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  <Input
                    defaultValue={communityData.socialLinks.facebook}
                    placeholder="Facebookページのリンク"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      window.open(communityData.socialLinks.facebook, "_blank")
                    }
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  <Input
                    defaultValue={communityData.socialLinks.instagram}
                    placeholder="Instagramアカウントのリンク"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      window.open(communityData.socialLinks.instagram, "_blank")
                    }
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  <Input
                    defaultValue={communityData.socialLinks.twitter}
                    placeholder="Twitterアカウントのリンク"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      window.open(communityData.socialLinks.twitter, "_blank")
                    }
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ポイント管理 */}
      <Card>
        <CardHeader>
          <CardTitle>ポイント管理</CardTitle>
          <CardDescription>コミュニティのポイントを管理します</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  現在のポイント残高
                </div>
                <div className="text-2xl font-bold">
                  {communityData.points.toLocaleString()}
                </div>
              </div>
              <Dialog
                open={isAddPointsDialogOpen}
                onOpenChange={setIsAddPointsDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    ポイントを追加
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>ポイントの追加</DialogTitle>
                    <DialogDescription>
                      追加するポイント数を入力してください
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="points">ポイント数</Label>
                      <Input
                        id="points"
                        type="number"
                        value={pointsToAdd}
                        onChange={(e) => setPointsToAdd(e.target.value)}
                        placeholder="1000"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddPointsDialogOpen(false)}
                    >
                      キャンセル
                    </Button>
                    <Button onClick={handleAddPoints}>追加</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="rounded-md border">
              <div className="p-4">
                <h4 className="text-sm font-medium">履歴</h4>
              </div>
              <div className="divide-y">
                {communityData.pointHistory.map((history) => (
                  <div
                    key={history.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div>
                      <div className="font-medium">{history.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {history.date}
                      </div>
                    </div>
                    <div
                      className={
                        history.type === "reward"
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {history.type === "reward" ? "-" : "+"}
                      {history.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ユーティリティ管理 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>ユーティリティ管理</CardTitle>
              <CardDescription>
                コミュニティのユーティリティを管理します
              </CardDescription>
            </div>
            <Link href="/admin/utilities/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新規作成
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
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
                              onClick={() => handleDeleteUtility(utility.id)}
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
        </CardContent>
      </Card>

      {/* コミュニティの削除 */}
      <Card>
        <CardHeader>
          <CardTitle>危険な操作</CardTitle>
          <CardDescription>
            一度削除すると元に戻すことはできません
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                コミュニティを削除
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>コミュニティの削除</AlertDialogTitle>
                <AlertDialogDescription>
                  本当にコミュニティを削除しますか？この操作は取り消せません。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteCommunity}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  削除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
