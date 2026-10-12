"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Flag,
  Volume2,
  VolumeX,
  RotateCcw,
  Menu,
  X,
  HelpCircle,
  Trophy,
} from "lucide-react";
import { useCTFProgress, resetProgress } from "@/lib/progress";
import { cyberAudio } from "@/lib/sound";
import BeginnerGuideModal from "./BeginnerGuideModal";

export default function Navbar() {
  const pathname = usePathname();
  const { score, maxScore, solved, totalChallenges, isLoaded } = useCTFProgress();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleSound = () => {
    if (cyberAudio) {
      const newState = cyberAudio.toggle();
      setSoundEnabled(newState);
    }
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    cyberAudio?.playAccessDenied();
  };

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/challenges", label: "Missions CTF" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#1f2744] bg-[#070913]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand / Logo */}
          <Link
            href="/"
            onClick={() => cyberAudio?.playClick()}
            className="flex items-center gap-3 group"
          >
            {/* Cyber Shield Emblem */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-[#0e1222] to-orange-500/30 border border-cyan-500/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              {/* Mini Orange dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-[#070913] shadow-[0_0_8px_#ff6600]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                  CSI
                </span>
                <span className="text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  PO 2026
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                MINI CTF • CYBERSÉCURITÉ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => cyberAudio?.playClick()}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Guide modal trigger */}
            <button
              onClick={() => {
                cyberAudio?.playClick();
                setGuideModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-zinc-300 hover:text-cyan-400 hover:bg-zinc-800/60 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Guide L1</span>
            </button>
          </nav>

          {/* Right Area: Live Score Pill + Sound & Reset controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live Score Pill */}
            {isLoaded && (
              <Link
                href="/challenges"
                onClick={() => cyberAudio?.playClick()}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0e1222] border border-[#1f2744] hover:border-cyan-400 transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                  <Flag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    <strong className="text-white">{Math.min(solved.length, totalChallenges)}</strong>/{totalChallenges}
                  </span>
                </div>

                <div className="h-3 w-px bg-zinc-700" />

                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-orange-400 font-bold">{Math.min(score, maxScore)}</span>
                  <span className="text-[10px] text-zinc-500">/{maxScore} PTS</span>
                </div>
              </Link>
            )}

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Couper le son cyber" : "Activer le son cyber"}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
              }`}
              aria-label="Toggle Cyber Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Reset Progress Button */}
            {solved.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowResetConfirm((v) => !v)}
                  title="Réinitialiser le CTF"
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors cursor-pointer"
                  aria-label="Réinitialiser"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Reset Confirmation Tooltip */}
                {showResetConfirm && (
                  <div className="absolute right-0 top-12 z-50 w-56 p-3 rounded-xl bg-[#13182c] border border-rose-500/40 shadow-xl text-xs font-mono space-y-2">
                    <p className="text-zinc-300">Réinitialiser la progression et les scores ?</p>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-2 py-1 rounded bg-rose-600 text-white font-bold hover:bg-rose-500 cursor-pointer"
                      >
                        Confirmer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Audio Toggle mobile */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border text-xs cursor-pointer ${
                soundEnabled
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                cyberAudio?.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#1f2744] bg-[#070913]/98 px-4 pt-3 pb-5 space-y-3 font-mono text-sm animate-fadeIn">
            {/* Score in mobile menu */}
            {isLoaded && (
              <div className="p-3 rounded-xl bg-[#0e1222] border border-cyan-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-cyan-400" />
                  <span className="text-zinc-400 text-xs">Missions résolues :</span>
                  <span className="text-white font-bold">{Math.min(solved.length, totalChallenges)}/{totalChallenges}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>{Math.min(score, maxScore)}/{maxScore} PTS</span>
                </div>
              </div>
            )}

            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    cyberAudio?.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2.5 rounded-lg text-xs font-semibold ${
                    pathname === link.href
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setGuideModalOpen(true);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-zinc-800 flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Guide Débutant L1
              </button>

              {solved.length > 0 && (
                <button
                  onClick={() => {
                    handleReset();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Réinitialiser le CTF
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Beginner Guide Modal */}
      <BeginnerGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </>
  );
}
