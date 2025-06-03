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
    <Link href={`/phone_model/${modelSlug}`}>
      <Card
        className={cn(
          " shadow-md transition-all border-none  duration-300 hover:scale-95  hover:shadow-lg hover:bg-foreground/10  p-0 h-full flex flex-row gap-1",
          className,
        )}
      >
        <CardContent className="p-1 image-safe w-[30px] h-10">
          <Image
            src={modelMainImage}
            alt="картинка карточки"
            width={100}
            height={70}
            className="w-18 h-10 object-fill mx-auto rounded-md "
          />
        </CardContent>
        <CardFooter className="flex justify-center p-1">
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
      <CardContent className="p-1 flex items-center justify-center">
        <Skeleton className="w-18 h-10 rounded-md " />
      </CardContent>
      <CardFooter className="flex justify-center p-1">
        <CardTitle className="text-xs lg:text-sm font-thin flex text-start items-center justify-center">
          <Skeleton className="w-16 h-4 " />
        </CardTitle>
      </CardFooter>
    </Card>
  );
}
