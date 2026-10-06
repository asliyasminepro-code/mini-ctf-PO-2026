"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Search,
  KeyRound,
  Trophy,
  HeartHandshake,
} from "lucide-react";
import TerminalText from "./TerminalText";
import { cyberAudio } from "@/lib/sound";

export default function Hero() {
  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges: CSI Portes Ouvertes 2026 + Octobre Rose */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121420] border border-[#E91E63]/40 shadow-[0_0_15px_rgba(233,30,99,0.25)] text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6F9C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E91E63]" />
            </span>
            <span className="text-zinc-300">CSI</span>
            <span className="text-zinc-500">•</span>
            <span className="text-[#FF6F9C] font-semibold tracking-wider">PORTES OUVERTES 2026</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#E91E63]/20 to-[#7C3AED]/20 border border-[#E91E63]/30 text-xs font-mono text-[#FF6F9C]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#FF6F9C]" />
            <span>Édition Spéciale Octobre Rose</span>
          </div>
        </div>

        {/* Main Title & Hero Heading */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="relative inline-block mb-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase select-none">
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
                MINI
              </span>{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF2A7A] via-[#FF6F9C] to-[#C084FC] drop-shadow-[0_0_35px_rgba(233,30,99,0.6)]">
                CTF
              </span>
            </h1>

            {/* Glowing cyber underline accent */}
            <div className="h-1 w-36 sm:w-48 mx-auto mt-2 rounded-full bg-gradient-to-r from-transparent via-[#E91E63] to-transparent shadow-[0_0_12px_#E91E63]" />
          </div>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed mt-4">
            <span className="text-[#FF6F9C] font-medium">Découvre la cybersécurité.</span>{" "}
            Trouve les flags. <span className="text-white font-medium">Relève les défis.</span>
          </p>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-3">
            Conçu pour les étudiants de L1 et les débutants curieux • Aucune expérience requise
          </p>
        </div>

        {/* Terminal Sequence & Interactive Preview */}
        <div className="max-w-2xl mx-auto mb-12">
          <TerminalText />
        </div>

        {/* Action Button & Stats */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Link
            href="/challenges"
            onClick={() => cyberAudio?.playClick()}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-white transition-all duration-300 bg-gradient-to-r from-[#E91E63] via-[#FF2A7A] to-[#7C3AED] hover:shadow-[0_0_35px_rgba(233,30,99,0.7)] hover:scale-[1.03] active:scale-[0.98] border border-[#FF6F9C]/50"
          >
            <Sparkles className="w-5 h-5 text-white/90 animate-spin" style={{ animationDuration: "6s" }} />
            <span>COMMENCER LA MISSION</span>
            <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
          </Link>

          <p className="text-xs font-mono text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            2 challenges disponibles • Niveau débutant • 200 PTS max
          </p>
        </div>

        {/* October Rose Cyber Abstract Graphic & 3-Step Mission Breakdown */}
        <div className="mt-20 pt-12 border-t border-zinc-800/80">
          <div className="text-center mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#FF6F9C] font-semibold mb-1">
              COMMENT ÇA FONCTIONNE ?
            </h2>
            <p className="text-sm text-zinc-400">
              Un aperçu simple en 3 étapes pour réussir vos premières captures de drapeaux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-[#101118]/80 border border-zinc-800 hover:border-[#E91E63]/40 transition-all group backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-[#E91E63]/10 border border-[#E91E63]/30 flex items-center justify-center text-[#FF6F9C] mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-[#FF6F9C] font-semibold mb-1">ÉTAPE 01</div>
              <h3 className="text-base font-bold text-white mb-2">Inspecter & Chercher</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Explore le code source de la page web ou analyse un message encodé pour débusquer l&apos;indice caché.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-[#101118]/80 border border-zinc-800 hover:border-[#7C3AED]/40 transition-all group backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30 flex items-center justify-center text-[#A78BFA] mb-4 group-hover:scale-110 transition-transform">
                <KeyRound className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-[#A78BFA] font-semibold mb-1">ÉTAPE 02</div>
              <h3 className="text-base font-bold text-white mb-2">Trouver le Flag</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Le secret prend toujours la forme <code className="text-[#FF6F9C] font-mono font-semibold">FLAG&#123;...&#125;</code>. C&apos;est votre trophée numérique.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-[#101118]/80 border border-zinc-800 hover:border-emerald-500/40 transition-all group backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-emerald-400 font-semibold mb-1">ÉTAPE 03</div>
              <h3 className="text-base font-bold text-white mb-2">Valider & Marquer</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Soumets le flag sur la plateforme pour débloquer +100 points et valider votre première victoire cyber !
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
