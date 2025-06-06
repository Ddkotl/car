"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPostsToInfinitiScroll, getPostsToInfinitiScrollType } from "../_actons/get_posts_to_infiniti_scroll";
import { useEffect } from "react";
import { PostsCardForList, PostsCardForListSkeleton } from "./posts_card_for_list";
import { Title } from "@/shared/components/custom/app-title";
import { PostTypes } from "../../../../generated/prisma";

export function PostsList({
  type,
  tagSlug,
  searchTerm,
  postsIds,
  isPostsBookmarksStateInit,
}: {
  type: PostTypes;
  tagSlug?: string;
  searchTerm?: string;
  postsIds?: string[];
  isPostsBookmarksStateInit?: boolean;
}) {
  const perPage = 9;
  const { ref, inView } = useInView();
  const {
    data: postsP,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", type, tagSlug && tagSlug, searchTerm && searchTerm, isPostsBookmarksStateInit, postsIds],
    queryFn: (pageParam) => getPostsToInfinitiScroll(type, pageParam.pageParam, perPage, searchTerm, tagSlug, postsIds),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length === perPage ? allPage.length + 1 : undefined;
      return nextPage;
    },
    staleTime: postsIds ? 0 : 1000 * 60 * 5,
    gcTime: postsIds ? 0 : 1000 * 60 * 5,
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
      <div className="grid grid-cols-1 xs1:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 justify-items-center ">
        {Array.from({ length: perPage }).map((_, i) => (
          <PostsCardForListSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-1 xs1:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 justify-items-center ">
      {postsP?.pages.length && postsP.pages.some((page) => page.length) ? (
        postsP?.pages.flatMap((posts: getPostsToInfinitiScrollType) => {
          return posts.map((singlePost, index) => {
            return (
              <div key={singlePost.id}>
                <PostsCardForList SinglePost={singlePost} innerRef={posts.length === index + 1 ? ref : undefined} />
              </div>
            );
          });
        })
      ) : (
        <Title size="md" text="Ничего не найдено" />
      )}
      {isFetchingNextPage && Array.from({ length: perPage }).map((_, i) => <PostsCardForListSkeleton key={i} />)}
    </div>
  );
}
