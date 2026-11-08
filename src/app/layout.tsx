import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FitlogProvider } from "@/context/FitlogContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700", "800"] });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["700"] });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="flex min-h-screen flex-col">
        <FitlogProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </FitlogProvider>
      </body>
    </html>
  );
}
