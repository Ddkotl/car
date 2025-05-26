"use client";

import { useQuery } from "@tanstack/react-query";
import { PartialNews } from "../_domain/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components";
import Autoplay from "embla-carousel-autoplay";
import { MiniNewsCard, SceletonMiniNewsCard } from "./mini-news-card";
import { getSimilarNews } from "../_actons/get-similar-news";

export function SimilarNews({ slug }: { slug: string }) {
  const {
    data: similarNews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["similarNews", slug],
    queryFn: () => getSimilarNews(slug),
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  });

  if (isError) return <p>Ошибка загрузки новостей.</p>;
  if (similarNews && similarNews.length === 0) return <p>Нет новостей</p>;
  return (
    <section className="flex justify-center">
      <div className="flex max-w-[80%] md:max-w-[400px] lg:max-w-[600px] xl:max-w-[750px] gap-2 lg:gap-4">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem className="basis-1/8" key={index}>
                    <SceletonMiniNewsCard />
                  </CarouselItem>
                ))
              : similarNews.map((singleNews: PartialNews) => (
                  <CarouselItem className="basis-1/8" key={singleNews.id}>
                    <MiniNewsCard
                      title={singleNews.title}
                      previewImage={singleNews.previewImage}
                      slug={singleNews.slug}
                    />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
