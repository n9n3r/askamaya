import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Askamaya — The Menu",
  description:
    "A Menu for Askamaya.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black antialiased selection:bg-white/15">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
