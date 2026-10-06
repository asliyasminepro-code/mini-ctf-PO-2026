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
      <header className="sticky top-0 z-40 w-full border-b border-[#23273A] bg-[#08090D]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand / Logo */}
          <Link
            href="/"
            onClick={() => cyberAudio?.playClick()}
            className="flex items-center gap-3 group"
          >
            {/* Cyber October Rose Ribbon Emblem */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#E91E63]/20 via-[#161826] to-[#7C3AED]/30 border border-[#E91E63]/40 group-hover:border-[#FF6F9C] group-hover:shadow-[0_0_15px_rgba(233,30,99,0.5)] transition-all">
              <Shield className="w-5 h-5 text-[#FF6F9C] group-hover:scale-110 transition-transform" />
              {/* Mini Ribbon dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#E91E63] border-2 border-[#08090D] shadow-[0_0_8px_#E91E63]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-wider text-white group-hover:text-[#FF6F9C] transition-colors">
                  CSI
                </span>
                <span className="text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded bg-[#E91E63]/15 text-[#FF6F9C] border border-[#E91E63]/30">
                  PO 2026
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                MINI CTF • OCTOBRE ROSE
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
                      ? "bg-[#E91E63]/15 text-[#FF6F9C] border border-[#E91E63]/40 shadow-[0_0_12px_rgba(233,30,99,0.2)]"
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-zinc-300 hover:text-[#FF6F9C] hover:bg-zinc-800/60 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#FF6F9C]" />
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
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121420] border border-[#E91E63]/30 hover:border-[#FF6F9C] transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                  <Flag className="w-3.5 h-3.5 text-[#FF6F9C]" />
                  <span>
                    <strong className="text-white">{solved.length}</strong>/{totalChallenges}
                  </span>
                </div>

                <div className="h-3 w-px bg-zinc-700" />

                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[#FF6F9C] font-bold">{score}</span>
                  <span className="text-[10px] text-zinc-500">/{maxScore} PTS</span>
                </div>
              </Link>
            )}

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Couper le son cyber" : "Activer le son cyber"}
              className={`p-2 rounded-lg border transition-all ${
                soundEnabled
                  ? "bg-[#E91E63]/10 border-[#E91E63]/30 text-[#FF6F9C] hover:bg-[#E91E63]/20"
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
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                  aria-label="Réinitialiser"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Reset Confirmation Tooltip */}
                {showResetConfirm && (
                  <div className="absolute right-0 top-12 z-50 w-56 p-3 rounded-xl bg-[#161826] border border-rose-500/40 shadow-xl text-xs font-mono space-y-2">
                    <p className="text-zinc-300">Réinitialiser la progression et les scores ?</p>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 hover:text-white"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-2 py-1 rounded bg-rose-600 text-white font-bold hover:bg-rose-500"
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
              className={`p-2 rounded-lg border text-xs ${
                soundEnabled
                  ? "bg-[#E91E63]/10 border-[#E91E63]/30 text-[#FF6F9C]"
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
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#23273A] bg-[#0c0d14]/98 px-4 pt-3 pb-5 space-y-3 font-mono text-sm animate-fadeIn">
            {/* Score in mobile menu */}
            {isLoaded && (
              <div className="p-3 rounded-xl bg-[#161826] border border-[#E91E63]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-[#FF6F9C]" />
                  <span className="text-zinc-400 text-xs">Missions résolues :</span>
                  <span className="text-white font-bold">{solved.length}/{totalChallenges}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#FF6F9C] font-bold">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>{score} PTS</span>
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
                      ? "bg-[#E91E63]/20 text-[#FF6F9C] border border-[#E91E63]/40"
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
                className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-zinc-800 flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-[#FF6F9C]" />
                Guide Débutant L1
              </button>

              {solved.length > 0 && (
                <button
                  onClick={() => {
                    handleReset();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/40 flex items-center gap-2"
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
