// app/store.ts
import { newsBookmarksReducer } from "@/features/bookmarks/slices/news_bookmarks_slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    newsBookmarks: newsBookmarksReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
