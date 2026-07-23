import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moar-router.com"),
  title: {
    default: "MOAR Router",
    template: "%s | MOAR Router",
  },
  description:
    "Cross-model context orchestration for AI. MOAR Router dynamically shares tokens, embeddings, and reasoning across models in real time — faster, cheaper, higher quality.",
  applicationName: "MOAR Router",
  keywords: [
    "AI router",
    "LLM router",
    "cross-model context orchestration",
    "multi-model inference",
    "MOAR Router",
  ],
  authors: [{ name: "MOAR Router" }],
  creator: "MOAR Router",
  publisher: "MOAR Router",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moar-router.com",
    siteName: "MOAR Router",
    title: "MOAR Router — Cross-Model Context Orchestration",
    description:
      "Cross-model context orchestration for AI. Share tokens, embeddings, and reasoning across models in real time. Welcome to MOAR.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MOAR Router — Cross-Model Context Orchestration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MOAR Router — Cross-Model Context Orchestration",
    description:
      "Cross-model context orchestration for AI. Share tokens, embeddings, and reasoning across models in real time. Welcome to MOAR.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixel.variable} h-full`}>
      <body className="min-h-full bg-black font-[family-name:var(--font-pixel)]">
        {children}
      </body>
    </html>
  );
}
