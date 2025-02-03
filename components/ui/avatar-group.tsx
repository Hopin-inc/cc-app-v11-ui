"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className, max, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const maxAvatars = max || childrenArray.length;
    const displayAvatars = childrenArray.slice(0, maxAvatars);
    const remainingAvatars = childrenArray.length - maxAvatars;

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-4 rtl:space-x-reverse", className)}
        {...props}
      >
        {displayAvatars.map((child, index) => (
          <div
            key={index}
            className="relative inline-block border-2 border-background rounded-full"
          >
            {child}
          </div>
        ))}
        {remainingAvatars > 0 && (
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm border-2 border-background">
            +{remainingAvatars}
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
