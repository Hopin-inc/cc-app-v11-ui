import { useRef, useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { CommunityPointCard } from "@/components/features/user/CommunityPointCard";
import { cn } from "@/lib/utils";
import type { Community } from "@/types";

type Props = {
  userCommunities: Community[];
  points: Record<string, { available: number; total: number }>;
  isOwner: boolean;
  userId: string;
  onSelectCommunity: (
    community: Community,
    points: { available: number; total: number }
  ) => void;
};

export const UserPointCardSlider = ({
  userCommunities,
  points,
  isOwner,
  userId,
  onSelectCommunity,
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // スライダーのスクロール位置を監視
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideElement = entry.target as HTMLElement;
            const index = parseInt(slideElement.dataset.index || "0");
            setCurrentSlide(index);
          }
        });
      },
      {
        root: slider,
        threshold: 0.5,
      }
    );

    const slides = slider.querySelectorAll(".slide-item");
    slides.forEach((slide) => observer.observe(slide));

    return () => {
      slides.forEach((slide) => observer.unobserve(slide));
    };
  }, []);

  // 指定したスライドに移動
  const goToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = slider.querySelectorAll(".slide-item");
    const targetSlide = slides[index] as HTMLElement;
    if (!targetSlide) return;

    slider.scrollTo({
      left: targetSlide.offsetLeft - slider.offsetLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className="md:col-span-2 mb-4 mt-8">
      <div className="flex items-center justify-between mb-2 pb-2">
        <h2 className="text-lg font-semibold text-muted-foreground">
          ポイントカード
        </h2>
        <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
          {userCommunities.length}枚
        </span>
      </div>
      {userCommunities.length > 0 ? (
        <div className="relative">
          <div
            ref={sliderRef}
            className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none scroll-smooth snap-x snap-mandatory pt-4"
          >
            <div className="flex space-x-4 w-fit">
              {userCommunities.map((community, index) => {
                const projectPoints = points[community.id];
                return (
                  <div
                    key={community.id}
                    data-index={index}
                    className="slide-item shrink-0 snap-center"
                    style={{ width: "350px" }}
                  >
                    <CommunityPointCard
                      community={community}
                      points={projectPoints}
                      onClick={() => {
                        // 中央のカードの場合のみモーダルを開く
                        if (currentSlide === index) {
                          onSelectCommunity(community, projectPoints);
                        } else {
                          // 中央以外のカードの場合はそのカードまでスライド
                          goToSlide(index);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* ドット */}
          <div className="flex justify-center space-x-2 mt-4">
            {userCommunities.map((project, i) => (
              <button
                key={project.id}
                onClick={() => goToSlide(i)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  currentSlide === i ? "bg-primary" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          title="まだ会員証を持っていません"
          description={
            isOwner
              ? "地域の活動に参加して、会員証を獲得しましょう"
              : "地域の活動に参加すると、会員証を獲得できます"
          }
          actionLabel="関わりを探す"
          onAction={() => {
            window.location.href = "/";
          }}
          icon={<CreditCard className="w-10 h-10 text-muted-foreground" />}
          hideActionButton={!isOwner}
        />
      )}
    </div>
  );
};
