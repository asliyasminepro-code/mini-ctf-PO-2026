"use client";

import { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Send,
  Copy,
  Check,
} from "lucide-react";
import { Challenge } from "@/data/challenges";
import { solveChallenge, useCTFProgress } from "@/lib/progress";
import { cyberAudio } from "@/lib/sound";

interface FlagInputProps {
  challenge: Challenge;
}

export default function FlagInput({ challenge }: FlagInputProps) {
  const { solved, isLoaded } = useCTFProgress();
  const isAlreadySolved = isLoaded && solved.includes(challenge.id);

  const [flagValue, setFlagValue] = useState("");
  const [justSolved, setJustSolved] = useState(false);
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const isSuccess = isAlreadySolved || justSolved;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E91E63", "#FF6F9C", "#7C3AED", "#00F0FF", "#10B981"],
      });
    } catch {
      // Ignored
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = flagValue.trim();

    if (!cleanInput) {
      setStatus("error");
      setErrorMessage("Veuillez saisir un flag.");
      cyberAudio?.playAccessDenied();
      return;
    }

    if (cleanInput === challenge.flag) {
      setStatus("idle");
      setJustSolved(true);
      solveChallenge(challenge.id);
      cyberAudio?.playAccessGranted();
      triggerConfetti();
    } else {
      setStatus("error");
      setErrorMessage("Ce n'est pas le bon flag. Continue à chercher.");
      cyberAudio?.playAccessDenied();
    }
  };

  return (
    <div className="rounded-2xl bg-[#101118] border border-[#23273A] p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Glow Effect if Correct */}
      {isSuccess && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-[#E91E63]/10 pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E91E63]/15 border border-[#E91E63]/30 flex items-center justify-center text-[#FF6F9C]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white font-mono uppercase tracking-wider">
              VALIDATION DU FLAG
            </h3>
            <p className="text-xs text-zinc-400">
              Format officiel : <code className="text-[#FF6F9C] font-mono">FLAG&#123;...&#125;</code>
            </p>
          </div>
        </div>

        <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#E91E63]/15 text-[#FF6F9C] border border-[#E91E63]/30 font-bold flex items-center gap-1">
          <Zap className="w-3.5 h-3.5" />
          +{challenge.points} PTS
        </div>
      </div>

      {/* Flag Form */}
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="relative">
          <input
            type="text"
            value={isSuccess && !flagValue ? challenge.flag : flagValue}
            onChange={(e) => {
              setFlagValue(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="FLAG{...}"
            className={`w-full px-4 py-3.5 rounded-xl bg-[#0c0d14] text-white font-mono text-sm sm:text-base tracking-wide border transition-all focus:outline-none ${
              isSuccess
                ? "border-emerald-500 ring-2 ring-emerald-500/30 text-emerald-400"
                : status === "error"
                ? "border-rose-500 ring-2 ring-rose-500/30 animate-glitch"
                : "border-zinc-800 hover:border-zinc-700 focus:border-[#E91E63] focus:ring-2 focus:ring-[#E91E63]/30"
            }`}
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            onClick={() => {
              if (!isSuccess) cyberAudio?.playClick();
            }}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              isSuccess
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
                : "bg-gradient-to-r from-[#E91E63] to-[#7C3AED] hover:from-[#FF2A7A] hover:to-[#8B5CF6] text-white shadow-lg shadow-[#E91E63]/25 hover:shadow-[0_0_25px_rgba(233,30,99,0.5)]"
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>MISSION VALIDÉE</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>SUBMIT FLAG</span>
              </>
            )}
          </button>

          {/* Quick paste helper */}
          <button
            type="button"
            onClick={async () => {
              try {
                const text = await navigator.clipboard.readText();
                if (text) {
                  setFlagValue(text);
                  cyberAudio?.playClick();
                  setCopiedSuccess(true);
                  setTimeout(() => setCopiedSuccess(false), 1500);
                }
              } catch {
                // Clipboard permissions denied
              }
            }}
            className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
            title="Coller depuis le presse-papier"
          >
            {copiedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>COLLÉ !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#FF6F9C]" />
                <span>COLLER</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Notification Panel */}
      {isSuccess && (
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-emerald-950/60 to-[#10131f] border border-emerald-500/50 shadow-lg animate-fadeIn font-mono">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-emerald-400 tracking-wider">
                ACCESS GRANTED • FLAG ACCEPTED
              </div>
              <div className="text-xs text-zinc-300 flex items-center gap-1.5 mt-0.5">
                <span className="text-[#FF6F9C] font-bold">+{challenge.points} POINTS</span>
                <span>enregistrés dans votre profil de session !</span>
              </div>
            </div>
          </div>

          {/* Post-success explanation if present */}
          {challenge.explanationAfterSuccess && (
            <div className="mt-4 p-4 rounded-lg bg-[#0c0d14]/90 border border-emerald-500/30 text-xs sm:text-sm font-sans text-zinc-200 leading-relaxed">
              <p className="font-mono text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> EXPLICATION PÉDAGOGIQUE :
              </p>
              <div className="whitespace-pre-line text-zinc-300 font-sans">
                {challenge.explanationAfterSuccess}
              </div>
            </div>
          )}

          {/* Next challenge button or back to missions */}
          <div className="mt-5 pt-4 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/challenges"
              onClick={() => cyberAudio?.playClick()}
              className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
            >
              ← Retour aux missions
            </Link>

            {challenge.nextChallengeSlug ? (
              <Link
                href={`/challenges/${challenge.nextChallengeSlug}`}
                onClick={() => cyberAudio?.playClick()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E91E63] to-[#7C3AED] hover:from-[#FF2A7A] hover:to-[#8B5CF6] text-white text-xs font-bold font-mono tracking-wider flex items-center gap-1.5 shadow-md shadow-[#E91E63]/30"
              >
                <span>MISSION SUIVANTE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                href="/challenges"
                onClick={() => cyberAudio?.playClick()}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
              >
                <span>VOIR LE TABLEAU DES SCORES</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Error Notification Panel */}
      {status === "error" && (
        <div className="mt-5 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 font-mono text-xs flex items-center gap-3 animate-fadeIn">
          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <span className="font-bold text-rose-200">ACCESS DENIED : </span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
