"use client";

import { useQuery } from "@tanstack/react-query";
import { PostTypes } from "../../../../generated/prisma";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { MiniPostCard, SceletonMiniPostCard } from "./mini_post_card";
import { getSomePosts } from "../_actons/get_some_posts";

export function SomePosts({ count, type }: { count: number; type: PostTypes }) {
  const {
    data: latestPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["somePosts", count, type],
    queryFn: () => getSomePosts({ count: count, type: type }),
  });

  if (isError) return <p>Ошибка загрузки новостей.</p>;
  if (latestPosts && latestPosts.length === 0) return <p>Нет новостей</p>;
  return (
    <section className="flex justify-center ">
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
                    <SceletonMiniPostCard />
                  </CarouselItem>
                ))
              : latestPosts?.map((post) => (
                  <CarouselItem className="basis-1/8" key={post.id}>
                    <MiniPostCard title={post.title} previewImage={post.preview_image} slug={post.slug} type={type} />
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
