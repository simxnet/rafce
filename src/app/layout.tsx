import type { Metadata } from "next";
import { Inter as Font } from "next/font/google";
import Providers from "@/components/providers";

import '@radix-ui/themes/styles.css';
import './theme-config.css';

const font = Font({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-1',
});

export const metadata: Metadata = {
  title: "RFCE (RAFCE)",
  description: "Reliable and fast code executor, run code everywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
