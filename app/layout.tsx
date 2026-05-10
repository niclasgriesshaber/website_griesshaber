import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://niclasgriesshaber.com"),
  title: "Niclas Griesshaber",
  description: "AI for History",
  openGraph: {
    title: "Niclas Griesshaber",
    description: "AI for History",
    url: "/",
    siteName: "Niclas Griesshaber",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Niclas Griesshaber",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niclas Griesshaber",
    description: "AI for History",
    images: ["/og-image.jpg"],
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
      <body className={`${inter.className} bg-white`}>{children}</body>
    </html>
  );
}
