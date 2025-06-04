import { BookmarksTabs } from "@/entities/bookmark/_ui/bookmarks_tabs";
import { CleareBookmarksButton } from "@/features/bookmarks/ui/clear_bookmark_button";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components/custom/app-title";
import { Metadata } from "next";
export const metadata: Metadata = generateSEOMetadata({
  title: "Закладки",
  description: "Закладки пользователя",
});
export default async function BookmarksPage() {
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex flex-row justify-between items-center">
        <Title size="xl" text={`Все ваши закладки:`} />
        <CleareBookmarksButton />
      </div>

      <BookmarksTabs />
    </main>
  );
}
