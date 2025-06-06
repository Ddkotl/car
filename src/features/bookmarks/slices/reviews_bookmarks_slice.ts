// features/bookmarks/bookmarksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reviews_bookmarks_key } from "../keys";

interface ReviewsBookmarksState {
  reviews_ids: string[];
  isReviewsBookmarksStateInit: boolean;
}
const initialReviewsBookmarksState: ReviewsBookmarksState = {
  reviews_ids: [],
  isReviewsBookmarksStateInit: false,
};

export const reviewsBookmarksSlice = createSlice({
  name: reviews_bookmarks_key,
  initialState: initialReviewsBookmarksState,
  reducers: {
    toggleReviewsBookmark: (state, action: PayloadAction<string>) => {
      const index = state.reviews_ids.indexOf(action.payload);
      if (index === -1) {
        // Добавляем ID, если его нет
        state.reviews_ids.push(action.payload);
      } else {
        // Удаляем ID, если он есть
        state.reviews_ids.splice(index, 1);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem(reviews_bookmarks_key, JSON.stringify(state.reviews_ids));
      }
    },
    clearReviewsBookmarks: (state) => {
      state.reviews_ids = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem(reviews_bookmarks_key);
      }
    },
    initReviewsBookmarks: (state) => {
      if (typeof window !== "undefined" && state.isReviewsBookmarksStateInit === false) {
        const data = localStorage.getItem(reviews_bookmarks_key);
        state.reviews_ids = data ? JSON.parse(data) : [];
      }
      state.isReviewsBookmarksStateInit = true;
    },
  },
});

export const { toggleReviewsBookmark, clearReviewsBookmarks, initReviewsBookmarks } = reviewsBookmarksSlice.actions;

// Селекторы
export const selectReviewsBookmarkIds = (state: { reviewsBookmarks: ReviewsBookmarksState }) =>
  state.reviewsBookmarks.reviews_ids;
export const selectReviewsBookmarksCount = (state: { reviewsBookmarks: ReviewsBookmarksState }) =>
  state.reviewsBookmarks.reviews_ids.length;
export const selectIsReviewsBookmarked = (state: { reviewsBookmarks: ReviewsBookmarksState }, id: string) =>
  state.reviewsBookmarks.reviews_ids.includes(id);
export const selectIsReviewsBookmarksStateInit = (state: { reviewsBookmarks: ReviewsBookmarksState }) =>
  state.reviewsBookmarks.isReviewsBookmarksStateInit;

export const reviewsBookmarksReducer = reviewsBookmarksSlice.reducer;
