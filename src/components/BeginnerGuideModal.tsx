"use client";

import { useState } from "react";
import { HelpCircle, X, Flag, Code2, Binary, Sparkles, Heart, ShieldCheck, Network, Layers } from "lucide-react";
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
    if (!isControlled) {
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-xs text-zinc-300 hover:text-cyan-400 transition-all font-mono"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Guide Débutant (L1)</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#0e1222] border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 text-zinc-200 p-6 md:p-8"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-zinc-800/80 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white tracking-wide flex items-center gap-2">
                    GUIDE DU PARTICIPANT L1
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-mono">
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
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-6 text-sm">
              {/* What is a CTF? */}
              <div className="p-4 rounded-xl bg-[#13182c] border border-zinc-800 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                  <Flag className="w-4 h-4" />
                  <h3>1. Qu&apos;est-ce qu&apos;un CTF (Capture The Flag) ?</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  Un <strong>CTF</strong> est un défi éducatif où les participants résolvent des énigmes de sécurité informatique pour trouver une preuve de réussite appelée un{" "}
                  <strong>Flag</strong>. C&apos;est le meilleur moyen d&apos;apprendre la sécurité en pratiquant de façon éthique et ludique.
                </p>
              </div>

              {/* What is a Flag? */}
              <div className="p-4 rounded-xl bg-[#13182c] border border-zinc-800 hover:border-orange-500/30 transition-colors">
                <div className="flex items-center gap-2 text-orange-400 font-semibold mb-2">
                  <Sparkles className="w-4 h-4" />
                  <h3>2. Quel est le format d&apos;un Flag ?</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed mb-3">
                  Dans notre plateforme, tous les flags respectent le format officiel :
                </p>
                <div className="p-3 rounded-lg bg-[#070913] border border-orange-500/40 font-mono text-center text-orange-400 font-bold text-sm tracking-wider">
                  CTF&#123;EXEMPLE_DE_SECRET&#125;
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Dès que tu as résolu une mission, copie la chaîne exacte et colle-la dans le formulaire de validation.
                </p>
              </div>

              {/* 3 Progressive Levels */}
              <div className="p-4 rounded-xl bg-[#13182c] border border-zinc-800 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                  <Layers className="w-4 h-4" />
                  <h3>3. Les 3 Niveaux de progression (10 missions)</h3>
                </div>
                <ul className="text-zinc-300 space-y-2 text-xs">
                  <li>
                    <strong className="text-cyan-400">Niveau 1 — Premiers Pas (Missions 01 à 03) :</strong> Inspection HTML, variables Python et substitution Leet Speak.
                  </li>
                  <li>
                    <strong className="text-purple-400">Niveau 2 — Exploration (Missions 04 à 07) :</strong> En-têtes HTTP de serveur, manipulation du DOM, inspection de feuilles de style CSS et slicing Python.
                  </li>
                  <li>
                    <strong className="text-orange-400">Niveau 3 — Agent Cyber (Missions 08 à 10) :</strong> Chiffre de César, analyse d&apos;objets JSON et logique conditionnelle Python.
                  </li>
                </ul>
              </div>

              {/* How to inspect source code */}
              <div className="p-4 rounded-xl bg-[#13182c] border border-zinc-800 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                  <Code2 className="w-4 h-4" />
                  <h3>4. Comment utiliser les DevTools (F12) ?</h3>
                </div>
                <ul className="text-zinc-300 space-y-1.5 list-disc list-inside text-xs">
                  <li>
                    Fais un <strong className="text-white">clic droit</strong> sur la page puis clique sur <strong>« Inspecter »</strong> (ou appuie sur <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-xs font-mono text-white border border-zinc-700">F12</kbd>).
                  </li>
                  <li>
                    Onglet <strong className="text-white">Elements</strong> : pour voir les balises HTML, leurs attributs (comme <code className="text-cyan-300">alt</code> ou <code className="text-cyan-300">disabled</code>).
                  </li>
                  <li>
                    Onglet <strong className="text-white">Network (Réseau)</strong> : pour observer les requêtes envoyées au serveur et inspecter les <strong className="text-white">Response Headers</strong>.
                  </li>
                  <li>
                    Onglet <strong className="text-white">Sources</strong> : pour explorer les fichiers chargés tels que les feuilles de style CSS.
                  </li>
                </ul>
              </div>

              {/* Club CSI Note */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border border-orange-500/30">
                <div className="flex items-center gap-2 text-orange-400 font-semibold mb-2">
                  <Heart className="w-4 h-4 text-orange-400" />
                  <h3>CSI Portes Ouvertes 2026</h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Ce mini CTF a été conçu par le <strong>Club Scientifique Informatique (CSI)</strong> pour accueillir les étudiants de première année (L1). N&apos;hésite pas à échanger avec les membres du club pour découvrir nos projets et nos ateliers de cybersécurité !
                </p>
              </div>
            </div>

            {/* Footer Button */}
            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-400 hover:to-orange-400 text-white font-medium text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 font-mono cursor-pointer"
              >
                C&apos;est parti, aux missions !
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
