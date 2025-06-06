"use client";
import { useDispatch } from "react-redux";
import { clearNewsBookmarks } from "../slices/news_bookmarks_slice";
import { Button } from "@/shared/components/ui/button";
import { clearReviewsBookmarks } from "../slices/reviews_bookmarks_slice";

export function CleareBookmarksButton() {
  const dispatch = useDispatch();
  // const session = useAppSession();
  // const userId = session?.data?.user.id;

  const handleClearBookmarks = () => {
    // if (userId) {
    // deleteAllNewsBookmarksByUser(userId);
    // }
    dispatch(clearNewsBookmarks());
    dispatch(clearReviewsBookmarks());
  };

  return (
    <Button
      variant="destructive"
      size="lg"
      name="очистить закладки"
      aria-label="очистить закладки"
      onClick={handleClearBookmarks}
    >
      Очистить закладки
    </Button>
  );
}
