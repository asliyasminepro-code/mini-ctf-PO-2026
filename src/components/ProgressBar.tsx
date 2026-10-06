"use client";

import { Trophy, Flag, Sparkles, CheckCircle2 } from "lucide-react";
import { useCTFProgress } from "@/lib/progress";

export default function ProgressBar() {
  const { score, maxScore, solved, totalChallenges, isLoaded } = useCTFProgress();

  const percentage = totalChallenges > 0 ? Math.round((solved.length / totalChallenges) * 100) : 0;

  return (
    <div className="w-full p-5 sm:p-6 rounded-2xl bg-[#101118]/90 border border-[#23273A] backdrop-blur-md shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* Left: Missions Solved */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E91E63]/15 border border-[#E91E63]/30 flex items-center justify-center text-[#FF6F9C]">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              PROGRESSION
            </div>
            <div className="text-lg sm:text-xl font-black font-mono text-white flex items-center gap-1.5">
              <span>{isLoaded ? solved.length : 0}</span>
              <span className="text-zinc-500 text-sm font-normal">/ {totalChallenges} MISSIONS</span>
            </div>
          </div>
        </div>

        {/* Right: Score Counter */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              SCORE TOTAL
            </div>
            <div className="text-lg sm:text-xl font-black font-mono text-[#FF6F9C] flex items-center gap-1.5">
              <span>{isLoaded ? score : 0}</span>
              <span className="text-zinc-500 text-sm font-normal">/ {maxScore} PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Progress Track */}
      <div className="relative w-full h-3 rounded-full bg-[#161826] border border-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#E91E63] via-[#FF2A7A] to-[#7C3AED] transition-all duration-700 ease-out shadow-[0_0_15px_#E91E63]"
          style={{ width: `${isLoaded ? percentage : 0}%` }}
        />
      </div>

      {/* Footer Info / Completion Celebration */}
      <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-400">
        <span>{percentage}% complété</span>
        {percentage === 100 ? (
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Toutes les missions validées ! Félicitations !
          </span>
        ) : (
          <span className="text-zinc-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FF6F9C]" />
            {totalChallenges - solved.length} mission(s) restante(s)
          </span>
        )}
      </div>
    </div>
  );
}
