import React from "react";
import { getSimilarModels } from "../_actions/get_similar_models";
import { PhoneModelLitleCard } from "./phone_litle_card";

export const SimilarModels = async ({ brandId }: { brandId: string }) => {
  const similarModels = await getSimilarModels(brandId);
  if (!similarModels || similarModels.length === 0) {
    return <p>Нет похожих моделей</p>;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xs lg:text-base font-semibold">{`Последние модели ${similarModels[0].brand?.name.toUpperCase()}`}</h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1 lg:gap-2">
        {similarModels.map((model) => (
          <PhoneModelLitleCard
            key={model.id}
            modelFullName={model.full_name}
            modelMainImage={model.main_image}
            modelSlug={model.slug}
          />
        ))}
      </div>
    </div>
  );
};
