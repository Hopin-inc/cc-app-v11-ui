"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewCommunity() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">コミュニティを作成</h1>
      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">コミュニティ名</Label>
              <Input id="title" placeholder="例: 地域の農家コミュニティ" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                placeholder="コミュニティの説明を入力してください"
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">所在地</h3>
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
              <h3 className="font-medium">SNSリンク（任意）</h3>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  type="url"
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  type="url"
                  placeholder="https://instagram.com/..."
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
