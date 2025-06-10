import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ClipCash",
  description: "Ganhe dinheiro assistindo vídeos",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <Script src="https://www.youtube.com/iframe_api" strategy="beforeInteractive" />
        
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1247128717128453');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1247128717128453&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        
        {/* Utmify Script */}
        <Script 
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck="true"
          data-utmify-prevent-subids="true"
          strategy="afterInteractive"
        />

        <script 
          type="text/javascript" 
          dangerouslySetInnerHTML={{
            __html: `
              var s=document.createElement("script");
              s.src="https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js";
              s.setAttribute("data-id", "68479b77ddec08ed47550ea8");
              s.async=!0;
              document.head.appendChild(s);
            `
          }}
        />
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background text-foreground">{children}</div>
          <Toaster richColors theme="system" />
        </ThemeProvider>
        <Script src="https://www.youtube.com/iframe_api" />
      </body>
    </html>
  )
}
