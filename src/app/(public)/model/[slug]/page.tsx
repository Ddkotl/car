import { getModelFullInfoBySlug, ModelFullInfoType } from "@/entities/models/_actions/get_model_info_by_slug";
import { ModelLargeCard } from "@/entities/models/_ui/model_large_card";
import { NextAndPrevModelButtons } from "@/entities/models/_ui/prev_next_model_buttons";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { privateConfig } from "@/shared/lib/config/private";
import parse from "html-react-parser";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pageParams = await params;
  const model = await getModelFullInfoBySlug(pageParams.slug);

  return generateSEOMetadata({
    title: model?.full_name ? model?.full_name : "",
    description: `Характеристики и описание модели: ${model?.full_name}`,
    keywords: [
      `${model?.full_name}`,
      `${model?.short_name}`,
      `Характеристики ${model?.full_name}`,
      `Описание ${model?.full_name}`,
      "автомобили",
      "электоавтомобили",
      "электрокары",
      "новости",
      "гаджеты",
      "инновации",
    ],
    ogImage: `${model?.main_image}`,
    canonical: `${privateConfig.SAIT_URL}/model/${model?.slug}`,
  });
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const model: ModelFullInfoType = await getModelFullInfoBySlug(pageParams.slug);
  if (!model || model === null) {
    return <div className="text-center py-10 text-foreground">Не удалось получить информацию о модели</div>;
  }

  return (
    <main className="flex flex-col  flex-1 gap-2 lg:gap-6 ">
      <ModelLargeCard model={model} />

      {/* Раздел "Описание" */}
      <div className=" p-4 rounded-xl border bg-card text-card-foreground shadow-lg text-safe">
        <h2 className="text-2xl lg:text-3xl font-semibold ">Подробные характеристики</h2>
        <div className="prose ">
          {model.specifications[0].description
            ? parse(String(model.specifications[0].description))
            : "Описание отсутствует"}
        </div>
      </div>
      <NextAndPrevModelButtons currentModelSlug={pageParams.slug} brandId={model.car_brand_id} />
    </main>
  );
}
