"use client";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllTagsToInfinitiScroll } from "../_actions/get_all_tags_to_infinity_scroll";
import { useEffect } from "react";
import { TagsWithCounts } from "../_domain/types";
import { SkeletonTagCard, TagCard } from "./tag_card";
import { Title } from "@/shared/components";

export function TagsList({ tagSlug, searchTerm }: { tagSlug?: string; searchTerm?: string }) {
  const perPage = 36;
  const { ref, inView } = useInView();

  const {
    data: tagsP,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tags", tagSlug ? tagSlug : "", searchTerm ? searchTerm : ""],
    queryFn: (pageParam) => getAllTagsToInfinitiScroll(pageParam.pageParam, perPage, searchTerm),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length === perPage ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
        {Array.from({ length: perPage }).map((_, i) => (
          <SkeletonTagCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
      {tagsP?.pages.length && tagsP.pages.some((page) => page.length) ? (
        tagsP?.pages.flatMap((tags: TagsWithCounts[]) => {
          return tags.map((tag, index) => {
            return (
              <div key={tag.id}>
                <TagCard
                  tagSlug={tag.slug}
                  tagTitle={tag.title}
                  newsCount={tag._count.news}
                  reviewsCount={tag._count.reviews}
                  innerRef={tags.length === index + 1 ? ref : undefined}
                />
              </div>
            );
          });
        })
      ) : (
        <Title size="md" text="Ничего не найдено" />
      )}
      {isFetchingNextPage && Array.from({ length: perPage }).map((_, i) => <SkeletonTagCard key={i} />)}
    </div>
  );
}
