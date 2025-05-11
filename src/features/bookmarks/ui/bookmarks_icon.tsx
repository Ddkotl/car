"use client";
import { IoBookmarks } from "react-icons/io5";
import Link from "next/link";
import { Button } from "../../../shared/components/ui/button";
export function BookmarksIcon() {
  // const dispatch = useDispatch();
  // const isNewsBookmarksStateInit = useSelector((state: RootState) => {
  //   return selectIsNewsBookmarksStateInit(state);
  // });
  // const newsCount = useSelector((state: RootState) => {
  //   return selectNewsBookmarksCount(state);
  // });

  // useEffect(() => {
  //   if (typeof window !== "undefined" && !isNewsBookmarksStateInit) {
  //     dispatch(initNewsBookmarks());
  //   }
  // }, [dispatch, isNewsBookmarksStateInit]);

  // if (!isNewsBookmarksStateInit) {
  //   return (
  //     <Button
  //       variant="ghost"
  //       size="icon"
  //       name="закладки"
  //       aria-label="закладки"
  //       className="relative cursor-auto"
  //       disabled
  //     >
  //       <IoBookmarks className=" text-contrast_color h-4 w-4" />
  //       <Skeleton className="h-4 w-4  rounded-full  absolute -top-1 -right-1" />
  //     </Button>
  //   );
  // }
  return (
    <Link href={`/bookmarks`}>
      <Button
        variant="ghost"
        size="icon"
        name="закладки"
        aria-label="закладки"
        className="relative"
      >
        <IoBookmarks className=" text-contrast_color h-4 w-4" />
        <span className="absolute -top-1 -right-1  bg-contrast_color text-white text-xs font-bold rounded-full h-4 p-1 flex items-center justify-center">
          {/* {newsCount < 100 ? newsCount : "99+"} */}10
        </span>
      </Button>
    </Link>
  );
}
