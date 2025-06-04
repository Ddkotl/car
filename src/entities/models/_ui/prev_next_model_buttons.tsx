"use client";
import { NavigationButton, NavigationButtonSkeleton } from "@/entities/models/_ui/navigation_button";
import { getNextAndPrevModelsInfo } from "../_actions/get_next_prev_model";
import { useQuery } from "@tanstack/react-query";

export function NextAndPrevModelButtons({ currentModelSlug, brandId }: { currentModelSlug: string; brandId: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["model_prev_next", currentModelSlug, brandId],
    queryFn: () => getNextAndPrevModelsInfo(currentModelSlug, brandId),
  });

  if (isError) {
    return <div className="text-foreground">{``}</div>;
  }
  if (isLoading) {
    return (
      <div className="flex justify-between gap-2 lg:gap-4">
        <NavigationButtonSkeleton direction="prev" />
        <NavigationButtonSkeleton direction="next" />
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-2 lg:gap-4">
      {data?.next_slug && (
        <NavigationButton
          slug={data?.next_slug || ""}
          image={data?.next_main_image || ""}
          text={data?.next_full_name || ""}
          direction="next"
          className="mr-auto"
        />
      )}
      {data?.prev_slug && (
        <NavigationButton
          slug={data?.prev_slug || ""}
          image={data?.prev_main_image || ""}
          text={data?.prev_full_name || ""}
          direction="prev"
          className="ml-auto"
        />
      )}
    </div>
  );
}
