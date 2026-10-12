"use client";

import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp, Lock, Unlock, HelpCircle, Sparkles } from "lucide-react";
import { cyberAudio } from "@/lib/sound";

interface HintSystemProps {
  hints: string[];
}

export default function HintSystem({ hints }: HintSystemProps) {
  const [unlockedCount, setUnlockedCount] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const unlockNextHint = () => {
    if (unlockedCount >= hints.length) return;
    cyberAudio?.playHintUnlock();
    setUnlockedCount((prev) => prev + 1);
    if (!isExpanded) setIsExpanded(true);
  };

  return (
    <div className="rounded-2xl bg-[#0e1222]/90 border border-[#1f2744] hover:border-amber-500/30 overflow-hidden shadow-lg transition-all">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 text-left">
        <button
          type="button"
          onClick={() => {
            cyberAudio?.playClick();
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <span>INDICES DE MISSION</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                {unlockedCount} / {hints.length} Révélé(s)
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Un doute ou une difficulté ? Révèle les indices de manière progressive.
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2 ml-auto">
          {unlockedCount < hints.length && (
            <button
              type="button"
              onClick={unlockNextHint}
              className="px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Afficher un indice ({unlockedCount + 1}/{hints.length})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              cyberAudio?.playClick();
              setIsExpanded(!isExpanded);
            }}
            className="text-zinc-400 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Afficher ou masquer les indices"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Hints Container */}
      {isExpanded && (
        <div className="p-4 sm:p-5 pt-0 space-y-3 border-t border-zinc-800/80 mt-1 font-mono text-xs animate-fadeIn">
          {hints.map((hint, idx) => {
            const isUnlocked = idx < unlockedCount;
            const isNextToUnlock = idx === unlockedCount;

            return (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                  isUnlocked
                    ? "bg-[#13182c] border-amber-500/40 text-zinc-200"
                    : "bg-[#070913] border-zinc-800/80 text-zinc-400"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    INDICE #{idx + 1}
                  </span>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                      <Unlock className="w-3 h-3" />
                      <span>DÉVERROUILLÉ</span>
                    </span>
                  ) : isNextToUnlock ? (
                    <button
                      type="button"
                      onClick={unlockNextHint}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-[11px] font-bold transition-all"
                    >
                      <Lock className="w-3 h-3" />
                      <span>RÉVÉLER CET INDICE</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-zinc-500 text-[11px]">
                      <Lock className="w-3 h-3" />
                      <span>VERROUILLÉ (Indice précédent requis)</span>
                    </span>
                  )}
                </div>

                {isUnlocked ? (
                  <p className="text-zinc-200 text-xs sm:text-sm font-sans mt-2 leading-relaxed bg-[#070913]/90 p-3 rounded-lg border border-zinc-800">
                    {hint}
                  </p>
                ) : (
                  <p className="text-[11px] text-zinc-500 italic mt-1 font-sans">
                    {isNextToUnlock
                      ? "Clique sur « Révéler cet indice » pour débloquer l'aide."
                      : `Débloque d'abord l'indice #${idx} pour accéder à cet indice.`}
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
