import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle, Skeleton } from "@/shared/components";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

export function PhoneModelLitleCard({
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
          " shadow-md transition-all border-none  duration-300 hover:scale-95  hover:shadow-lg hover:bg-foreground/10  p-0 h-full flex flex-row ",
          className,
        )}
      >
        <CardContent className="p-1 image-safe w-[30px] h-10">
          <Image
            src={modelMainImage}
            alt="картинка карточки"
            width={120}
            height={160}
            className="w-[30px] h-10 object-fill mx-auto rounded-md "
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

export function PhoneModelLitleCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("shadow-md border-none p-0 h-full flex flex-row  animate-pulse", className)}>
      <CardContent className="p-1 flex items-center justify-center">
        <Skeleton className="w-7 h-10 rounded-md " />
      </CardContent>
      <CardFooter className="flex justify-center p-1">
        <CardTitle className="text-xs lg:text-sm font-thin flex text-start items-center justify-center">
          <Skeleton className="w-16 h-4 " />
        </CardTitle>
      </CardFooter>
    </Card>
  );
}
