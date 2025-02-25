"use client";

import { useState, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Plus,
  ExternalLink,
  Users,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  UserPlus,
  Coins,
  UserX,
  Send,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Photo = {
  id: string;
  url: string;
  title: string;
  uploadedAt: string;
};

type Member = {
  id: string;
  name: string;
  image: string;
  role: "owner" | "manager" | "member" | "participant";
  lastParticipatedAt: string;
  participationCount: number;
  points: number;
  recentPhotos: Photo[];
};

type Role = Member["role"];
type RoleOrder = Record<Role, number>;

const roleOrder: RoleOrder = {
  owner: 0,
  manager: 1,
  member: 2,
  participant: 3,
};

type SortConfig = {
  key: keyof Member | null;
  direction: "asc" | "desc";
};

// モックデータ
const communityData = {
  members: [
    {
      id: "1",
      name: "山田太郎",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      role: "owner",
      lastParticipatedAt: "2024-02-20",
      participationCount: 15,
      points: 5000,
      recentPhotos: [
        {
          id: "p1",
          url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop&q=60",
          title: "オリーブ収穫",
          uploadedAt: "2024-02-20",
        },
        {
          id: "p2",
          url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=60",
          title: "海岸清掃",
          uploadedAt: "2024-02-19",
        },
        {
          id: "p3",
          url: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800&auto=format&fit=crop&q=60",
          title: "地域イベント",
          uploadedAt: "2024-02-18",
        },
      ],
    },
    {
      id: "2",
      name: "佐藤花子",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
      role: "manager",
      lastParticipatedAt: "2024-02-15",
      participationCount: 8,
      points: 2500,
      recentPhotos: [
        {
          id: "p4",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "ワークショップ",
          uploadedAt: "2024-02-15",
        },
        {
          id: "p5",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "料理教室",
          uploadedAt: "2024-02-14",
        },
        {
          id: "p6",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "農園作業",
          uploadedAt: "2024-02-13",
        },
      ],
    },
    {
      id: "3",
      name: "鈴木一郎",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      role: "member",
      lastParticipatedAt: "2024-02-22",
      participationCount: 12,
      points: 3500,
      recentPhotos: [
        {
          id: "p7",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "活動写真1",
          uploadedAt: "2024-02-22",
        },
        {
          id: "p8",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "活動写真2",
          uploadedAt: "2024-02-22",
        },
        {
          id: "p9",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "活動写真3",
          uploadedAt: "2024-02-22",
        },
      ],
    },
    {
      id: "4",
      name: "田中美咲",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Misa",
      role: "participant",
      lastParticipatedAt: "2024-02-21",
      participationCount: 3,
      points: 1000,
      recentPhotos: [
        {
          id: "p10",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "活動写真1",
          uploadedAt: "2024-02-21",
        },
        {
          id: "p11",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "活動写真2",
          uploadedAt: "2024-02-21",
        },
        {
          id: "p12",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "活動写真3",
          uploadedAt: "2024-02-21",
        },
      ],
    },
    {
      id: "5",
      name: "中村雅人",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Masato",
      role: "participant",
      lastParticipatedAt: "2024-02-18",
      participationCount: 5,
      points: 1500,
      recentPhotos: [
        {
          id: "p13",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "活動写真1",
          uploadedAt: "2024-02-18",
        },
        {
          id: "p14",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "活動写真2",
          uploadedAt: "2024-02-18",
        },
        {
          id: "p15",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "活動写真3",
          uploadedAt: "2024-02-18",
        },
      ],
    },
    {
      id: "6",
      name: "小林結衣",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yui",
      role: "participant",
      lastParticipatedAt: "2024-02-19",
      participationCount: 4,
      points: 1200,
      recentPhotos: [
        {
          id: "p16",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "活動写真1",
          uploadedAt: "2024-02-19",
        },
        {
          id: "p17",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "活動写真2",
          uploadedAt: "2024-02-19",
        },
        {
          id: "p18",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "活動写真3",
          uploadedAt: "2024-02-19",
        },
      ],
    },
    {
      id: "7",
      name: "渡辺雄二",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuji",
      role: "participant",
      lastParticipatedAt: "2024-02-17",
      participationCount: 2,
      points: 800,
      recentPhotos: [
        {
          id: "p19",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "活動写真1",
          uploadedAt: "2024-02-17",
        },
        {
          id: "p20",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "活動写真2",
          uploadedAt: "2024-02-17",
        },
        {
          id: "p21",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "活動写真3",
          uploadedAt: "2024-02-17",
        },
      ],
    },
    {
      id: "8",
      name: "加藤千夏",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinatsu",
      role: "participant",
      lastParticipatedAt: "2024-02-23",
      participationCount: 6,
      points: 1800,
      recentPhotos: [
        {
          id: "p22",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "活動写真1",
          uploadedAt: "2024-02-23",
        },
        {
          id: "p23",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "活動写真2",
          uploadedAt: "2024-02-23",
        },
        {
          id: "p24",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "活動写真3",
          uploadedAt: "2024-02-23",
        },
      ],
    },
    {
      id: "9",
      name: "伊藤健一",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenichi",
      role: "participant",
      lastParticipatedAt: "2024-02-16",
      participationCount: 1,
      points: 500,
      recentPhotos: [
        {
          id: "p25",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "活動写真1",
          uploadedAt: "2024-02-16",
        },
        {
          id: "p26",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "活動写真2",
          uploadedAt: "2024-02-16",
        },
        {
          id: "p27",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "活動写真3",
          uploadedAt: "2024-02-16",
        },
      ],
    },
    {
      id: "10",
      name: "高橋美優",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miyu",
      role: "participant",
      lastParticipatedAt: "2024-02-22",
      participationCount: 7,
      points: 2000,
      recentPhotos: [
        {
          id: "p28",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "活動写真1",
          uploadedAt: "2024-02-22",
        },
        {
          id: "p29",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "活動写真2",
          uploadedAt: "2024-02-22",
        },
        {
          id: "p30",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "活動写真3",
          uploadedAt: "2024-02-22",
        },
      ],
    },
    {
      id: "11",
      name: "松本大輔",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daisuke",
      role: "participant",
      lastParticipatedAt: "2024-02-20",
      participationCount: 4,
      points: 1300,
      recentPhotos: [
        {
          id: "p31",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "活動写真1",
          uploadedAt: "2024-02-20",
        },
        {
          id: "p32",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "活動写真2",
          uploadedAt: "2024-02-20",
        },
        {
          id: "p33",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "活動写真3",
          uploadedAt: "2024-02-20",
        },
      ],
    },
    {
      id: "12",
      name: "山口さくら",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura",
      role: "participant",
      lastParticipatedAt: "2024-02-19",
      participationCount: 3,
      points: 900,
      recentPhotos: [
        {
          id: "p34",
          url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
          title: "活動写真1",
          uploadedAt: "2024-02-19",
        },
        {
          id: "p35",
          url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
          title: "活動写真2",
          uploadedAt: "2024-02-19",
        },
        {
          id: "p36",
          url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
          title: "活動写真3",
          uploadedAt: "2024-02-19",
        },
      ],
    },
  ],
};

// 他のメンバーにも同様の写真データを追加
communityData.members = communityData.members.map((member) => {
  if (!member.recentPhotos) {
    member.recentPhotos = [
      {
        id: `p${member.id}1`,
        url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=60",
        title: "活動写真1",
        uploadedAt: member.lastParticipatedAt,
      },
      {
        id: `p${member.id}2`,
        url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
        title: "活動写真2",
        uploadedAt: member.lastParticipatedAt,
      },
      {
        id: `p${member.id}3`,
        url: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&auto=format&fit=crop&q=60",
        title: "活動写真3",
        uploadedAt: member.lastParticipatedAt,
      },
    ];
  }
  return member;
});

export default function MembersPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddTokenDialogOpen, setIsAddTokenDialogOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [pointsToAdd, setPointsToAdd] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "lastParticipatedAt",
    direction: "desc",
  });

  const sortedMembers = useMemo(() => {
    if (!sortConfig.key) return communityData.members;

    return [...communityData.members].sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortConfig.key === "lastParticipatedAt") {
        return sortConfig.direction === "asc"
          ? new Date(a.lastParticipatedAt).getTime() -
              new Date(b.lastParticipatedAt).getTime()
          : new Date(b.lastParticipatedAt).getTime() -
              new Date(a.lastParticipatedAt).getTime();
      }
      if (sortConfig.key === "participationCount") {
        return sortConfig.direction === "asc"
          ? a.participationCount - b.participationCount
          : b.participationCount - a.participationCount;
      }
      if (sortConfig.key === "role") {
        // @ts-ignore: roleOrderのインデックスアクセスの型エラーを無視
        const aValue = roleOrder[a.role as keyof typeof roleOrder];
        // @ts-ignore: roleOrderのインデックスアクセスの型エラーを無視
        const bValue = roleOrder[b.role as keyof typeof roleOrder];
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      return 0;
    });
  }, [sortConfig]);

  const toggleRow = (memberId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(memberId)) {
      newExpandedRows.delete(memberId);
    } else {
      newExpandedRows.add(memberId);
    }
    setExpandedRows(newExpandedRows);
  };

  const requestSort = (key: keyof Member) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleRoleChange = (memberId: string, newRole: Member["role"]) => {
    // TODO: API呼び出しでロールを変更
    console.log(`メンバー${memberId}のロールを${newRole}に変更`);
  };

  const handleDeleteMember = (memberId: string) => {
    setSelectedMemberId(memberId);
    setIsDeleteDialogOpen(true);
  };

  const handleAddToken = (memberId: string) => {
    setSelectedMemberId(memberId);
    setIsAddTokenDialogOpen(true);
  };

  const handleInviteToOpportunity = (memberId: string) => {
    // TODO: API呼び出しで機会に招待
    console.log(`メンバー${memberId}を機会に招待`);
  };

  const handleTokenSubmit = () => {
    // TODO: API呼び出しでトークンを付与
    console.log(`メンバー${selectedMemberId}にトークンを付与: ${pointsToAdd}`);
    setPointsToAdd("");
    setIsAddTokenDialogOpen(false);
  };

  return (
    <div className="space-y-6 container max-w-[1400px] mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>メンバー管理</CardTitle>
              <CardDescription>
                コミュニティのメンバーを管理します
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  メンバーを招待
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>メンバーを招待</DialogTitle>
                  <DialogDescription>
                    招待したいメンバーのメールアドレスを入力してください
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input
                      id="email"
                      placeholder="example@email.com"
                      type="email"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">招待を送信</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px] sticky left-0 bg-white p-4"></TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50 w-[200px] sticky left-[30px] bg-white px-3"
                    onClick={() => requestSort("name")}
                  >
                    メンバー
                    {sortConfig.key === "name" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50 w-[120px]"
                    onClick={() => requestSort("lastParticipatedAt")}
                  >
                    最終参加日
                    {sortConfig.key === "lastParticipatedAt" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50 w-[100px]"
                    onClick={() => requestSort("participationCount")}
                  >
                    参加回数
                    {sortConfig.key === "participationCount" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50 w-[120px]"
                    onClick={() => requestSort("role")}
                  >
                    ロール
                    {sortConfig.key === "role" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </TableHead>
                  <TableHead className="w-[64px] sticky right-0 bg-white"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMembers.map((member) => (
                  <>
                    <TableRow key={member.id}>
                      <TableCell className="sticky left-0 bg-white p-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0"
                          onClick={() => toggleRow(member.id)}
                          title={
                            expandedRows.has(member.id)
                              ? "写真を隠す"
                              : "写真を表示"
                          }
                        >
                          {expandedRows.has(member.id) ? (
                            <ChevronDown className="h-4 w-4 text-blue-500" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="flex items-center gap-3 py-3 px-3 sticky left-[30px] bg-white">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <span className="font-medium">{member.name}</span>
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        {member.lastParticipatedAt}
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        {member.participationCount}回
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <Select
                          defaultValue={member.role}
                          onValueChange={(value) =>
                            handleRoleChange(member.id, value as Member["role"])
                          }
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">オーナー</SelectItem>
                            <SelectItem value="manager">
                              マネージャー
                            </SelectItem>
                            <SelectItem value="member">メンバー</SelectItem>
                            <SelectItem value="participant">参加者</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="py-3 px-4 sticky right-0 bg-white">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">メニューを開く</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[160px] p-0 overflow-hidden"
                          >
                            <div className="p-1">
                              <DropdownMenuItem
                                className="px-2"
                                onClick={() =>
                                  handleInviteToOpportunity(member.id)
                                }
                              >
                                <Send className="mr-2 h-4 w-4" />
                                機会に招待する
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="px-2"
                                onClick={() => handleAddToken(member.id)}
                              >
                                <Coins className="mr-2 h-4 w-4" />
                                ポイントを付与
                              </DropdownMenuItem>
                            </div>
                            <div className="border-t border-gray-100 p-1">
                              <DropdownMenuItem
                                className="text-red-600 px-2"
                                onClick={() => handleDeleteMember(member.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                削除
                              </DropdownMenuItem>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    {expandedRows.has(member.id) && (
                      <TableRow>
                        <TableCell colSpan={6} className="p-3 bg-gray-50">
                          <div className="grid grid-cols-3 gap-3">
                            {member.recentPhotos.map((photo) => (
                              <div
                                key={photo.id}
                                className="bg-white rounded-lg shadow-sm overflow-hidden"
                              >
                                <div className="aspect-video relative">
                                  <img
                                    src={photo.url}
                                    alt={photo.title}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <div className="p-2">
                                  <p className="text-sm font-medium truncate">
                                    {photo.title}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {photo.uploadedAt}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* トークン付与ダイアログ */}
      <Dialog
        open={isAddTokenDialogOpen}
        onOpenChange={setIsAddTokenDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ポイントを付与</DialogTitle>
            <DialogDescription>
              付与するポイント入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="token-points">トークン数</Label>
              <Input
                id="token-points"
                type="number"
                placeholder="100"
                value={pointsToAdd}
                onChange={(e) => setPointsToAdd(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddTokenDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button onClick={handleTokenSubmit}>付与</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* メンバー削除ダイアログ */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>メンバーの削除</DialogTitle>
            <DialogDescription>
              このメンバーを削除してもよろしいですか？この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                console.log(`メンバー${selectedMemberId}を削除`);
                setIsDeleteDialogOpen(false);
              }}
            >
              削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
