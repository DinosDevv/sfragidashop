import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toaster from "@/components/Toaster";
import { siteInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: siteInfo.name,
  description: siteInfo.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col bg-white text-gray-900">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
