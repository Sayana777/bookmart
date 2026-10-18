import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "BookMart",
  description: "Programming болон web development номын онлайн дэлгүүр (demo)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <body>
        <Providers>
          <Header />
          <main className="wrap">{children}</main>
          <footer className="site-footer wrap">© 2026 BookMart. Next.js + TypeScript сургалтын demo.</footer>
        </Providers>
      </body>
    </html>
  );
}
