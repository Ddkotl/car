import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { PostTypes } from "../../../../generated/prisma";

export function MiniPostCard({
  slug,
  title,
  previewImage,
  type,
}: {
  title: string;
  previewImage: string | null;
  slug: string;
  type: PostTypes;
}) {
  return (
    <Link href={`/${type.toLowerCase()}/${slug}`} className="w-full hover:scale-95 transition-all duration-300">
      <Card className="w-[140px] flex-shrink-0 p-0 gap-2">
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
export function SceletonMiniPostCard() {
  return (
    <Card className="w-[140px] flex-shrink-0 justify-center items-center p-0">
      <CardContent className=" p-0 w-full flex flex-col items-center justify-center">
        <Skeleton className="w-full h-24 mb-3" />
        <Skeleton className="w-32 h-3 mb-1" />
        <Skeleton className="w-32 h-3 mb-1" />
        <Skeleton className="w-32 h-3 mb-3" />
      </CardContent>
    </Card>
  );
}
