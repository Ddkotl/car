"use client";
import { useDispatch } from "react-redux";
import { clearNewsBookmarks } from "../slices/news_bookmarks_slice";
import { Button } from "@/shared/components/ui/button";

export function CleareBookmarksButton() {
  const dispatch = useDispatch();
  // const session = useAppSession();
  // const userId = session?.data?.user.id;

  const handleClearBookmarks = () => {
    // if (userId) {
    // deleteAllNewsBookmarksByUser(userId);
    // }
    dispatch(clearNewsBookmarks());
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
