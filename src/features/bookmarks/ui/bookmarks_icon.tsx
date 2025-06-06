"use client";
import { IoBookmarks } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  initNewsBookmarks,
  selectIsNewsBookmarksStateInit,
  selectNewsBookmarksCount,
} from "../slices/news_bookmarks_slice";
import { RootState } from "@/shared/lib/store";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  initReviewsBookmarks,
  selectIsReviewsBookmarksStateInit,
  selectReviewsBookmarksCount,
} from "../slices/reviews_bookmarks_slice";
export function BookmarksIcon() {
  // const session = useAppSession();
  // const userId = session?.data?.user.id;
  const dispatch = useDispatch();
  const isNewsBookmarksStateInit = useSelector((state: RootState) => {
    return selectIsNewsBookmarksStateInit(state);
  });
  const isReviewsBookmarksStateInit = useSelector((state: RootState) => {
    return selectIsReviewsBookmarksStateInit(state);
  });
  const newsCount = useSelector((state: RootState) => {
    return selectNewsBookmarksCount(state);
  });
  const reviewsCount = useSelector((state: RootState) => {
    return selectReviewsBookmarksCount(state);
  });
  // const newsBookmarksLocal = useSelector((state: RootState) => {
  //   return selectNewsBookmarkIds(state);
  // });
  useEffect(() => {
    if (typeof window !== "undefined" && !isNewsBookmarksStateInit) {
      dispatch(initNewsBookmarks());
    }
    if (typeof window !== "undefined" && !isReviewsBookmarksStateInit) {
      dispatch(initReviewsBookmarks());
    }
  }, [dispatch, isNewsBookmarksStateInit, isReviewsBookmarksStateInit]);
  // const syncBookmarks = useDebouncedCallback(async (bookmarks: string[], userId: string) => {
  //   try {
  //     const updatedNewsBookmarks = await addNewsBookmarks(bookmarks, userId);
  //     localStorage.setItem(news_bookmarks_key, JSON.stringify(updatedNewsBookmarks));
  //     dispatch(initNewsBookmarks());
  //   } catch (error) {
  //     toast.error("Не удалось сохранить закладки");
  //     console.error("Bookmarks sync error:", error);
  //   }
  // }, 1000);

  // useEffect(() => {
  //   if (!userId || !isNewsBookmarksStateInit || newsBookmarksLocal.length === 0) return;
  //   syncBookmarks(newsBookmarksLocal, userId);
  // }, [newsBookmarksLocal, userId, isNewsBookmarksStateInit, syncBookmarks]);
  if (!isNewsBookmarksStateInit || !isReviewsBookmarksStateInit) {
    return (
      <Button
        variant="ghost"
        size="icon"
        name="закладки"
        aria-label="закладки"
        className="relative cursor-auto"
        disabled
      >
        <IoBookmarks className=" text-contrast_color h-4 w-4" />
        <Skeleton className="h-4 w-4  rounded-full  absolute -top-1 -right-1" />
      </Button>
    );
  }
  return (
    <Link href={`/bookmarks`}>
      <Button variant="ghost" size="icon" name="закладки" aria-label="закладки" className="relative cursor-pointer">
        <IoBookmarks className=" text-contrast_color h-4 w-4" />
        <span className="absolute -top-1 -right-1  bg-contrast_color text-white text-xs font-bold rounded-full h-4 p-1 flex items-center justify-center">
          {newsCount + reviewsCount < 100 ? newsCount + reviewsCount : "99+"}
        </span>
      </Button>
    </Link>
  );
}
