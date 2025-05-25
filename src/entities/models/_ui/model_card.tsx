import Link from "next/link";
import Image from "next/image";
import { CarsModels } from "../../../../generated/prisma";
import { Card, CardContent, CardFooter, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function ModelCard({
  model,
  innerRef,
}: {
  model: CarsModels;
  innerRef?: (node?: Element | null | undefined) => void;
}) {
  return (
    <Link href={`/model/${model.slug}`} ref={innerRef}>
      <Card className=" shadow-md transition-all  duration-300 hover:scale-95  hover:shadow-lg hover:bg-foreground/10  p-0 h-full flex flex-col gap-2 ">
        <CardContent className="p-1 image-safe">
          <Image
            src={model.main_image}
            alt="картинка карточки"
            width={96}
            height={56}
            className="w-24 h-14 object-fill mx-auto rounded-md"
            priority={false}
            loading="lazy"
          />
        </CardContent>
        <CardFooter className="flex justify-center p-1">
          <h2 className="text-xs flex text-center items-center justify-center">{model.short_name}</h2>
        </CardFooter>
      </Card>
    </Link>
  );
}
export function ModelCardSkeleton() {
  return (
    <Card className=" shadow-md transition-all  duration-300 hover:scale-95  hover:shadow-lg hover:bg-foreground/10  p-0 h-full flex flex-col gap-2">
      <CardContent className="p-1 ">
        <Skeleton className="w-24 h-14 mx-auto rounded-md object-fill " style={{ aspectRatio: "96/56" }} />
      </CardContent>

      <CardFooter className="flex justify-center p-1">
        <CardTitle className="text-xs text-center w-full">
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </CardTitle>
      </CardFooter>
    </Card>
  );
}
