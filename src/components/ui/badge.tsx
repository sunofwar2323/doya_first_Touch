import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gold" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium tracking-wider uppercase",
        variant === "default" && "bg-[#111111] text-white",
        variant === "gold" && "bg-gold/10 text-gold border border-gold/30",
        variant === "outline" && "border border-border text-muted",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
