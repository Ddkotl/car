"use client";
import { PostsList } from "@/entities/posts/_ui/posts_list";
import {
  selectIsNewsBookmarksStateInit,
  selectNewsBookmarkIds,
} from "@/features/bookmarks/slices/news_bookmarks_slice";
import {
  selectIsReviewsBookmarksStateInit,
  selectReviewsBookmarkIds,
} from "@/features/bookmarks/slices/reviews_bookmarks_slice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { RootState } from "@/shared/lib/store";

import { useSelector } from "react-redux";

export function BookmarksTabs() {
  const newsBookmarksIds = useSelector((state: RootState) => {
    return selectNewsBookmarkIds(state);
  });
  const reviewsBookmarksIds = useSelector((state: RootState) => {
    return selectReviewsBookmarkIds(state);
  });
  const isNewsBookmarksStateInit = useSelector((state: RootState) => {
    return selectIsNewsBookmarksStateInit(state);
  });
  const isReviewsBookmarksStateInit = useSelector((state: RootState) => {
    return selectIsReviewsBookmarksStateInit(state);
  });
  return (
    <Tabs defaultValue="news">
      <TabsList>
        <TabsTrigger value="news">{`Новости(${newsBookmarksIds.length})`}</TabsTrigger>
        <TabsTrigger value="reviews">{`Обзоры(${reviewsBookmarksIds.length})`}</TabsTrigger>
      </TabsList>
      <TabsContent value="news">
        <PostsList type="NEWS" postsIds={newsBookmarksIds} isPostsBookmarksStateInit={isNewsBookmarksStateInit} />
      </TabsContent>
      <TabsContent value="reviews">
        <PostsList
          type="REVIEWS"
          postsIds={reviewsBookmarksIds}
          isPostsBookmarksStateInit={isReviewsBookmarksStateInit}
        />
      </TabsContent>
    </Tabs>
  );
}
