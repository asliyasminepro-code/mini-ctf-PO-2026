"use client";

import { useState } from "react";
import { HelpCircle, X, Flag, Code2, Binary, Sparkles, Heart, ShieldCheck } from "lucide-react";
import { cyberAudio } from "@/lib/sound";

interface BeginnerGuideModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function BeginnerGuideModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: BeginnerGuideModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = typeof controlledIsOpen !== "undefined";
  const isOpen = isControlled ? controlledIsOpen : internalOpen;

  const handleOpen = () => {
    cyberAudio?.playClick();
    if (isControlled) {
      // no-op if controlled
    } else {
      setInternalOpen(true);
    }
  };

  const handleClose = () => {
    cyberAudio?.playClick();
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalOpen(false);
    }
  };

  return (
    <>
      {!isControlled && (
        <button
          onClick={handleOpen}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-[#FF6F9C]/50 hover:bg-[#E91E63]/10 text-xs text-zinc-300 hover:text-[#FF6F9C] transition-all font-mono"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#FF6F9C]" />
          <span>Guide Débutant (L1)</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#101118] border border-[#E91E63]/40 shadow-2xl shadow-[#E91E63]/20 text-zinc-200 p-6 md:p-8"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-zinc-800/80 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#E91E63]/15 border border-[#E91E63]/30 text-[#FF6F9C]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white tracking-wide flex items-center gap-2">
                    GUIDE DU PARTICIPANT L1
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#E91E63]/20 text-[#FF6F9C] border border-[#E91E63]/30 font-mono">
                      CSI 2026
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Bienvenue dans le monde de la cybersécurité & des CTFs
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-6 text-sm">
              {/* What is a CTF? */}
              <div className="p-4 rounded-xl bg-[#161826] border border-zinc-800 hover:border-[#E91E63]/30 transition-colors">
                <div className="flex items-center gap-2 text-[#FF6F9C] font-semibold mb-2">
                  <Flag className="w-4 h-4" />
                  <h3>1. Qu&apos;est-ce qu&apos;un CTF (Capture The Flag) ?</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  Un <strong>CTF</strong> est une compétition éducative où les participants doivent
                  résoudre des énigmes informatiques pour trouver une preuve de réussite appelée un{" "}
                  <strong>Flag</strong>. C&apos;est le meilleur moyen d&apos;apprendre la sécurité en
                  pratiquant de manière éthique et légale.
                </p>
              </div>

              {/* What is a Flag? */}
              <div className="p-4 rounded-xl bg-[#161826] border border-zinc-800 hover:border-[#E91E63]/30 transition-colors">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Sparkles className="w-4 h-4" />
                  <h3>2. Quel est le format d&apos;un Flag ?</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed mb-3">
                  Un flag est une chaîne de caractères spécifique. Dans notre CTF, tous les flags
                  suivent le format officiel :
                </p>
                <div className="p-3 rounded-lg bg-[#0c0d14] border border-[#E91E63]/30 font-mono text-center text-[#FF6F9C] font-bold text-sm tracking-wider">
                  FLAG&#123;EXEMPLE_DE_SECRET&#125;
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Dès que tu as trouvé le mot-clé secret, colle-le dans le champ de soumission de la
                  mission !
                </p>
              </div>

              {/* How to inspect source code */}
              <div className="p-4 rounded-xl bg-[#161826] border border-zinc-800 hover:border-[#E91E63]/30 transition-colors">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                  <Code2 className="w-4 h-4" />
                  <h3>3. Comment inspecter le code source (Mission 01) ?</h3>
                </div>
                <ul className="text-zinc-300 space-y-1.5 list-disc list-inside">
                  <li>
                    Fais un <strong className="text-white">clic droit</strong> sur la page puis clique
                    sur <strong>« Inspecter »</strong> ou <strong>« Afficher le code source »</strong>.
                  </li>
                  <li>
                    Ou appuie directement sur la touche <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-xs font-mono text-white border border-zinc-700">F12</kbd> (ou <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-xs font-mono text-white border border-zinc-700">Ctrl + Shift + I</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-xs font-mono text-white border border-zinc-700">Cmd + Option + I</kbd>).
                  </li>
                  <li>
                    Regarde dans les commentaires HTML (qui ressemblent à <code className="text-pink-400 text-xs">&lt;!-- ... --&gt;</code>) pour dénicher des informations laissées par inadvertance.
                  </li>
                </ul>
              </div>

              {/* What is Base64 */}
              <div className="p-4 rounded-xl bg-[#161826] border border-zinc-800 hover:border-[#E91E63]/30 transition-colors">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <Binary className="w-4 h-4" />
                  <h3>4. Qu&apos;est-ce que l&apos;encodage Base64 (Mission 02) ?</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed mb-2">
                  <strong>Base64</strong> est un algorithme qui transforme n&apos;importe quel texte ou fichier binaire en caractères ASCII lisibles (lettres A-Z, a-z, chiffres 0-9, et souvent un signe &apos;=&apos; à la fin).
                </p>
                <div className="p-3 rounded-lg bg-[#0c0d14] border border-zinc-800 text-xs text-zinc-300 font-mono">
                  <p className="text-[#FF6F9C] font-semibold mb-1">💡 Retiens bien :</p>
                  Base64 <strong>n&apos;est pas un chiffrement</strong> ! Il n&apos;y a aucun mot de passe requis. N&apos;importe qui peut le décoder en une seconde avec un outil en ligne ou un terminal.
                </div>
              </div>

              {/* October Rose & CSI Note */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#E91E63]/10 to-[#7C3AED]/10 border border-[#E91E63]/30">
                <div className="flex items-center gap-2 text-[#FF6F9C] font-semibold mb-2">
                  <Heart className="w-4 h-4 fill-[#E91E63]/30" />
                  <h3>Événement Octobre Rose & CSI Portes Ouvertes 2026</h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Ce mini CTF a été spécialement conçu par le <strong>Club Scientifique Informatique (CSI)</strong> pour accueillir les nouveaux étudiants de L1 tout en s&apos;associant à la sensibilisation <strong>Octobre Rose</strong>. Rejoins le club pour aller plus loin et participer à de vraies compétitions CTF inter-universitaires !
                </p>
              </div>
            </div>

            {/* Footer Button */}
            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E91E63] to-[#7C3AED] hover:from-[#FF2A7A] hover:to-[#8B5CF6] text-white font-medium text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#E91E63]/25 font-mono"
              >
                J&apos;ai compris, place aux missions !
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
