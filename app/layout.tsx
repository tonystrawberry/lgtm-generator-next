import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LGTM | The Best LGTM GIFs for Your Pull Requests",
  description:
    "Who needs words when you can have dancing penguins and sassy cats for approving your PRs?",
  openGraph: {
    title: 'LGTM | The Best LGTM GIFs for Your Pull Requests',
    description: 'Who needs words when you can have dancing penguins and sassy cats for approving your PRs?',
    url: 'https://lgtmarvelous.vercel.app/',
    siteName: 'lgtm.',
    images: [
      {
        url: 'https://d30lzxra6n3hkq.cloudfront.net/og/og-image.png',
        width: 500,
        height: 317,
        alt: 'lgtm.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
