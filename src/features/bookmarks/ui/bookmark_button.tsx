"use client";

import { selectIsNewsBookmarked, toggleNewsBookmark } from "@/features/bookmarks/slices/news_bookmarks_slice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/shared/components/ui/button";
import { FaBookmark } from "react-icons/fa";
import { RootState } from "@/shared/lib/store";
import { PostTypes } from "../../../../generated/prisma";

export function BookmarksButton({ id, type }: { id: string; type: PostTypes }) {
  // const session = useAppSession();
  // const userId = session.data?.user.id;
  const dispatch = useDispatch();
  const isBookmarked = useSelector((state: RootState) => {
    return type === "NEWS" ? selectIsNewsBookmarked(state, id) : selectIsNewsBookmarked(state, id);
  });
  const handleClick = () => {
    if (type === "NEWS") {
      dispatch(toggleNewsBookmark(id));
      // if (userId) {
      //   toggleNewsBookmarkAction(userId, id);
      // }
    }
  };

  return (
    <Button
      onClick={handleClick}
      aria-label={isBookmarked ? "Удалить из закладок" : "Добавить в закладки"}
      variant="ghost"
      size="icon"
      name="закладка"
      className="cursor-pointer"
    >
      <FaBookmark
        className={`text-contrast_color h-4 w-4 ${isBookmarked ? " text-yellow-500" : "text-contrast_color/80"}`}
      />
    </Button>
  );
}
