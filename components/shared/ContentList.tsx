"use client";

import { Activity, Article, ContentType, Opportunity } from "@/types";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCallback, useState, useEffect, useRef } from "react";
import { ActivityCard } from "@/components/features/activity/ActivityCard";
import { OpportunityList } from "@/components/features/opportunity/OpportunityList";
import { groupOpportunitiesByDate } from "@/lib/utils/opportunity";
import { mockUsers, CURRENT_USER_DATA } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type ContentListProps = {
  type: ContentType;
  items: (Activity | Opportunity | Article)[];
  className?: string;
  isBottomSheet?: boolean;
  defaultOpen?: boolean;
  dateFilter?: { startDate: Date | null; endDate: Date | null };
  onItemSelect?: (item: Activity | Opportunity | Article) => void;
};

export const ContentList = ({
  type,
  items,
  className,
  isBottomSheet = false,
  defaultOpen = false,
  dateFilter,
  onItemSelect,
}: ContentListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsExpanded(false);
  }, [type, dateFilter]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    const isScrollingDown = scrollTop > lastScrollTop.current;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    if (isScrollingDown && !isExpanded) {
      setIsExpanded(true);
    } else if (!isScrollingDown && isExpanded && scrollTop < 50) {
      scrollTimeout.current = setTimeout(() => {
        setIsExpanded(false);
      }, 100);
    }

    lastScrollTop.current = scrollTop;
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.velocity.y > threshold) {
      setIsExpanded(false);
    } else if (info.velocity.y < -threshold) {
      setIsExpanded(true);
    } else {
      setIsExpanded(info.offset.y < 0);
    }
  };

  const handleTap = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleItemClick = (
    e: React.MouseEvent,
    item: Activity | Opportunity | Article
  ) => {
    e.preventDefault();
    if (onItemSelect) {
      onItemSelect(item);
      setIsExpanded(false);
    }
  };

  const getItemLink = (item: Activity | Opportunity | Article) => {
    switch (type) {
      case "EXPERIENCE":
        return `/activities/${item.id}`;
      case "QUEST":
      case "EVENT":
        return `/opportunities/${item.id}`;
      case "ARTICLE":
        return `/articles/${item.id}`;
      default:
        return "#";
    }
  };

  interface ImageObject {
    url: string;
    caption?: string;
  }

  function isImageObject(image: unknown): image is ImageObject {
    if (!image || typeof image !== "object") return false;
    return "url" in image && typeof (image as ImageObject).url === "string";
  }

  const getItemImage = (item: Activity | Opportunity | Article): string => {
    // Check for images array
    if (
      "images" in item &&
      Array.isArray(item.images) &&
      item.images.length > 0
    ) {
      const firstImage = item.images[0];
      if (typeof firstImage === "string") return firstImage;
      if (isImageObject(firstImage)) return firstImage.url;
    }

    // Check for single image
    if ("image" in item) {
      const image = (item as { image: string | ImageObject }).image;
      if (typeof image === "string") return image;
      if (isImageObject(image)) return image.url;
    }

    // Check for thumbnail
    if ("thumbnail" in item && typeof item.thumbnail === "string") {
      return item.thumbnail;
    }

    return "/placeholder.png";
  };

  const PhotoCard = ({ item }: { item: Activity | Opportunity | Article }) => (
    <Link
      href={getItemLink(item)}
      className="group block"
      onClick={(e) => handleItemClick(e, item)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={getItemImage(item)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-white mb-1 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-white/80 line-clamp-1">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );

  const renderContent = () => {
    switch (type) {
      case "EXPERIENCE":
        return (
          <div className="grid grid-cols-2 gap-4 p-4">
            {items.map((item) => (
              <PhotoCard key={item.id} item={item} />
            ))}
          </div>
        );
      case "QUEST":
      case "EVENT":
        const opportunities = items as Opportunity[];
        return (
          <div className="grid grid-cols-2 gap-4 p-4">
            {opportunities.map((item) => (
              <PhotoCard key={item.id} item={item} />
            ))}
          </div>
        );
      case "ARTICLE":
        return (
          <div className="space-y-4 p-4">
            {(items as Article[]).map((article) => (
              <div key={article.id} className="border rounded-lg p-4">
                <h3 className="font-bold">{article.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {article.description}
                </p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (isBottomSheet) {
    return (
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "70vh" : "120px",
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          onClick={handleTap}
          className="fixed bottom-0 left-0 right-0 mx-auto bg-white shadow-lg rounded-t-xl z-[100] overflow-hidden cursor-pointer"
          style={{
            width: "min(calc(100% - 32px), 480px)",
          }}
          ref={containerRef}
        >
          <div className="w-full h-full">
            <div className="w-12 h-1 mx-auto mt-2 rounded-full bg-gray-300" />
            <div
              className="max-h-[calc(70vh-40px)] overflow-y-auto"
              onScroll={handleScroll}
            >
              {renderContent()}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return renderContent();
};
