import Script from "next/script";

interface GoogleAnalyticsProps {
  gaId: string;
}

export const GoogleAnalytics = ({ gaId }: GoogleAnalyticsProps) => {
  if (!gaId) return null;

  return (
    <>
      {/* Подключаем Google Tag Manager */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
};
