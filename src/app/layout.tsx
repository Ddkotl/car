import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { privateConfig } from "@/shared/lib/config/private";
import { AppProvider } from "./_providers/app-provider";
import { ScrollToTopButton } from "@/shared/components/custom/scroll_to_top";
import { GoogleAnalytics } from "@/features/seo/google-analitic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${privateConfig.SAIT_NAME}`,
    template: `%s | ${privateConfig.SAIT_NAME}`,
  },
  description: "Обзоры, свежие новости и полезные советы для пользователей современных автомобилей.",
  keywords: "автомобили, электоавтомобили, электрокары, новости, гаджеты, инновации",
  metadataBase: new URL(`${privateConfig.SAIT_URL}`),
  openGraph: {
    title: `${privateConfig.SAIT_NAME} - Обзоры авто и новости технологий`,
    description: "Обзоры, свежие новости и полезные советы для пользователей современных автомобилей.",
    url: `${privateConfig.SAIT_URL}`,
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/img/logo_opengraf.jpg",
        width: 1200,
        height: 630,
        alt: `${privateConfig.SAIT_NAME} - Логотип`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" dir="ltr" suppressHydrationWarning className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}  antialiased h-full relative`}>
        <AppProvider>{children}</AppProvider>
        <ScrollToTopButton />
        <GoogleAnalytics gaId={privateConfig.GOOGLE_ANALITICS_4_ID || ""} />
      </body>
    </html>
  );
}
