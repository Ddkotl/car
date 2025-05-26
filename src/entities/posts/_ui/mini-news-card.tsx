import { Card, CardContent, Skeleton } from "@/shared/components";
import Image from "next/image";
import Link from "next/link";

export function MiniNewsCard({
  slug,
  title,
  previewImage,
}: {
  title: string;
  previewImage: string | null;
  slug: string;
}) {
  return (
    <Link href={`/news/${slug}`} className="w-full hover:scale-95 transition-all duration-300">
      <Card className="w-[140px] flex-shrink-0 ">
        <CardContent className="p-0 image-safe relative">
          <div className="aspect-[2/1.4] relative ">
            <Image
              src={previewImage || "/placeholder.png"}
              alt="картинка карточки"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-sm "
            />
          </div>
          <p className="text-xs font-thin line-clamp-3 m-2">{title}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
export function SceletonMiniNewsCard() {
  return (
    <Card className="w-[140px] flex-shrink-0 justify-center items-center">
      <CardContent className=" p-0 w-full flex flex-col items-center justify-center">
        <Skeleton className="w-full h-24 mb-3" />
        <Skeleton className="w-32 h-3 mb-1" />
        <Skeleton className="w-32 h-3 mb-1" />
        <Skeleton className="w-32 h-3 mb-3" />
      </CardContent>
    </Card>
  );
}
