"use client";

import { CHALLENGES } from "@/data/challenges";
import ChallengeCard from "./ChallengeCard";
import ProgressBar from "./ProgressBar";
import { useCTFProgress } from "@/lib/progress";
import { Info, Terminal } from "lucide-react";

export default function ChallengeGrid() {
  const { solved, isLoaded } = useCTFProgress();

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E91E63]/10 border border-[#E91E63]/30 text-xs font-mono text-[#FF6F9C] mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>CYBER MISSION SELECTION</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-3">
          CHOOSE YOUR <span className="text-[#FF6F9C] cyber-text-glow">MISSION</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Deux premières missions pour découvrir les bases de la cybersécurité.
        </p>
      </div>

      {/* Progress Bar & Global Score */}
      <div className="max-w-4xl mx-auto">
        <ProgressBar />
      </div>

      {/* Beginner Persistent Tip Banner */}
      <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-xl bg-[#121420] border border-[#E91E63]/30 flex items-start sm:items-center gap-3.5 text-xs text-zinc-300 font-mono shadow-lg">
        <div className="p-2 rounded-lg bg-[#E91E63]/15 text-[#FF6F9C] shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <p className="text-white font-semibold flex items-center gap-1.5">
            <span>Rappel pour les participants :</span>
            <span className="text-[#FF6F9C] text-[10px] px-1.5 py-0.5 rounded bg-[#E91E63]/20 border border-[#E91E63]/40">
              FLAG&#123;...&#125;
            </span>
          </p>
          <p className="text-zinc-400">
            Un flag est une chaîne de caractères cachée dans le challenge. Trouve-la et soumets-la pour valider ta mission.
          </p>
        </div>
      </div>

      {/* 2 Large Challenge Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {CHALLENGES.map((challenge) => (
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
