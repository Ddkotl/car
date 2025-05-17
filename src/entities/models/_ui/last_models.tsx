"use client";
import React from "react";
import { PhoneModelLitleCard, PhoneModelLitleCardSkeleton } from "./phone_litle_card";
import { getLastModels } from "../_actions/get_last_models";
import { useQuery } from "@tanstack/react-query";
import { Title } from "@/shared/components";

export function LastModels({ count }: { count: number }) {
  const {
    data: models,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["models", count],
    queryFn: () => getLastModels(count),
  });
  if (isError) {
    return <div>Ошибка загрузки популярных тэгов </div>;
  }

  return (
    <section className="space-y-2">
      <Title size="md" text="Последние модели на сайте"></Title>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1 lg:gap-2">
        {isLoading
          ? Array.from({ length: count }).map((_, index) => <PhoneModelLitleCardSkeleton key={index} />)
          : models?.map((model) => (
              <PhoneModelLitleCard
                key={model.id}
                modelFullName={model.full_name}
                modelMainImage={model.main_image}
                modelSlug={model.slug}
              />
            ))}
      </div>
    </section>
  );
}
