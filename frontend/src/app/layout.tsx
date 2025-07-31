import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import Providers from "@/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Mini CRM",
  description: "A simple mini CRM project built with Next.js 13+",
  keywords: "CRM, customers, contacts, sales, management",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={poppins.className} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
