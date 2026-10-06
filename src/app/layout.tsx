import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/CyberBackground";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-cyber",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSI Portes Ouvertes 2026 — Mini CTF",
  description:
    "Découvre la cybersécurité avec le Mini CTF du Club Scientifique Informatique (CSI) lors des Portes Ouvertes 2026. Édition spéciale Octobre Rose.",
  keywords: [
    "CTF",
    "CSI",
    "Club Scientifique Informatique",
    "Cybersécurité",
    "Portes Ouvertes 2026",
    "Octobre Rose",
    "Base64",
    "Source Code",
  ],
  authors: [{ name: "Club Scientifique Informatique (CSI)" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#08090D] text-[#F8F8FA] selection:bg-[#E91E63] selection:text-white relative">
        {/* Animated Cyber Ambient Particle Grid Background */}
        <CyberBackground />

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Cyber Footer */}
        <footer className="relative z-10 border-t border-[#23273A] bg-[#0c0d14]/90 backdrop-blur-md py-8 mt-auto text-xs text-zinc-400 font-mono">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E91E63] shadow-[0_0_8px_#E91E63]" />
              <span className="text-zinc-300 font-bold">CSI</span>
              <span>— Club Scientifique Informatique • Portes Ouvertes 2026</span>
            </div>

            <div className="flex items-center gap-3 text-zinc-400">
              <span className="text-[#FF6F9C]">🌸 Octobre Rose</span>
              <span>•</span>
              <span>Plateforme d&apos;initiation L1</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
