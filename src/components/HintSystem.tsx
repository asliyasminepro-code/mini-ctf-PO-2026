"use client";

import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp, Lock, Unlock, HelpCircle } from "lucide-react";
import { cyberAudio } from "@/lib/sound";

interface HintSystemProps {
  hints: string[];
}

export default function HintSystem({ hints }: HintSystemProps) {
  const [unlockedIndices, setUnlockedIndices] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleUnlock = (index: number) => {
    if (unlockedIndices.includes(index)) return;
    cyberAudio?.playHintUnlock();
    setUnlockedIndices((prev) => [...prev, index]);
  };

  return (
    <div className="rounded-2xl bg-[#101118] border border-zinc-800 overflow-hidden shadow-lg">
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => {
          cyberAudio?.playClick();
          setIsExpanded(!isExpanded);
        }}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#161826] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <span>INDICES DE MISSION</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                {unlockedIndices.length} / {hints.length} Débloqué(s)
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Bloqué sur cette épreuve ? Débloque des indices progressifs.
            </p>
          </div>
        </div>

        <div className="text-zinc-400 p-1 rounded-md hover:bg-zinc-800">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Expandable Hints Container */}
      {isExpanded && (
        <div className="p-4 sm:p-5 pt-0 space-y-3 border-t border-zinc-800/80 mt-1 font-mono text-xs animate-fadeIn">
          {hints.map((hint, idx) => {
            const isUnlocked = unlockedIndices.includes(idx);
            return (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                  isUnlocked
                    ? "bg-[#161826] border-amber-500/40 text-zinc-200"
                    : "bg-[#0c0d14] border-zinc-800/80 text-zinc-400"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-[#FF6F9C] flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    INDICE #{idx + 1}
                  </span>

                  {!isUnlocked ? (
                    <button
                      type="button"
                      onClick={() => toggleUnlock(idx)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border border-amber-500/30 text-[11px] font-bold transition-all"
                    >
                      <Lock className="w-3 h-3" />
                      <span>RÉVÉLER L&apos;INDICE</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                      <Unlock className="w-3 h-3" />
                      <span>DÉVERROUILLÉ</span>
                    </span>
                  )}
                </div>

                {isUnlocked ? (
                  <p className="text-zinc-200 text-xs sm:text-sm font-sans mt-2 leading-relaxed bg-[#0c0d14]/80 p-3 rounded-lg border border-zinc-800">
                    {hint}
                  </p>
                ) : (
                  <p className="text-[11px] text-zinc-500 italic mt-1 font-sans">
                    Clique sur « Révéler l&apos;indice » pour afficher l&apos;aide.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
