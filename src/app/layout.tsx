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
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <Script
          id="theme-initialization"
          src="/init-theme.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className="bg-foreground text-background dark:bg-background dark:text-foreground px-14"
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />

        {children}
      </body>
    </html>
  );
}
