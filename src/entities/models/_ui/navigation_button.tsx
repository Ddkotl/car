"use client";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function NavigationButton({
  slug,
  image,
  text,
  direction,
  className,
}: {
  slug: string;
  image: string;
  text: string;
  direction: "prev" | "next";
  className?: string;
}) {
  return (
    <Link
      href={`/model/${slug}`}
      className={cn(
        "flex items-center gap-2 transition-all  duration-300 hover:scale-95  hover:shadow-lg hover:bg-foreground/10 border  p-2 rounded-2xl shadow-lg max-w-44",
        className,
      )}
    >
      {direction === "next" && <ChevronLeft className="w-6 h-6" />}
      <div className={`flex ${direction === "next" ? "flex-row" : "flex-row-reverse"} items-center gap-2 lg:gap-4`}>
        <div className=" image-safe">
          <Image
            src={image}
            alt="картинка навигационной кнопки"
            width={96}
            height={56}
            className="w-14 h-8 object-scale-down rounded-md "
          />
        </div>
        <span className="text-xs lg:text-sm font-extralight text-center">{text}</span>
      </div>
      {direction === "prev" && <ChevronRight className="w-6 h-6" />}
    </Link>
  );
}

export function NavigationButtonSkeleton({ direction }: { direction: "prev" | "next" }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 pointer-events-none opacity-50",
        "border p-2 rounded-2xl shadow-lg max-w-44",
      )}
    >
      {direction === "prev" && <ChevronLeft className="w-6 h-6" />}

      <div className={`flex ${direction === "next" ? "flex-row" : "flex-row-reverse"} items-center gap-2 lg:gap-4`}>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
        <Skeleton className="w-14 h-8" />
      </div>

      {direction === "next" && <ChevronRight className="w-6 h-6" />}
    </div>
  );
}
