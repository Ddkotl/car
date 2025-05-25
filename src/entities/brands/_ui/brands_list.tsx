"use client";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBrandsListWithModelsCount } from "../_actions/get_brands_to_infinity_scroll";
import { useEffect } from "react";
import { BrandWithModelsCount } from "../_domain/types";
import { BrandCard, BrandCardSkeleton } from "./brand_card";
import { Title } from "@/shared/components/custom/app-title";

export function BrandList({ searchTerm }: { searchTerm?: string }) {
  const perPage = 36;
  const { ref, inView } = useInView();
  const {
    data: brandsP,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["brands", searchTerm],
    queryFn: (pageParam) => getBrandsListWithModelsCount(pageParam.pageParam, perPage, searchTerm),
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
          <BrandCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
      {brandsP?.pages.length && brandsP.pages.some((page) => page.length) ? (
        brandsP?.pages.map((brands: BrandWithModelsCount[]) => {
          return brands.map((brand, index) => {
            return (
              <div key={brand.id}>
                <BrandCard
                  brandSlug={brand.slug}
                  brandName={brand.name}
                  brandCountCars={brand._count.car_models}
                  innerRef={brands.length === index + 1 ? ref : undefined}
                />
              </div>
            );
          });
        })
      ) : (
        <Title size="md" text="Ничего не найдено" />
      )}
      {isFetchingNextPage && Array.from({ length: perPage }).map((_, i) => <BrandCardSkeleton key={i} />)}
    </div>
  );
}
