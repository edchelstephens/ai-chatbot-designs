import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sherlock AI - AI Chatbot",
  description: "Ask anything with Sherlock AI assistant",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sherlock AI",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/android/android-launchericon-192-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/android/android-launchericon-512-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/images/ios/180.png", sizes: "180x180", type: "image/png" },
      { url: "/images/ios/152.png", sizes: "152x152", type: "image/png" },
      { url: "/images/ios/120.png", sizes: "120x120", type: "image/png" },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="dark-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('darkMode');
                  if (saved !== null) {
                    if (saved === 'true') {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } else {
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
