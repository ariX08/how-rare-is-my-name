import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "How Rare Is My Name?",
  description: "Discover the story behind your name. Explore rarity, origin, popularity, and more.",
  openGraph: {
    title: "How Rare Is My Name?",
    description: "Discover the story behind your name.",
    type: "website",
    siteName: "How Rare Is My Name?",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Rare Is My Name?",
    description: "Discover the story behind your name.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
