"use client";

import { useState } from "react";
import { Copy, Check, Binary, Sparkles } from "lucide-react";
import { cyberAudio } from "@/lib/sound";

interface Base64TerminalDisplayProps {
  encodedString: string;
}

export default function Base64TerminalDisplay({ encodedString }: Base64TerminalDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(encodedString);
      cyberAudio?.playClick();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="rounded-2xl border border-[#E91E63]/40 bg-[#0c0d14] overflow-hidden shadow-2xl font-mono">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-[#161826] border-b border-[#23273A] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          <span className="text-zinc-600 mx-1">|</span>
          <div className="flex items-center gap-1.5 text-xs text-zinc-300">
            <Binary className="w-3.5 h-3.5 text-[#FF6F9C]" />
            <span>INTERCEPTED_PAYLOAD.TXT</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-[#E91E63]/15 text-[#FF6F9C] hover:bg-[#E91E63]/25 border border-[#E91E63]/30"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>COPIÉ !</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPIER LE TEXTE</span>
            </>
          )}
        </button>
      </div>

      {/* Cipher Display Body */}
      <div className="p-6 sm:p-8 text-center bg-gradient-to-b from-[#0c0d14] to-[#121420] relative">
        <div className="text-[11px] text-[#FF6F9C] uppercase tracking-widest font-semibold mb-3 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          MESSAGE INTERCEPTÉ
        </div>

        {/* Large Prominent Encoded String */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#08090D] border border-zinc-800 text-base sm:text-xl md:text-2xl text-[#FF6F9C] font-black tracking-wider break-all shadow-inner select-all cyber-text-glow font-mono">
          {encodedString}
        </div>

        {/* Decoder Tip below */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E91E63]" /> Longueur : {encodedString.length} caractères
          </span>
          <span>•</span>
          <span className="text-zinc-300">Indicateur : se termine par un caractère d&apos;alignement &apos;=&apos;</span>
        </div>
      </div>
    </div>
  );
}
