"use client";

import { useQuery } from "@tanstack/react-query";
import { getLatestNews } from "../_actons/get_latest_news";
import { PartialNews } from "../_domain/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components";
import Autoplay from "embla-carousel-autoplay";
import { MiniNewsCard, SceletonMiniNewsCard } from "./mini-news-card";

export function LatestNews({ count }: { count: number }) {
  const {
    data: latestNews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestNews", count],
    queryFn: () => getLatestNews({ count: count }),
  });

  if (isError) return <p>Ошибка загрузки новостей.</p>;
  if (latestNews && latestNews.length === 0) return <p>Нет новостей</p>;
  return (
    <section className="flex justify-center flex-shrink ">
      <div className="flex max-w-[80%] md:max-w-[400px] md1:max-w-[450px] md2:max-w-[500px] lg:max-w-[600px] xl:max-w-[750px] gap-2 lg:gap-4">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent>
            {isLoading
              ? Array.from({ length: count }).map((_, index) => (
                  <CarouselItem className="basis-1/8" key={index}>
                    <SceletonMiniNewsCard />
                  </CarouselItem>
                ))
              : latestNews?.map((singleNews: PartialNews) => (
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
