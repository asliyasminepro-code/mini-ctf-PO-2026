"use client";

import { Trophy, Flag, Sparkles, CheckCircle2 } from "lucide-react";
import { useCTFProgress } from "@/lib/progress";

export default function ProgressBar() {
  const { score, maxScore, solved, totalChallenges, isLoaded } = useCTFProgress();

  // Clamped and validated values derived from canonical state
  const validSolvedCount = isLoaded ? Math.min(solved.length, totalChallenges) : 0;
  const displayScore = isLoaded ? Math.min(score, maxScore) : 0;
  const percentage =
    totalChallenges > 0
      ? Math.min(100, Math.max(0, Math.round((validSolvedCount / totalChallenges) * 100)))
      : 0;
  const remainingCount = Math.max(0, totalChallenges - validSolvedCount);

  return (
    <div className="w-full p-5 sm:p-6 rounded-2xl bg-[#0e1222]/90 border border-[#1f2744] backdrop-blur-md shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* Left: Missions Solved */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              PROGRESSION GLOBALE
            </div>
            <div className="text-lg sm:text-xl font-black font-mono text-white flex items-center gap-1.5">
              <span>{validSolvedCount}</span>
              <span className="text-zinc-500 text-sm font-normal">/ {totalChallenges} MISSIONS</span>
            </div>
          </div>
        </div>

        {/* Right: Score Counter */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              SCORE TOTAL
            </div>
            <div className="text-lg sm:text-xl font-black font-mono text-orange-400 flex items-center gap-1.5">
              <span>{displayScore}</span>
              <span className="text-zinc-500 text-sm font-normal">/ {maxScore} PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Progress Track */}
      <div className="relative w-full h-3 rounded-full bg-[#070913] border border-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Footer Info / Completion Celebration */}
      <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-400">
        <span>{percentage}% complété</span>
        {isLoaded && percentage === 100 ? (
          <span className="text-emerald-400 font-bold flex items-center gap-1 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Toutes les missions validées ! Félicitations !
          </span>
        ) : (
          <span className="text-zinc-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            {remainingCount} mission(s) restante(s)
          </span>
        )}
      </div>
    </div>
  );
}
