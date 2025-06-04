"use client";

import { useQuery } from "@tanstack/react-query";
import { PostTypes, Tag } from "../../../../generated/prisma";
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

export function SomePosts({
  count,
  type,
  slug,
  tags,
}: {
  count: number;
  type: PostTypes;
  slug?: string;
  tags?: Tag[];
}) {
  const {
    data: latestPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["somePosts", count, type, slug],
    queryFn: () => getSomePosts({ count: count, type: type, slug: slug, tags: tags }),
  });

  if (isError) return <p>Ошибка загрузки новостей.</p>;
  if (latestPosts && latestPosts.length === 0) return <p>Нет новостей</p>;
  return (
    <section className="flex justify-center p-2">
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
                  <CarouselItem className="basis-1/8 min-w-[150px]" key={index}>
                    <SceletonMiniPostCard />
                  </CarouselItem>
                ))
              : latestPosts?.map((post) => (
                  <CarouselItem className="basis-1/8 min-w-[150px]" key={post.id}>
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
