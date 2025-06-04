"use client";

import { useQuery } from "@tanstack/react-query";
import { getLastModels } from "../_actions/get_last_models";
import { Title } from "@/shared/components/custom/app-title";
import { ModelLitleCard, ModelLitleCardSkeleton } from "./model_little_card";

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
    return <div>Ошибка загрузки последних моделей </div>;
  }

  return (
    <section className="space-y-2">
      <Title size="md" text="Последние модели на сайте"></Title>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-1 lg:gap-2">
        {isLoading
          ? Array.from({ length: count }).map((_, index) => <ModelLitleCardSkeleton key={index} />)
          : models?.map((model) => (
              <ModelLitleCard
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
