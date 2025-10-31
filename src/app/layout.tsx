import { Inter } from "next/font/google";
import { Header } from "@/app/_components/layout/Header";

import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-initialization"
          src="/init-theme.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`px-14 bg-background ${inter.className} antialiased`}>
        <Header />

        {children}
      </body>
    </html>
  );
}
