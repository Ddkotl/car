"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import Link from "next/link";
import { getPostsDeclension } from "../_fn/get_news_declension";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function TagCard({
  tagSlug,
  tagTitle,
  count,
  innerRef,
}: {
  tagSlug: string;
  tagTitle: string;
  count: number;
  innerRef?: (node?: Element | null | undefined) => void;
}) {
  return (
    <Link href={`tags/${tagSlug}`} ref={innerRef}>
      <Card className="p-0 h-32 gap-1  flex flex-col justify-evenly shadow-md transition-all  duration-300 hover:scale-95  hover:shadow-lg hover:bg-foreground/10  items-center">
        <CardHeader className="p-1 flex items-center justify-center text-center">
          <CardTitle className="  text-sm  ">{tagTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-1  items-center justify-center">
          <p className="text-xs text-muted-foreground ">
            {count} {getPostsDeclension(count)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export function SkeletonTagCard() {
  return (
    <Card className="p-0 h-32 gap-1 flex flex-col justify-evenly shadow-md  items-center">
      <Skeleton className="w-24 h-4 rounded-md" />
      <Skeleton className="w-24 h-4 rounded-md" />
    </Card>
  );
}
