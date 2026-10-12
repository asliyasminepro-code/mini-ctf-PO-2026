import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  Search,
  Info,
  Layers,
  Sparkles,
} from "lucide-react";
import { CHALLENGES, getChallengeBySlug } from "@/data/challenges";
import FlagInput from "@/components/FlagInput";
import HintSystem from "@/components/HintSystem";
import ChallengePlayground from "@/components/ChallengePlayground";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const challenge of CHALLENGES) {
    params.push({ slug: challenge.slug });
    params.push({ slug: challenge.id });
    if (challenge.number !== challenge.id) {
      params.push({ slug: challenge.number });
    }
  }
  params.push({ slug: "profil-oublie" });
  params.push({ slug: "acces-autorise" });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    return {
      title: "Mission introuvable — Mini CTF CSI 2026",
    };
  }

  return {
    title: `${challenge.number} — ${challenge.title} | Mini CTF CSI 2026`,
    description: challenge.shortDescription,
  };
}

export default async function ChallengeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-8 animate-fadeIn">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between gap-4 font-mono text-xs">
        <Link
          href="/challenges"
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Toutes les missions</span>
        </Link>

        <div className="flex items-center gap-2 text-zinc-400">
          <span className="hidden sm:inline text-zinc-500">{challenge.levelTitle}</span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span>MISSION</span>
          <span className="text-white font-bold">{challenge.number}</span>
          <span>/</span>
          <span>10</span>
        </div>
      </div>

      {/* Main Mission Header Panel */}
      <div className="relative rounded-3xl bg-[#0e1222]/90 border border-[#1f2744] p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
        {/* Top Glowing Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500" />

        {/* Scanlines inside container */}
        <div className="absolute inset-0 cyber-scanlines opacity-10 pointer-events-none" />

        {/* Level & Mission Metadata Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl sm:text-4xl font-black font-mono text-zinc-600">
              {challenge.number}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#13182c] border border-cyan-500/30 text-xs font-mono">
              <Code className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 font-bold">{challenge.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
              {challenge.difficulty}
            </span>
            <span className="px-3 py-1 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30 font-bold">
              +{challenge.points} PTS
            </span>
          </div>
        </div>

        {/* Mission Title */}
        <div className="relative z-10 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] font-mono font-semibold mb-2">
            <Layers className="w-3 h-3" />
            <span>{challenge.levelTitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-3">
            {challenge.title}
          </h1>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-orange-500 shadow-[0_0_12px_rgba(0,240,255,0.6)]" />
        </div>

        {/* Mission Description Brief */}
        <div className="relative z-10 space-y-4 mb-8">
          <div className="p-4 sm:p-5 rounded-xl bg-[#070913]/90 border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-line leading-relaxed">
            {challenge.missionDescription}
          </div>
        </div>

        {/* Objective Box */}
        <div className="relative z-10 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-[#0e1222] to-blue-950/30 border border-cyan-500/30 flex items-start gap-3.5">
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
          </div>
        </div>
      </div>

      {/* Interactive Challenge Playground / Code / Element */}
      <ChallengePlayground challenge={challenge} />

      {/* Hint System */}
      <HintSystem hints={challenge.hints} />

      {/* Flag Submission Panel */}
      <FlagInput challenge={challenge} />

      {/* Educational Footnote */}
      <div className="p-4 rounded-xl bg-[#0e1222] border border-zinc-800 text-xs font-mono text-zinc-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-zinc-200 font-bold">Le saviez-vous ? </span>
          {challenge.educationalTip}
        </div>
      </div>

      {/* Bottom Mission Prev / Next Switcher */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-800 font-mono text-xs">
        {challenge.prevChallengeSlug ? (
          <Link
            href={`/challenges/${challenge.prevChallengeSlug}`}
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Mission précédente</span>
          </Link>
        ) : (
          <div />
        )}

        {challenge.nextChallengeSlug ? (
          <Link
            href={`/challenges/${challenge.nextChallengeSlug}`}
            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
          >
            <span>Mission suivante</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <Link
            href="/challenges"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
          >
            <span>Toutes les missions</span>
            <Sparkles className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
