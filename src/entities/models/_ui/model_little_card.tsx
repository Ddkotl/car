import Link from "next/link";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent, CardFooter, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function ModelLitleCard({
  modelSlug,
  modelMainImage,
  modelFullName,
  className,
}: {
  modelSlug: string;
  modelMainImage: string;
  modelFullName: string;
  className?: string;
}) {
  return (
    <Link href={`/model/${modelSlug}`}>
      <Card
        className={cn(
          " shadow-none transition-all border-none  duration-300 hover:scale-95  hover:shadow-lg hover:bg-foreground/10  p-1 h-full flex flex-row gap-6",
          className,
        )}
      >
        <CardContent className=" p-0 image-safe">
          <Image
            src={modelMainImage}
            alt="картинка модели"
            width={96}
            height={56}
            className="min-w-24 h-14 rounded-xl object-contain mx-auto"
          />
        </CardContent>
        <CardFooter className="flex justify-center p-0">
          <CardTitle className="text-xs lg:text-sm font-thin flex text-start items-center justify-center line-clamp-2 ">
            {modelFullName}
          </CardTitle>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function ModelLitleCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("gap-1 shadow-md border-none p-0 h-full flex flex-row", className)}>
      <CardContent className="p-0 flex items-center justify-center">
        <Skeleton className="w-24 h-14 rounded-xl " />
      </CardContent>
      <CardFooter className="flex justify-center p-0">
        <CardTitle className="  gap-2 text-xs items-center justify-center">
          <Skeleton className="w-30 h-4 " />
        </CardTitle>
      </CardFooter>
    </Card>
  );
}
