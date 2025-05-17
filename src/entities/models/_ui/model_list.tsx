"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ModelCard, ModelCardSkeleton } from "./model_card";
import { getModelsListToInfinityScroll } from "../_actions/get_models_to_infinity_scroll";
import { Title } from "@/shared/components/custom/app-title";

export function ModelsList({ brandSlug, searchTerm }: { brandSlug: string; searchTerm?: string }) {
  const perPage = 36;
  const { ref, inView } = useInView();
  const {
    data: modelP,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["models", brandSlug, searchTerm],
    queryFn: (pageParam) => getModelsListToInfinityScroll(brandSlug, pageParam.pageParam, perPage, searchTerm),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length === perPage ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr ">
        {Array.from({ length: perPage }).map((_, i) => (
          <ModelCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
      {modelP?.pages.length && modelP.pages.some((page) => page.length) ? (
        modelP?.pages.map((models) => {
          return models.map((model, index) => {
            return <ModelCard key={model.id} model={model} innerRef={models.length === index + 1 ? ref : undefined} />;
          });
        })
      ) : (
        <Title size="md" text="Ничего не найдено" />
      )}
      {isFetchingNextPage && Array.from({ length: perPage }).map((_, i) => <ModelCardSkeleton key={i} />)}
    </div>
  );
}
