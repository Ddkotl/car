"use client";
import { useQuery } from "@tanstack/react-query";
import { TagBage, TagBageSkeleton } from "./tag_bage";
import { getPopularTags } from "../_actions/get_popular_tags";
import { Badge, Title } from "@/shared/components";
import Link from "next/link";

export function PopularTags({ count }: { count: number }): JSX.Element {
  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular_tags", count],
    queryFn: () => getPopularTags(count),
  });
  if (isError) {
    return <div>Ошибка загрузки популярных тэгов </div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <Title size="md" text="Популярные тэги" />
      <div className="flex flex-wrap gap-2   ">
        {isLoading
          ? Array.from({ length: count }).map((_, i) => <TagBageSkeleton key={i} />)
          : tags?.map((tag) => <TagBage key={tag.id} slug={tag.slug} title={tag.title}></TagBage>)}
        {!isLoading && (
          <Badge className="h-6 transition-colors duration-300 hover:scale-95 text-xs font-medium px-2 py-1 z-40">
            <Link href="/tags">все тэги</Link>
          </Badge>
        )}
      </div>
    </div>
  );
}
