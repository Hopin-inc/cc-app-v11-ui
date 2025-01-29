"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { categories, skills } from "@/lib/data";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    bio: string;
    skills: string[];
    interests: string[];
  };
}

export function EditProfileModal({
  open,
  onOpenChange,
  user,
}: EditProfileModalProps) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [selectedSkills, setSelectedSkills] = useState(user.skills);
  const [selectedInterests, setSelectedInterests] = useState(user.interests);

  const handleSubmit = () => {
    // Here you would typically save the changes to your backend
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            プロフィールを編集
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full p-1 hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">自己紹介</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label>スキル</Label>
            <MultiSelect
              options={skills.map((skill) => ({
                value: skill.name,
                label: skill.name,
              }))}
              selected={selectedSkills}
              onChange={setSelectedSkills}
              placeholder="スキルを選択"
            />
          </div>
          <div className="space-y-2">
            <Label>興味のある分野</Label>
            <MultiSelect
              options={categories.map((category) => ({
                value: category.name,
                label: category.name,
              }))}
              selected={selectedInterests}
              onChange={setSelectedInterests}
              placeholder="分野を選択"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={handleSubmit}>
            保存する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
