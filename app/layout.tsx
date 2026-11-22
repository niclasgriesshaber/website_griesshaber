import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_NAME, OG_IMAGE } from "../lib/metadata";
import "./globals.css";

const DESCRIPTION =
  "Researcher at the University of Oxford working on AI for History and Economic History";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://niclasgriesshaber.com"),
  title: SITE_NAME,
  description: DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
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
