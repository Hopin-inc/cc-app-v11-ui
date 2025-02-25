"use client";

import Link from "next/link";
import Image from "next/image";
import { Opportunity, Community } from "@/types";
import { ArrowUpRight, Camera, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";
import { CURRENT_USER } from "@/lib/data";
import { Button } from "@/components/ui/button";

type TimelineProps = {
  groupedOpportunities: Record<string, Opportunity[]>;
  showCommunity?: boolean;
  communities?: Community[];
  sortDirection?: "asc" | "desc";
};

export const Timeline = ({
  groupedOpportunities,
  showCommunity = false,
  communities,
  sortDirection = "asc",
}: TimelineProps) => {
  const [selectedImages, setSelectedImages] = useState<
    { url: string; caption?: string }[]
  >([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadImages(files);
    }
  };

  const removeImage = (index: number) => {
    setUploadImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    // TODO: 写真アップロード処理
    console.log({ uploadImages, caption });
    setUploadImages([]);
    setCaption("");
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedOpportunities)
        .sort(([a], [b]) => {
          return sortDirection === "desc"
            ? b.localeCompare(a)
            : a.localeCompare(b);
        })
        .map(([year, opportunities]) => (
          <div key={year} className="space-y-2">
            <h3 className="sticky top-16 z-20 -mx-4 bg-background/95 backdrop-blur-sm py-2 px-4 text-base font-semibold text-muted-foreground">
              {year}年
            </h3>
            <div className="relative space-y-2 pl-6">
              {/* Timeline line */}
              <div className="absolute left-[10px] top-[24px] bottom-2 w-[1px] bg-border" />
              {opportunities.map((opportunity) => {
                const community = communities?.find(
                  (p) => p.id === opportunity.communityId
                );
                return (
                  <div key={opportunity.id} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-[-22px] top-[20px] w-4 h-4 rounded-full border-2 border-border bg-muted" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pt-[18px]">
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(opportunity.startsAt), "M月d日(E)", {
                            locale: ja,
                          })}
                        </div>
                      </div>
                      <div className="flex items-start flex-col gap-4">
                        <Link
                          href={`/opportunities/${opportunity.id}`}
                          className="block space-y-2 group/link relative rounded-lg px-2 -mx-2 transition-all duration-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-lg group-hover/link:text-primary">
                                {opportunity.title}
                              </h4>
                              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover/link:text-primary duration-200 hidden group-hover/link:block" />
                            </div>
                            <p className="text-muted-foreground line-clamp-3 mt-2 text-sm">
                              {opportunity.description}
                            </p>
                          </div>
                        </Link>
                        {showCommunity && community && (
                          <Link
                            href={`/communities/${community.id}`}
                            className="block group/link relative"
                          >
                            <div className="flex items-center gap-x-2">
                              <div className="w-6 h-6 relative">
                                {community.icon && (
                                  <Image
                                    src={community.icon || ""}
                                    alt={community?.title || ""}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground group-hover/link:text-primary">
                                {community?.title}
                              </span>
                            </div>
                          </Link>
                        )}
                        {/* Images */}
                        {opportunity.images &&
                          opportunity.images.length > 0 && (
                            <>
                              <div
                                className={cn("w-full grid grid-cols-2 gap-2")}
                              >
                                {opportunity.images
                                  .slice(0, 4)
                                  .map((image, index) => (
                                    <Dialog key={index}>
                                      <DialogTrigger asChild>
                                        <button
                                          className={cn(
                                            "relative overflow-hidden rounded-md hover:opacity-90 transition-opacity aspect-[4/3]",
                                            index === 3 &&
                                              opportunity.images &&
                                              opportunity.images.length > 4 &&
                                              "relative"
                                          )}
                                        >
                                          <Image
                                            src={image.url}
                                            alt={
                                              image.caption || opportunity.title
                                            }
                                            fill
                                            className="object-cover transition-transform duration-200 hover:scale-[1.2] hover:opacity-90"
                                          />
                                          {index === 3 &&
                                            opportunity.images &&
                                            opportunity.images.length > 4 && (
                                              <div
                                                className="absolute inset-0 bg-black/60 flex items-center justify-center"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                  if (opportunity.images) {
                                                    setSelectedImages(
                                                      opportunity.images
                                                    );
                                                  }
                                                }}
                                              >
                                                <span className="text-white font-medium">
                                                  +
                                                  {opportunity.images.length -
                                                    4}
                                                  枚
                                                </span>
                                              </div>
                                            )}
                                        </button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <div className="relative aspect-[4/3]">
                                          <Image
                                            src={image.url}
                                            alt={
                                              image.caption || opportunity.title
                                            }
                                            fill
                                            className="object-contain"
                                          />
                                        </div>
                                        {image.caption && (
                                          <p className="text-sm text-muted-foreground mt-2">
                                            {image.caption}
                                          </p>
                                        )}
                                      </DialogContent>
                                    </Dialog>
                                  ))}
                              </div>
                              {/* 写真アップロードボタン - 参加済みの場合のみ表示 */}
                              {opportunity.participants?.some(
                                (p) => p.id === CURRENT_USER.id
                              ) && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full mt-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-200"
                                    >
                                      <Camera className="w-4 h-4 mr-2" />
                                      写真を追加
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-2xl">
                                    <div className="space-y-6">
                                      <div>
                                        <h3 className="text-xl font-medium">
                                          活動の写真を追加
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {opportunity.title}
                                          での思い出の写真を共有しましょう
                                        </p>
                                      </div>

                                      {uploadImages.length === 0 ? (
                                        <div
                                          className={cn(
                                            "flex items-center justify-center w-full h-48 border-2 border-dashed rounded-xl",
                                            "border-muted-foreground/25 hover:border-muted-foreground/50 transition-all duration-200",
                                            "bg-muted/50 hover:bg-muted/80"
                                          )}
                                        >
                                          <label
                                            htmlFor="file-upload"
                                            className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-6"
                                          >
                                            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-3">
                                              <Camera className="w-6 h-6 text-muted-foreground" />
                                            </div>
                                            <span className="text-base font-medium mb-1">
                                              写真をドラッグ＆ドロップ
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                              または クリックして写真を選択
                                            </span>
                                            <input
                                              id="file-upload"
                                              type="file"
                                              className="hidden"
                                              accept="image/*"
                                              multiple
                                              onChange={handleFileChange}
                                            />
                                          </label>
                                        </div>
                                      ) : (
                                        <div className="space-y-4">
                                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {uploadImages.map((file, index) => (
                                              <div
                                                key={index}
                                                className="relative aspect-[4/3] group"
                                              >
                                                <Image
                                                  src={URL.createObjectURL(
                                                    file
                                                  )}
                                                  alt={file.name}
                                                  fill
                                                  className="object-cover rounded-lg"
                                                />
                                                <button
                                                  onClick={() =>
                                                    removeImage(index)
                                                  }
                                                  className="absolute -top-2 -right-2 w-6 h-6 bg-background border rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                >
                                                  <X className="w-4 h-4" />
                                                </button>
                                              </div>
                                            ))}
                                            <label
                                              htmlFor="file-upload"
                                              className={cn(
                                                "relative aspect-[4/3] rounded-lg border-2 border-dashed",
                                                "border-muted-foreground/25 hover:border-muted-foreground/50",
                                                "flex items-center justify-center cursor-pointer",
                                                "bg-muted/50 hover:bg-muted/80 transition-all duration-200"
                                              )}
                                            >
                                              <div className="flex flex-col items-center">
                                                <Camera className="w-6 h-6 text-muted-foreground mb-1" />
                                                <span className="text-sm text-muted-foreground">
                                                  追加
                                                </span>
                                              </div>
                                              <input
                                                id="file-upload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                multiple
                                                onChange={handleFileChange}
                                              />
                                            </label>
                                          </div>
                                          <div className="space-y-4">
                                            <textarea
                                              placeholder="キャプションを入力（任意）"
                                              className="w-full px-3 py-2 border rounded-lg resize-none h-24"
                                              value={caption}
                                              onChange={(e) =>
                                                setCaption(e.target.value)
                                              }
                                            />
                                            <div className="flex justify-end gap-3">
                                              <Button
                                                variant="outline"
                                                onClick={() => {
                                                  setUploadImages([]);
                                                  setCaption("");
                                                }}
                                              >
                                                キャンセル
                                              </Button>
                                              <Button onClick={handleUpload}>
                                                アップロード
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                              <Dialog
                                open={selectedImages === opportunity.images}
                                onOpenChange={(open) => {
                                  if (!open) setSelectedImages([]);
                                }}
                              >
                                <DialogContent className="max-w-4xl">
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto p-4">
                                    {opportunity.images.map((image, index) => (
                                      <div
                                        key={index}
                                        className="relative aspect-[4/3]"
                                      >
                                        <Image
                                          src={image.url}
                                          alt={
                                            image.caption || opportunity.title
                                          }
                                          fill
                                          className="object-cover rounded-md"
                                        />
                                        {image.caption && (
                                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                                            <p className="text-sm text-white">
                                              {image.caption}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </>
                          )}

                        {/* Participants */}
                        {opportunity.participants &&
                          opportunity.participants.length > 0 && (
                            <div className="flex items-center gap-x-2">
                              <AvatarGroup>
                                {opportunity.participants.map((participant) => (
                                  <Avatar key={participant.id}>
                                    <Link
                                      href={`/users/${participant.id}`}
                                      className="group"
                                    >
                                      {participant.image ? (
                                        <AvatarImage
                                          src={participant.image}
                                          alt={participant.name}
                                          className="bg-white border rounded-full   transition-transform duration-200 group-hover:scale-[1.2] group-hover:opacity-90"
                                        />
                                      ) : (
                                        <AvatarFallback>
                                          {participant.name.slice(0, 2)}
                                        </AvatarFallback>
                                      )}
                                    </Link>
                                  </Avatar>
                                ))}
                              </AvatarGroup>
                              <span className="text-sm text-muted-foreground">
                                {opportunity.participants.length}人が参加
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};
