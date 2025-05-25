"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  TimeAgo,
} from "@/shared/components";
import { NewsWithIncludes } from "../_domain/types";
import { FaBookmark, FaEye } from "react-icons/fa";

export default function NewsCard({
  news,

  prioryty,
}: {
  news: NewsWithIncludes;
  prioryty: boolean;
}) {
  return (
    <Card className="flex flex-col rounded-lg shadow-md  border bg-background/50 h-[500px] ">
      {/* Render preview image if available */}
      {news.previewImage && (
        <div className="relative  w-full h-40 ">
          <Image
            src={news.previewImage}
            alt="картинка карточки"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={prioryty ? true : undefined}
            className=" object-contain"
          />
        </div>
      )}
      <CardContent className="p-2 flex justify-between flex-col flex-auto">
        <CardHeader className="space-y-2 p-2">
          <Link href={`/news/${news.slug}`} className="hover:text-blue-600">
            <CardTitle className="text-lg md:text-xl font-semibold  line-clamp-2 cursor-pointer">
              {news.title}
            </CardTitle>
          </Link>
          <CardDescription className="text-foreground/50 line-clamp-6 h-[120px]">
            {news.meta_description}
          </CardDescription>
          <Separator className="my-2" />
        </CardHeader>
        <div className="flex flex-col gap-2 justify-between items-center">
          {/* Render tags */}
          <div className="flex flex-wrap items-center justify-center gap-1 h-[60px] overflow-hidden ">
            {news.tags.map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-sm h-7 truncate px-2">
                {tag.title}
              </Badge>
            ))}
          </div>
          {/* Render views count */}
          <div className="flex flex-col gap-4 text-sm text-foreground/50 w-full px-2">
            <div className="flex justify-center gap-10 items-center text-gray-700">
              <div className="flex items-center space-x-2">
                <FaEye className="text-blue-500" size={20} />
                <span>{news.views}</span>
              </div>

              <div className="flex items-center space-x-2">
                <FaBookmark className="text-yellow-500 " size={20} />
                <span>{news.bookmarksCount}</span>
              </div>
            </div>
            <div className="flex justify-between">
              Добавлено: <TimeAgo className="text-sm" date={news.createdAt} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
