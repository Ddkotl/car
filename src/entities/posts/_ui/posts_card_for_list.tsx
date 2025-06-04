"use client";

import { Card, CardDescription } from "@/shared/components/ui/card";
import { getPostsToInfinitiScrollType } from "../_actons/get_posts_to_infiniti_scroll";
import Image from "next/image";
import { TagBage, TagBageSkeleton } from "@/entities/tags/_ui/tag_bage";
import Link from "next/link";
import { Title } from "@/shared/components/custom/app-title";
import { TimeAgo } from "@/shared/components/custom/get-time";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { BookmarksButton } from "@/features/bookmarks/ui/bookmark_button";

export function PostsCardForList({
  SinglePost,
  innerRef,
}: {
  SinglePost: getPostsToInfinitiScrollType[number];
  innerRef?: (node?: Element | null | undefined) => void;
}) {
  return (
    <Card className="p-0 max-w-[350px]   transition-all hover:bg-background/80" ref={innerRef}>
      <div className="flex flex-col  gap-1 sm:gap-2  justify-center items-center">
        {/* Image container with fixed aspect ratio */}
        <div className="relative  aspect-[350/215] overflow-hidden max-w-[350px] h-full flex-grow flex-shrink-0 image-safe ">
          <Image
            src={SinglePost.preview_image || "/placeholder.png"}
            alt="картинка карточки"
            width={350}
            height={215}
            className="  object-cover rounded-md"
            priority
          />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {SinglePost?.tags.map((tag) => <TagBage key={tag.slug} slug={tag.slug} title={tag.title} />)}
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col justify-between p-2 sm:pt-1 sm:p-4 ">
          <div>
            <Link href={`/news/${SinglePost.slug}`} className="group">
              <Title
                size="lg"
                text={SinglePost.title}
                className="text-base font-semibold line-clamp-2 group-hover:text-foreground/60 duration-300 transition-colors"
              />
            </Link>

            <CardDescription className="text-xs mt-1.5 flex flex-row items-center justify-between ">
              <TimeAgo date={SinglePost.createdAt} />
              <BookmarksButton id={SinglePost.id} type={SinglePost.type} />
            </CardDescription>

            <p className="text-sm line-clamp-3 mt-2 text-muted-foreground">{SinglePost.meta_description}</p>
          </div>

          <div className=" pt-2">
            <Link href={`/news/${SinglePost.slug}`}>
              <Button
                size="sm"
                className="text-xs bg-foreground text-background hover:bg-foreground/60  transition-colors duration-300 "
              >
                Читать дальше
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function PostsCardForListSkeleton() {
  return (
    <Card className="p-0 max-w-[350px] w-full transition-all hover:bg-background/80">
      <div className="flex flex-col gap-1 sm:gap-2 justify-center items-center">
        {/* Image container - same as real card */}
        <div className="relative aspect-[350/215] overflow-hidden max-w-[350px]  flex-shrink-0 image-safe w-full">
          <Skeleton className="w-full h-full rounded-md" />

          {/* Tags placeholder */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {[...Array(3)].map((_, i) => (
              <TagBageSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Content section - mirror real card structure */}
        <div className="flex flex-col justify-between p-2 sm:pt-1 sm:p-4 w-full">
          <div className="w-full">
            {/* Title */}
            <Skeleton className="h-6 w-4/5 mb-2" />

            {/* Date */}
            <Skeleton className="h-4 w-20 mt-1.5" />

            {/* Description */}
            <div className="mt-2 space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Button */}
          <div className="pt-2 w-full">
            <Skeleton className="h-8 w-28 rounded-sm" />
          </div>
        </div>
      </div>
    </Card>
  );
}
