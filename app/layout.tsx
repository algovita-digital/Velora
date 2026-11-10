import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Display, Manrope } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import "../app/globals.css";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velora",
  description:
    "Relaxed denim, linen and printed shirts, and heavyweight tees in pre-washed fabrics. Free shipping on orders above ₹1,999.",
  icons: {
    icon: "/images/image.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#121C33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
