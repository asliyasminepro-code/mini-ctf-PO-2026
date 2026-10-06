"use client";

import { useEffect, useState } from "react";
import { Terminal, Shield, Sparkles, RefreshCw } from "lucide-react";
import { cyberAudio } from "@/lib/sound";

interface TerminalTextProps {
  lines?: string[];
  typingSpeed?: number;
  className?: string;
  onComplete?: () => void;
}

const DEFAULT_LINES = [
  "INITIALIZING MINI CTF...",
  "CONNECTING TO CSI...",
  "SECURITY PROTOCOL: ACTIVE",
  "SYSTEM READY_",
];

export default function TerminalText({
  lines = DEFAULT_LINES,
  typingSpeed = 35,
  className = "",
  onComplete,
}: TerminalTextProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const isDone = currentLineIndex >= lines.length;

  const restart = () => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    cyberAudio?.playClick();
  };

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentTargetLine = lines[currentLineIndex];

    if (currentCharIndex < currentTargetLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = "";
          }
          newLines[currentLineIndex] = currentTargetLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      // Move to next line after a brief pause
      const pauseTimeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 300);

      return () => clearTimeout(pauseTimeout);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, onComplete]);

  return (
    <div
      className={`relative rounded-xl border border-[#E91E63]/30 bg-[#0c0d14]/90 backdrop-blur-md overflow-hidden shadow-xl shadow-black/60 font-mono ${className}`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#121420] border-b border-[#23273A] select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 hover:bg-[#FF5F56] transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 hover:bg-[#FFBD2E] transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 hover:bg-[#27C93F] transition-colors" />
          <div className="h-3 w-px bg-zinc-800 mx-1.5" />
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <Terminal className="w-3.5 h-3.5 text-[#FF6F9C]" />
            <span>csi-security-console:~/ctf-init</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            NODE ONLINE
          </span>
          {isDone && (
            <button
              onClick={restart}
              title="Rejouer l'animation"
              className="text-zinc-400 hover:text-[#FF6F9C] transition-colors p-0.5 rounded hover:bg-zinc-800"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 text-xs sm:text-sm space-y-2 min-h-[140px] flex flex-col justify-center">
        {displayedLines.map((line, idx) => {
          const isLastLine = idx === lines.length - 1;
          return (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-[#FF6F9C] select-none font-bold">&gt;</span>
              <span
                className={`${
                  isLastLine
                    ? "text-emerald-400 font-bold cyber-text-glow-cyan"
                    : idx === 2
                    ? "text-[#FF6F9C] font-semibold"
                    : "text-zinc-300"
                }`}
              >
                {line}
              </span>
            </div>
          );
        })}

        {/* Active blinking cursor when typing */}
        {!isDone && (
          <div className="flex items-center gap-2">
            <span className="text-[#FF6F9C] font-bold">&gt;</span>
            <span className="inline-block w-2.5 h-4 bg-[#FF6F9C] animate-pulse" />
          </div>
        )}

        {isDone && (
          <div className="pt-2 text-[11px] text-zinc-500 font-mono border-t border-zinc-800/60 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#E91E63]" /> Session auth: GUEST_L1_STUDENT
            </span>
            <span className="text-[#FF6F9C]/80 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Ready for challenge
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
