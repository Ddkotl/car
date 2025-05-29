import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components/custom/app-title";
import Hero from "@/shared/components/custom/hero";
import { Button } from "@/shared/components/ui/button";
import { privateConfig } from "@/shared/lib/config/private";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generateSEOMetadata({
  title: "Главная",
  description: "Получите последние обзоры и новости электроавтомобилей, а также советы по их выбору",
  keywords: ["автомобили", "электоавтомобили", "электрокары", "новости", "гаджеты", "инновации"],
  ogImage: "/logo_opengraf.jpg",
  canonical: `${privateConfig.SAIT_URL}`,
});

export default async function Home() {
  return (
    <main className="flex flex-col flex-1   gap-2 md:gap-4">
      <Hero />
      <div className="flex flex-row gap-4  justify-between items-center ">
        <Title size="lg" text="Последние новости" />
        <Link href={"/news"}>
          <Button variant="outline">Все новости</Button>
        </Link>
      </div>
      {/* <LatestNews count={20} /> */}
      <div className="flex flex-row gap-4  justify-between items-center ">
        <Title size="lg" text="Популярные обзоры" />
        <Link href={"/reviews"}>
          <Button variant="outline">Все обзоры</Button>
        </Link>
      </div>
      {/* <LatestReviews count={20} /> */}
    </main>
  );
}
