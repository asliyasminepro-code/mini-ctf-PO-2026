import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Code,
  ArrowLeft,
  Search,
  Info,
  Eye,
} from "lucide-react";
import { getChallengeBySlug } from "@/data/challenges";
import FlagInput from "@/components/FlagInput";
import HintSystem from "@/components/HintSystem";

export const metadata = {
  title: "01 — SOURCE: SECRET | Mini CTF CSI",
  description: "Mission 01 : Retrouve le flag caché dans le code source de la page.",
};

export default function SourceCodeChallengePage() {
  const challenge = getChallengeBySlug("source-code");

  if (!challenge) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-8">
      {/* 
        CRITICAL CTF REQUIREMENT: The secret flag is embedded below in an actual HTML comment.
        Inspect the page elements / source to discover it!
      */}
      <div
        dangerouslySetInnerHTML={{
          __html: "<!-- FLAG{CSI_SOURCE_CODE} -->\n<!-- Indice pour les curieux : Bien joué, tu as trouvé le premier flag ! Copie-le et valide la mission ci-dessous. -->",
        }}
      />

      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between gap-4 font-mono text-xs">
        <Link
          href="/challenges"
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-[#FF6F9C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Toutes les missions</span>
        </Link>

        <div className="flex items-center gap-2 text-zinc-400">
          <span>MISSION</span>
          <span className="text-white font-bold">{challenge.number}</span>
          <span>/</span>
          <span>02</span>
        </div>
      </div>

      {/* Main Mission Header Panel */}
      <div className="relative rounded-3xl bg-[#101118] border border-[#23273A] p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
        {/* Top Glowing Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-[#E91E63] to-[#7C3AED]" />

        {/* Scanlines inside container */}
        <div className="absolute inset-0 cyber-scanlines opacity-10 pointer-events-none" />

        {/* Mission Metadata Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl sm:text-4xl font-black font-mono text-zinc-600">
              {challenge.number}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#161826] border border-zinc-800 text-xs font-mono">
              <Code className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 font-bold">{challenge.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
              {challenge.difficulty}
            </span>
            <span className="px-3 py-1 rounded-md bg-[#E91E63]/15 text-[#FF6F9C] border border-[#E91E63]/30 font-bold">
              +{challenge.points} PTS
            </span>
          </div>
        </div>

        {/* Mission Title */}
        <div className="relative z-10 mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-3">
            {challenge.title}
          </h1>
          <div className="h-1 w-20 rounded-full bg-[#E91E63] shadow-[0_0_10px_#E91E63]" />
        </div>

        {/* Mission Description Brief */}
        <div className="relative z-10 space-y-4 mb-8">
          <div className="p-4 sm:p-5 rounded-xl bg-[#0c0d14]/90 border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-line leading-relaxed">
            {challenge.missionDescription}
          </div>
        </div>

        {/* Objective Box */}
        <div className="relative z-10 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-[#10131f] to-purple-950/30 border border-cyan-500/30 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-0.5">
              OBJECTIF DE LA MISSION
            </div>
            <p className="text-sm font-semibold text-white">
              {challenge.objective}
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Les navigateurs affichent du texte formaté, mais le code source brut contient des éléments non affichés à l&apos;écran...
            </p>
          </div>
        </div>

        {/* Interactive DevTools Tip for Mobile & Beginners */}
        <div className="relative z-10 mt-6 pt-6 border-t border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF6F9C] mb-2 font-semibold">
            <Eye className="w-4 h-4" />
            <span>COMMENT INSPECTER LE CODE SOURCE ?</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-zinc-400">
            <div className="p-3 rounded-lg bg-[#161826] border border-zinc-800">
              <span className="text-white font-bold block mb-1">🖥️ Sur Ordinateur :</span>
              Fais un clic droit n&apos;importe où sur cette page &rarr; <span className="text-zinc-200">« Inspecter »</span> (ou appuie sur <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-white border border-zinc-700">F12</kbd>).
            </div>
            <div className="p-3 rounded-lg bg-[#161826] border border-zinc-800">
              <span className="text-white font-bold block mb-1">🔍 Que chercher ?</span>
              Cherche les balises de commentaires HTML : <code className="text-pink-400 font-bold">&lt;!-- ... --&gt;</code>
            </div>
          </div>
        </div>
      </div>

      {/* Hint System */}
      <HintSystem hints={challenge.hints} />

      {/* Flag Submission Panel */}
      <FlagInput challenge={challenge} />

      {/* Educational Footnote */}
      <div className="p-4 rounded-xl bg-[#121420] border border-zinc-800 text-xs font-mono text-zinc-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#FF6F9C] shrink-0 mt-0.5" />
        <div>
          <span className="text-zinc-200 font-bold">Le saviez-vous ? </span>
          {challenge.educationalTip}
        </div>
      </div>
    </div>
  );
}
