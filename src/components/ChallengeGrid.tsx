"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { CHALLENGES } from "@/data/challenges";
import ChallengeCard from "./ChallengeCard";
import ProgressBar from "./ProgressBar";
import { useCTFProgress, resetProgress } from "@/lib/progress";
import {
  Terminal,
  Trophy,
  Sparkles,
  Layers,
  RotateCcw,
} from "lucide-react";
import { cyberAudio } from "@/lib/sound";

export default function ChallengeGrid() {
  const { solved, score, maxScore, totalChallenges, isLoaded } = useCTFProgress();
  const [selectedLevel, setSelectedLevel] = useState<number | "all">("all");

  const validSolvedCount = isLoaded ? Math.min(solved.length, totalChallenges) : 0;
  const isAllSolved = isLoaded && validSolvedCount === totalChallenges && totalChallenges === 10;

  const triggerVictoryConfetti = () => {
    try {
      cyberAudio?.playAccessGranted();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#00F0FF", "#FF6600", "#FF2A7A", "#7C3AED", "#10B981"],
      });
    } catch {
      // Ignored
    }
  };

  const filteredChallenges =
    selectedLevel === "all"
      ? CHALLENGES
      : CHALLENGES.filter((c) => c.level === selectedLevel);

  const level1Count = CHALLENGES.filter((c) => c.level === 1).length;
  const level1Solved = isLoaded
    ? CHALLENGES.filter((c) => c.level === 1 && solved.includes(c.id)).length
    : 0;

  const level2Count = CHALLENGES.filter((c) => c.level === 2).length;
  const level2Solved = isLoaded
    ? CHALLENGES.filter((c) => c.level === 2 && solved.includes(c.id)).length
    : 0;

  const level3Count = CHALLENGES.filter((c) => c.level === 3).length;
  const level3Solved = isLoaded
    ? CHALLENGES.filter((c) => c.level === 3 && solved.includes(c.id)).length
    : 0;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>CSI OPEN DAYS 2026 • MISSIONS CYBERSÉCURITÉ</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-3">
          LES 10 MISSIONS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-500">CYBER DÉBUTANT</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          10 épreuves progressives pour explorer les bases de la cybersécurité : inspection HTML, code Python, cryptographie, en-têtes HTTP et logique.
        </p>
      </div>

      {/* Progress Bar & Global Score */}
      <div className="max-w-4xl mx-auto">
        <ProgressBar />
      </div>

      {/* Grand Victory Celebration Banner if All 10 are Solved */}
      {isAllSolved && (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#0e1222] to-cyan-950/60 border-2 border-emerald-500/60 shadow-[0_0_35px_rgba(16,185,129,0.3)] text-center space-y-4 animate-fadeIn font-mono">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
            🎉 TOUTES LES MISSIONS VALIDÉES !
          </h2>

          <p className="text-sm text-zinc-300 max-w-lg mx-auto">
            Félicitations Agent Cyber ! Tu as résolu l&apos;intégralité des 10 challenges du Mini CTF CSI avec un score parfait de{" "}
            <strong className="text-emerald-400 font-bold">{score} / {maxScore} PTS</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={triggerVictoryConfetti}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Célébrer la victoire !</span>
            </button>

            <button
              onClick={() => {
                if (confirm("Réinitialiser toutes vos progressions pour rejouer le CTF ?")) {
                  resetProgress();
                  cyberAudio?.playAccessDenied();
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recommencer le CTF</span>
            </button>
          </div>
        </div>
      )}

      {/* Level Filter Tabs */}
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
        <button
          onClick={() => {
            cyberAudio?.playClick();
            setSelectedLevel("all");
          }}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            selectedLevel === "all"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/25 border border-cyan-400/40"
              : "bg-[#0e1222] text-zinc-400 hover:text-white border border-[#1f2744]"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Toutes les missions ({totalChallenges})</span>
        </button>

        <button
          onClick={() => {
            cyberAudio?.playClick();
            setSelectedLevel(1);
          }}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            selectedLevel === 1
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/25 border border-cyan-400/40"
              : "bg-[#0e1222] text-zinc-400 hover:text-white border border-[#1f2744]"
          }`}
        >
          <span>Niveau 1 — Premiers pas</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-cyan-300">
            {level1Solved}/{level1Count}
          </span>
        </button>

        <button
          onClick={() => {
            cyberAudio?.playClick();
            setSelectedLevel(2);
          }}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            selectedLevel === 2
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-md shadow-blue-500/25 border border-blue-400/40"
              : "bg-[#0e1222] text-zinc-400 hover:text-white border border-[#1f2744]"
          }`}
        >
          <span>Niveau 2 — Exploration</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-purple-300">
            {level2Solved}/{level2Count}
          </span>
        </button>

        <button
          onClick={() => {
            cyberAudio?.playClick();
            setSelectedLevel(3);
          }}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            selectedLevel === 3
              ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold shadow-md shadow-orange-500/25 border border-orange-400/40"
              : "bg-[#0e1222] text-zinc-400 hover:text-white border border-[#1f2744]"
          }`}
        >
          <span>Niveau 3 — Agent Cyber</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-orange-300">
            {level3Solved}/{level3Count}
          </span>
        </button>
      </div>

      {/* Challenges Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            isSolved={isLoaded ? solved.includes(challenge.id) : false}
          />
        ))}
      </div>
    </div>
  );
}
