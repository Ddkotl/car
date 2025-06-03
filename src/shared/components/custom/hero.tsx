import Image from "next/image";
import { Title } from "./app-title";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full rounded-md ">
      <div className="flex  lg:flex-row gap-2">
        <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-xl ">
          <Image src="/logo_opengraf.jpg" alt="Последние смартфоны и гаджеты" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/0 lg:p-6 p-2">
            <div className="absolute bottom-2 left-2 right-2 lg:bottom-4 lg:left-4 lg:right-4">
              <div>
                <Title size="xl" text="Новости и обзоры электромобилей" className="text-start" />
                <p className="md:text-sm text-xs text-muted-foreground">
                  Актуальная информация о новинках мира технологий, подробные обзоры электроавтомобилей от экспертов.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" grid grid-cols-1 xs1:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-2 w-full xs1:max-w-full  max-w-20 ">
          <Card title="Новости" href="/news" imageSrc="/news.jpg" />
          <Card title="Обзоры" href="/reviews" imageSrc="/reviews.jpg" />
          <Card title="Бренды" href="/brands" imageSrc="/brands.jpg" />
          <Card title="Тэги" href="/tags" imageSrc="/tags.jpg" />
        </div>
      </div>
    </section>
  );
}

const Card = ({
  title,
  href,
  imageSrc,
  aspectRatio = "1/1",
  size = "sm",
}: {
  title: string;
  href: string;
  imageSrc: string;
  aspectRatio?: string;
  size?: "sm" | "lg";
}) => (
  <Link
    href={href}
    className="hover:scale-[0.97] transition-transform duration-200 ease-in-out block xs1:max-w-full   max-w-28"
  >
    <div className={`relative w-full overflow-hidden rounded-lg ${size === "lg" ? "lg:rounded-xl" : ""}`}>
      <div style={{ aspectRatio }} className="relative w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes={size === "lg" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/0 p-2 lg:p-4">
          <div className="absolute bottom-2 left-2 right-2 lg:bottom-4 lg:left-4 lg:right-4">
            <p
              className={`text-center ${
                size === "lg" ? "text-lg lg:text-xl" : "text-sm lg:text-base"
              } font-medium text-foreground`}
            >
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Link>
);
