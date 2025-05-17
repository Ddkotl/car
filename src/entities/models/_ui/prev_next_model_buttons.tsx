"use client";
import { NavigationButton } from "@/shared/components/custom/navigation_button";
import { getNextAndPrevModelsInfo } from "../_actions/get_next_prev_model";
import { useQuery } from "@tanstack/react-query";

export function NextAndPrevModelButtons({ currentModelSlug, brandId }: { currentModelSlug: string; brandId: string }) {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["phone_model_prev_next", currentModelSlug, brandId],
    queryFn: () => getNextAndPrevModelsInfo(currentModelSlug, brandId),
  });

  if (isError) {
    return <div className="text-foreground">{`Error ${error}`}</div>;
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
          isLoading={isLoading}
        />
      )}
      {data?.prev_slug && (
        <NavigationButton
          slug={data?.prev_slug || ""}
          image={data?.prev_main_image || ""}
          text={data?.prev_full_name || ""}
          direction="prev"
          className="ml-auto"
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
