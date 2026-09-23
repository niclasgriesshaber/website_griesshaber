import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_NAME, OG_IMAGE } from "../lib/metadata";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://niclasgriesshaber.com"),
  title: SITE_NAME,
  description: "AI for History",
  openGraph: {
    title: SITE_NAME,
    description: "AI for History",
    url: "/",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "AI for History",
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [
      {
        url: '/favicon.png?v=3.0',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/favicon.ico?v=3.0',
        sizes: '16x16',
        type: 'image/x-icon'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
