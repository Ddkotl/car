"use client";
import { PostsList } from "@/entities/posts/_ui/posts_list";
import {
  selectIsNewsBookmarksStateInit,
  selectNewsBookmarkIds,
} from "@/features/bookmarks/slices/news_bookmarks_slice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { RootState } from "@/shared/lib/store";

import { useSelector } from "react-redux";

export function BookmarksTabs() {
  const newsBookmarksIds = useSelector((state: RootState) => {
    return selectNewsBookmarkIds(state);
  });
  const isNewsBookmarksStateInit = useSelector((state: RootState) => {
    return selectIsNewsBookmarksStateInit(state);
  });
  return (
    <Tabs defaultValue="news">
      <TabsList>
        <TabsTrigger value="news">{`Новости`}</TabsTrigger>
        <TabsTrigger value="reviews">{`Обзоры`}</TabsTrigger>
      </TabsList>
      <TabsContent value="news">
        <PostsList type="NEWS" postsIds={newsBookmarksIds} isPostsBookmarksStateInit={isNewsBookmarksStateInit} />
      </TabsContent>
      <TabsContent value="reviews">{/* <ReviewsList /> */}</TabsContent>
    </Tabs>
  );
}
