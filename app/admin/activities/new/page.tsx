"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewActivity() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">体験を作成</h1>
      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">体験タイトル</Label>
              <Input id="title" placeholder="例: 農業体験" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                placeholder="体験の説明を入力してください"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">価格（円）</Label>
                <Input id="price" type="number" min="0" placeholder="3000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">所要時間（分）</Label>
                <Input id="duration" type="number" min="0" placeholder="60" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">定員</Label>
              <Input id="capacity" type="number" min="1" placeholder="10" />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">開催場所</h3>
              <div className="space-y-2">
                <Label htmlFor="location-name">場所の名称</Label>
                <Input id="location-name" placeholder="例: ○○農園" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prefecture">都道府県</Label>
                <Input id="prefecture" placeholder="例: 東京都" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">市区町村</Label>
                <Input id="city" placeholder="例: 渋谷区" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Input id="address" placeholder="例: 神南1-2-3" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">タイムスケジュール</h3>
              <div className="space-y-2">
                <Label htmlFor="schedule">スケジュール詳細</Label>
                <Textarea
                  id="schedule"
                  placeholder="10:00 開始&#13;&#10;10:30 農作業体験&#13;&#10;12:00 終了"
                  rows={4}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">注意事項</h3>
              <div className="space-y-2">
                <Label htmlFor="precautions">参加時の注意事項</Label>
                <Textarea
                  id="precautions"
                  placeholder="・動きやすい服装でお越しください&#13;&#10;・雨天時は中止となります"
                  rows={4}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              作成する
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
