"use client";

import Link from "next/link";
import {
  Code,
  Binary,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
  Network,
  FileCode,
  Eye,
  KeyRound,
  Braces,
  Terminal,
} from "lucide-react";
import { Challenge } from "@/data/challenges";
import { isChallengeSolved } from "@/lib/progress";
import { cyberAudio } from "@/lib/sound";

interface ChallengeCardProps {
  challenge: Challenge;
  isSolved?: boolean;
}

export default function ChallengeCard({ challenge, isSolved: propIsSolved }: ChallengeCardProps) {
  const isSolved =
    typeof propIsSolved !== "undefined"
      ? propIsSolved
      : isChallengeSolved(challenge.id);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "HTML Inspection":
        return <Eye className="w-4 h-4 text-cyan-400" />;
      case "Python":
      case "Python Strings":
      case "Python Logic":
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      case "Encoding & Substitution":
      case "Classical Cryptography":
        return <Binary className="w-4 h-4 text-purple-400" />;
      case "HTTP Headers":
        return <Network className="w-4 h-4 text-blue-400" />;
      case "DOM Manipulation":
        return <Code className="w-4 h-4 text-orange-400" />;
      case "CSS Inspection":
        return <FileCode className="w-4 h-4 text-pink-400" />;
      case "JSON Inspection":
        return <Braces className="w-4 h-4 text-amber-400" />;
      default:
        return <Shield className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div
      className={`group relative rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isSolved
          ? "bg-[#0c1626] border-2 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)]"
          : "bg-[#0e1222] border border-[#1f2744] hover:border-cyan-500/50 hover:shadow-[0_10px_35px_rgba(0,240,255,0.15)]"
      }`}
    >
      {/* Top Accent Gradient Border Bar */}
      <div
        className={`h-1.5 w-full ${
          isSolved
            ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600"
            : challenge.level === 1
            ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-400"
            : challenge.level === 2
            ? "bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
            : "bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500"
        }`}
      />

      {/* Cyber Scanline Overlay inside Card on Hover */}
      <div className="absolute inset-0 cyber-scanlines opacity-0 group-hover:opacity-15 transition-opacity pointer-events-none" />

      {/* Background Subtle Cyber Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-colors pointer-events-none" />

      <div className="p-6 sm:p-7 relative z-10 flex-1 flex flex-col justify-between">
        <div>
          {/* Top Row: Challenge Number, Category, Points & Status */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-zinc-600 group-hover:text-cyan-400 transition-colors">
                {challenge.number}
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#13182c] border border-zinc-800 text-xs font-mono">
                {getCategoryIcon(challenge.category)}
                <span className="text-zinc-300 font-bold">{challenge.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-orange-400" />
                {challenge.points} PTS
              </span>
            </div>
          </div>

          {/* Level Pill & Status Pill */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60 uppercase tracking-wider">
              {challenge.difficulty}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40 uppercase tracking-wider">
              NIV. {challenge.level}
            </span>
            {isSolved ? (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                ACCOMPLIE
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                DISPONIBLE
              </span>
            )}
          </div>

          {/* Challenge Title */}
          <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-400 transition-colors mb-2.5 tracking-wide">
            {challenge.title}
          </h3>

          {/* Challenge Description */}
          <p className="text-xs sm:text-sm text-zinc-300 whitespace-pre-line leading-relaxed mb-6">
            {challenge.shortDescription}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4 border-t border-zinc-800/60">
          <Link
            href={`/challenges/${challenge.slug}`}
            onClick={() => cyberAudio?.playClick()}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              isSolved
                ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/50 hover:text-white"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-orange-500 text-white shadow-lg shadow-cyan-500/20 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            }`}
          >
            {isSolved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>REVOIR LA MISSION</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>COMMENCER LA MISSION</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
