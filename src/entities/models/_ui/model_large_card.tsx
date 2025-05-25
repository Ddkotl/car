import { ModelSpecItem } from "./model_spec_item";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { ImageGalleryComponent } from "@/shared/components/custom/image-galery-react";
import { AudioWaveform, BatteryMedium, ChevronsUp, LifeBuoy, Zap } from "lucide-react";
import { ModelFullInfoType } from "../_actions/get_model_info_by_slug";

export function ModelLargeCard({ model }: { model: NonNullable<ModelFullInfoType> }) {
  const images = model.specifications[0].images;
  images.unshift(model.main_image);
  return (
    <Card className="p-0 bg-card shadow-lg rounded-2xl">
      <CardHeader className="flex flex-col items-start text-center p-1">
        <h1 className="text-2xl font-bold text-foreground/80">{model.full_name.toUpperCase()}</h1>
      </CardHeader>

      <CardContent className="p-1">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full lg:gap-4">
          <ImageGalleryComponent imagePaths={images} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:gap-4 w-full ">
            <ModelSpecItem icon={<Zap size={20} />} title="Мощность" value={`${model.specifications[0].power}`} />
            <ModelSpecItem
              icon={<LifeBuoy size={20} />}
              title="Привод"
              value={`${model.specifications[0].drivetype}`}
            />
            <ModelSpecItem
              icon={<ChevronsUp size={20} />}
              title="0-100 км/ч"
              value={`${model.specifications[0].acceleration} сек`}
            />
            <ModelSpecItem
              icon={<BatteryMedium size={20} />}
              title="Батарея"
              value={`${model.specifications[0].battery_capacity}`}
            />
            <ModelSpecItem
              icon={<AudioWaveform size={20} />}
              title="Диапазон WLTP"
              value={`${model.specifications[0].range}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
