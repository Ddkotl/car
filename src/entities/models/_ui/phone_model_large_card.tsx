import { Card, CardContent, CardHeader } from "@/shared/components";
import { PhoneModeLFullInfo } from "../_domain/types";
import {
  CalendarCheck2,
  Smartphone,
  Camera,
  Video,
  MemoryStick,
  Microchip,
  Cpu,
  Battery,
  Weight,
  Ruler,
} from "lucide-react";
import { ModelSpecItem } from "./model_spec_item";
import { ImageGalleryComponent } from "@/shared/components/custom/image-galery-react";

export function PhoneModelLargeCard({ phone }: { phone: PhoneModeLFullInfo }) {
  const images = phone.specifications[0].images;
  images.unshift(phone.main_image);
  return (
    <Card className="p-2 bg-card shadow-lg rounded-2xl">
      <CardHeader className="flex flex-col items-start text-center p-1">
        <h1 className="text-2xl font-bold text-foreground/80">{phone.full_name.toUpperCase()}</h1>
      </CardHeader>

      <CardContent className="p-1">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full lg:gap-4">
          <ImageGalleryComponent imagePaths={images} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 md:gap-4 w-full ">
            <ModelSpecItem
              icon={<CalendarCheck2 size={20} />}
              title="Дата релиза"
              value={`${phone.specifications[0].releaseDate}`}
            />
            <ModelSpecItem
              icon={<Smartphone size={20} />}
              title="Экран(дюймы)"
              value={`${phone.specifications[0].screen_duim ? phone.specifications[0].screen_duim + '"' : ""}`}
            />
            <ModelSpecItem
              icon={<Smartphone size={20} />}
              title="Экран(пиксели)"
              value={`${phone.specifications[0].screen_px}`}
            />
            <ModelSpecItem
              icon={<Camera size={20} />}
              title="Камера(фото)"
              value={`${phone.specifications[0].camera_photo}`}
            />
            <ModelSpecItem
              icon={<Video size={20} />}
              title="Камера(видео)"
              value={`${phone.specifications[0].camera_video}`}
            />
            <ModelSpecItem
              icon={<MemoryStick size={20} />}
              title="Память(ПЗУ)"
              value={`${phone.specifications[0].storage || phone.specifications[0].storage === " " ? phone.specifications[0].storage : "-"}`}
            />
            <ModelSpecItem icon={<Microchip size={20} />} title="Система" value={`${phone.specifications[0].oc}`} />
            <ModelSpecItem
              icon={<MemoryStick size={20} />}
              title="Память(ОЗУ)"
              value={`${phone.specifications[0].ram ? phone.specifications[0].ram : "-"}`}
            />
            <ModelSpecItem icon={<Cpu size={20} />} title="Процессор" value={phone.specifications[0].processor} />
            <ModelSpecItem
              icon={<Battery size={20} />}
              title="Батарея"
              value={`${phone.specifications[0].batary_capasity} `}
            />
            <ModelSpecItem icon={<Weight size={20} />} title="Вес" value={`${phone.specifications[0].weight} г`} />
            <ModelSpecItem
              icon={<Ruler size={20} />}
              title="Толщина"
              value={`${phone.specifications[0].thickness} мм`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
