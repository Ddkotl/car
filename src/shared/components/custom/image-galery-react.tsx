"use client";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { cn } from "@/shared/lib/utils";

export function ImageGalleryComponent({ imagePaths, className }: { imagePaths?: string[]; className?: string }) {
  const placeholder = "/placeholder.png"; // Путь к заглушке

  const images =
    imagePaths && imagePaths.length > 0
      ? imagePaths.map((path) => ({
          original: path,
          thumbnail: path, // Используем оригинал для миниатюр
        }))
      : [{ original: placeholder, thumbnail: placeholder }]; // Используем заглушку

  return (
    <div className={cn("w-full mx-auto", className)}>
      <ImageGallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={true}
        showThumbnails={true}
        slideDuration={400}
        showNav={false}
        additionalClass="responsive-gallery"
        thumbnailPosition="right"
      />
    </div>
  );
}
