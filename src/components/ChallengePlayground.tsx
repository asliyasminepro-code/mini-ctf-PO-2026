"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Server,
  Network,
  Eye,
  FileCode,
  Binary,
  ShieldAlert,
  Terminal,
  Layers,
  Sparkles,
  RefreshCw,
  ExternalLink,
  KeyRound,
  AlertTriangle,
} from "lucide-react";
import { Challenge } from "@/data/challenges";
import { cyberAudio } from "@/lib/sound";

interface ChallengePlaygroundProps {
  challenge: Challenge;
}

// ========================================================
// CHALLENGE 01: L'image mystérieuse (HTML Inspection)
// ========================================================
function Challenge1Image() {
  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-[#070913] p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
          <Eye className="w-4 h-4" />
          <span>INSPECTION D&apos;ÉLÉMENT HTML</span>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">TAG: &lt;img&gt;</span>
      </div>

      <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-[#0e1222]/80 border border-zinc-800 text-center space-y-4">
        <div className="p-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-950/60 inline-flex flex-col items-center">
          <img
            src="/images/image_introuvable.jpg"
            alt="CTF{attribut_alt_toujours_utile}"
            className="w-28 h-28 object-contain rounded-lg border border-zinc-800 bg-zinc-900/60 text-transparent"
          />
          <span className="text-[11px] text-zinc-500 font-mono mt-2 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            Image non chargée (404 Not Found)
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 max-w-md font-mono leading-relaxed">
          Cette image refuse de charger. Fais un <strong className="text-white">clic droit</strong> dessus &rarr; <span className="text-cyan-400">« Inspecter »</span> (ou appuie sur <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-white">F12</kbd>) pour examiner ses attributs HTML dans l&apos;inspecteur d&apos;éléments !
        </p>
      </div>
    </div>
  );
}

// ========================================================
// CHALLENGE 02: La clé fragmentée (Python Concatenation)
// ========================================================
function Challenge2Code({ challenge }: { challenge: Challenge }) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      cyberAudio?.playClick();
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-[#070913] overflow-hidden shadow-xl font-mono">
      <div className="px-5 py-3 bg-[#0e1222] border-b border-[#1f2744] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-zinc-600 mx-1.5">|</span>
          <span className="text-xs text-zinc-300 flex items-center gap-1.5 font-bold">
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            verifier_cle.py
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleCopy(challenge.codeSnippet || "")}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer"
        >
          {copiedSnippet ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>COPIÉ !</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPIER LE CODE</span>
            </>
          )}
        </button>
      </div>

      <div className="p-5 sm:p-6 bg-[#070913] overflow-x-auto text-xs sm:text-sm">
        <pre className="text-zinc-200 leading-relaxed">
          <code>
            <span className="text-cyan-400">partie_a</span> = <span className="text-emerald-400">&quot;CTF&#123;py&quot;</span>{"\n"}
            <span className="text-cyan-400">partie_b</span> = <span className="text-emerald-400">&quot;thon_c_&quot;</span>{"\n"}
            <span className="text-cyan-400">partie_c</span> = <span className="text-emerald-400">&quot;est_simple&#125;&quot;</span>{"\n\n"}
            <span className="text-orange-400">cle_exacte</span> = <span className="text-cyan-400">partie_a</span> + <span className="text-cyan-400">partie_b</span> + <span className="text-cyan-400">partie_c</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

// ========================================================
// CHALLENGE 03: Le langage des hackers (Leet Speak)
// ========================================================
function Challenge3Leet({ challenge }: { challenge: Challenge }) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      cyberAudio?.playClick();
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="rounded-2xl border border-cyan-500/30 bg-[#070913] p-6 sm:p-7 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Binary className="w-4 h-4" />
            MESSAGE CHIFFRÉ (LEET SPEAK)
          </span>
          <button
            type="button"
            onClick={() => handleCopy(challenge.encodedValue || "")}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs cursor-pointer"
          >
            {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSnippet ? "Copié" : "Copier"}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-[#0e1222] border border-cyan-500/40 text-center select-all">
          <div className="text-xl sm:text-2xl md:text-3xl font-black text-cyan-300 tracking-wider cyber-text-glow-cyan break-all">
            {challenge.encodedValue}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-orange-500/30 bg-[#0e1222]/80 p-5 sm:p-6 shadow-xl">
        <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Layers className="w-4 h-4" />
          TABLE DE CONVERSION OFFICIELLE
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {challenge.conversionTable?.map((item) => (
            <div
              key={item.from}
              className="p-3 rounded-xl bg-[#070913] border border-zinc-800 text-center hover:border-orange-500/50 transition-colors"
            >
              <span className="text-xl font-bold text-orange-400">{item.from}</span>
              <span className="text-zinc-500 mx-2">&rarr;</span>
              <span className="text-xl font-bold text-cyan-400">{item.to}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-400 mt-4 text-center">
          Remplace chaque chiffre du message par sa lettre associée, puis soumets le flag décodé.
        </p>
      </div>
    </div>
  );
}

// ========================================================
// CHALLENGE 04: Le secret du serveur (HTTP Headers)
// ========================================================
function Challenge4Server() {
  const [serverRequestStatus, setServerRequestStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverResponseBody, setServerResponseBody] = useState<string | null>(null);

  const handleQueryServer = async () => {
    cyberAudio?.playClick();
    setServerRequestStatus("loading");
    try {
      const res = await fetch("/api/secret-server", {
        cache: "no-store",
      });
      const data = await res.json();
      setServerResponseBody(JSON.stringify(data, null, 2));
      setServerRequestStatus("success");
      cyberAudio?.playBeep(1000, 0.05);
    } catch {
      setServerRequestStatus("error");
      setServerResponseBody("Erreur lors de la communication avec le serveur.");
      cyberAudio?.playAccessDenied();
    }
  };

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-[#070913] p-6 sm:p-8 space-y-6 shadow-xl font-mono">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Network className="w-4 h-4" />
          <span>TERMINAL DE COMMUNICATION HTTP</span>
        </div>
        <span className="text-[11px] text-zinc-500">ENDPOINT: /api/secret-server</span>
      </div>

      <div className="p-6 rounded-xl bg-[#0e1222] border border-zinc-800 text-center space-y-4">
        <button
          type="button"
          onClick={handleQueryServer}
          disabled={serverRequestStatus === "loading"}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 hover:from-cyan-400 hover:to-orange-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        >
          <Server className="w-4 h-4" />
          <span>INTERROGER LE SERVEUR</span>
        </button>

        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Clique sur le bouton pour déclencher une requête HTTP authentique vers l&apos;API locale.
        </p>
      </div>

      {serverRequestStatus !== "idle" && (
        <div className="p-4 rounded-xl bg-[#070913] border border-cyan-500/40 text-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Statut de la réponse :</span>
            {serverRequestStatus === "loading" ? (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" /> ENVOI EN COURS...
              </span>
            ) : serverRequestStatus === "success" ? (
              <span className="text-emerald-400 font-bold">200 OK • Requête reçue</span>
            ) : (
              <span className="text-rose-400 font-bold">Erreur de communication</span>
            )}
          </div>

          {serverResponseBody && (
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 overflow-x-auto">
              <pre>{serverResponseBody}</pre>
            </div>
          )}

          <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-cyan-300">
              <Eye className="w-3.5 h-3.5" /> COMMENT TROUVER LE FLAG DANS DEVTOOLS :
            </div>
            <ol className="list-decimal list-inside space-y-1 text-xs text-zinc-300">
              <li>Ouvre les outils de développement (<kbd className="px-1 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-white">F12</kbd>).</li>
              <li>Clique sur l&apos;onglet <strong className="text-white">Network (Réseau)</strong>.</li>
              <li>Clique à nouveau sur <span className="text-cyan-400">« Interroger le serveur »</span> si nécessaire.</li>
              <li>Sélectionne la requête <code className="text-orange-400">secret-server</code> dans la liste.</li>
              <li>Regarde dans l&apos;onglet <strong className="text-white">Headers (En-têtes)</strong> &rarr; section <strong className="text-white">Response Headers</strong>.</li>
              <li>Trouve l&apos;en-tête secret : <code className="text-cyan-400 font-bold">X-Secret-Flag</code> !</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================================================
// CHALLENGE 05: Le bouton interdit (DOM Manipulation)
// ========================================================
function Challenge5Button() {
  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-[#070913] p-6 sm:p-8 space-y-6 shadow-xl font-mono">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Eye className="w-4 h-4" />
          <span>MANIPULATION DU DOM EN TEMPS RÉEL</span>
        </div>
        <span className="text-[11px] text-zinc-500">ATTRIBUT: disabled</span>
      </div>

      <div className="p-8 rounded-xl bg-[#0e1222] border border-zinc-800 text-center space-y-5">
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
          Ce bouton est verrouillé par un attribut HTML. Inspecte son code dans l&apos;onglet <strong className="text-white">Elements</strong> de F12, retire l&apos;attribut <code className="text-orange-400 font-bold">disabled</code>, puis clique dessus !
        </p>

        <div
          className="py-4"
          dangerouslySetInnerHTML={{
            __html: `<button id="challenge-forbidden-btn" disabled onclick="alert('CTF{bouton_debloque_succes}')" class="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-mono font-bold uppercase tracking-wider text-xs sm:text-sm disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed hover:enabled:scale-105 hover:enabled:shadow-[0_0_20px_rgba(255,102,0,0.6)] transition-all cursor-pointer">Cliquer pour voir le flag</button>`,
          }}
        />

        <div className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
          <span>💡 Astuce : Double-clique sur le mot</span>
          <code className="text-rose-400 bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800">disabled</code>
          <span>dans F12 et supprime-le avec la touche Retour.</span>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// CHALLENGE 06: Le commentaire invisible (CSS Inspection)
// ========================================================
function Challenge6Css() {
  // Safe client-side stylesheet loading to prevent SSR hydration mismatch and ESLint no-css-tags warning
  useEffect(() => {
    if (typeof document !== "undefined") {
      const existing = document.querySelector('link[data-ctf-style="true"]');
      if (!existing) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/style.css";
        link.setAttribute("data-ctf-style", "true");
        document.head.appendChild(link);
      }
    }
  }, []);

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-[#070913] p-6 sm:p-8 space-y-6 shadow-xl font-mono">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <FileCode className="w-4 h-4" />
          <span>FEUILLE DE STYLE EXTERNE CHARGÉE</span>
        </div>
        <span className="text-[11px] text-zinc-500">FICHIER: /style.css</span>
      </div>

      <div className="p-6 rounded-xl bg-[#0e1222] border border-zinc-800 space-y-4 text-xs sm:text-sm text-zinc-300">
        <p className="leading-relaxed">
          Une feuille de style CSS externe nommée <code className="text-cyan-400 font-bold">style.css</code> a été chargée par cette page. Un développeur y a laissé un commentaire secret.
        </p>

        <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
          <div className="text-orange-400 font-bold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> COMMENT INSPECTER DANS DEVTOOLS :
          </div>
          <ul className="list-disc list-inside space-y-1 text-zinc-400">
            <li>Appuie sur <kbd className="px-1 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-white">F12</kbd> &rarr; Onglet <strong className="text-white">Sources</strong>.</li>
            <li>Dans l&apos;arborescence des fichiers du site, cherche <code className="text-cyan-400">style.css</code>.</li>
            <li>Clique dessus pour ouvrir son contenu et lire le commentaire !</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// CHALLENGE 07: Le mot de passe découpé (Python Slicing)
// ========================================================
function Challenge7Slicing({ challenge }: { challenge: Challenge }) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      cyberAudio?.playClick();
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-[#070913] overflow-hidden shadow-xl font-mono">
      <div className="px-5 py-3 bg-[#0e1222] border-b border-[#1f2744] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-zinc-600 mx-1.5">|</span>
          <span className="text-xs text-zinc-300 flex items-center gap-1.5 font-bold">
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            slicing_password.py
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleCopy(challenge.codeSnippet || "")}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer"
        >
          {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedSnippet ? "COPIÉ !" : "COPIER LE SCRIPT"}</span>
        </button>
      </div>

      <div className="p-5 sm:p-6 bg-[#070913] overflow-x-auto text-xs sm:text-sm">
        <pre className="text-zinc-200 leading-relaxed">
          <code>
            <span className="text-cyan-400">mot_1</span> = <span className="text-emerald-400">&quot;CYBER&quot;</span>{"\n"}
            <span className="text-cyan-400">mot_2</span> = <span className="text-emerald-400">&quot;SECURITE&quot;</span>{"\n\n"}
            <span className="text-orange-400">combinaison</span> = <span className="text-cyan-400">mot_1</span>[<span className="text-amber-400">0:3</span>] + <span className="text-emerald-400">&quot;_&quot;</span> + <span className="text-cyan-400">mot_2</span>[<span className="text-amber-400">0:3</span>]{"\n\n"}
            <span className="text-orange-400">flag</span> = <span className="text-emerald-400">f&quot;CTF&#123;&#123;<span className="text-orange-400">combinaison</span>&#125;&#125;&quot;</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

// ========================================================
// CHALLENGE 08: Le message décalé (Caesar Cryptography)
// ========================================================
function Challenge8Caesar({ challenge }: { challenge: Challenge }) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      cyberAudio?.playClick();
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="rounded-2xl border border-cyan-500/30 bg-[#070913] p-6 sm:p-7 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Binary className="w-4 h-4" />
            MESSAGE CHIFFRÉ PAR CÉSAR (+1)
          </span>
          <button
            type="button"
            onClick={() => handleCopy(challenge.encodedValue || "")}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs cursor-pointer"
          >
            {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSnippet ? "Copié" : "Copier"}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-[#0e1222] border border-cyan-500/40 text-center select-all">
          <div className="text-2xl sm:text-3xl md:text-4xl font-black text-cyan-300 tracking-wider cyber-text-glow-cyan break-all">
            {challenge.encodedValue}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-orange-500/30 bg-[#0e1222]/80 p-5 sm:p-6 shadow-xl text-xs text-zinc-300 space-y-3">
        <div className="text-xs text-orange-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          RÈGLE DU DÉCHIFFREMENT (ROTATION -1)
        </div>
        <p className="leading-relaxed">
          Chaque lettre a été décalée d&apos;une position vers l&apos;avant dans l&apos;alphabet :
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs font-bold">
          <div className="p-2 rounded bg-[#070913] border border-zinc-800"><span className="text-cyan-400">D</span> &rarr; <span className="text-emerald-400">C</span></div>
          <div className="p-2 rounded bg-[#070913] border border-zinc-800"><span className="text-cyan-400">U</span> &rarr; <span className="text-emerald-400">T</span></div>
          <div className="p-2 rounded bg-[#070913] border border-zinc-800"><span className="text-cyan-400">G</span> &rarr; <span className="text-emerald-400">F</span></div>
          <div className="p-2 rounded bg-[#070913] border border-zinc-800"><span className="text-cyan-400">g</span> &rarr; <span className="text-emerald-400">f</span></div>
          <div className="p-2 rounded bg-[#070913] border border-zinc-800"><span className="text-cyan-400">b</span> &rarr; <span className="text-emerald-400">a</span></div>
          <div className="p-2 rounded bg-[#070913] border border-zinc-800"><span className="text-cyan-400">...</span> &rarr; <span className="text-emerald-400">...</span></div>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// CHALLENGE 09: Le message oublié (Vigenère Cipher)
// ========================================================
function Challenge9Vigenere({ challenge }: { challenge: Challenge }) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const ciphertext = challenge.encodedValue || "ERG{zzicoiig_bfqpurjjzg}";
  const cipherKey = challenge.cipherKey || "CYBER";
  const dCodeUrl = challenge.dCodeUrl || "https://www.dcode.fr/chiffre-vigenere";

  const handleCopyCipher = async () => {
    try {
      await navigator.clipboard.writeText(ciphertext);
      cyberAudio?.playClick();
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(cipherKey);
      cyberAudio?.playClick();
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Ciphertext Card */}
      <div className="rounded-2xl border border-cyan-500/30 bg-[#070913] p-6 sm:p-7 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3 mb-4">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Binary className="w-4 h-4" />
            MESSAGE CHIFFRÉ (VIGENÈRE)
          </span>
          <button
            type="button"
            onClick={handleCopyCipher}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30 text-xs cursor-pointer font-bold transition-colors shadow-sm"
          >
            {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSnippet ? "Cryptogramme copié !" : "Copier le message chiffré"}</span>
          </button>
        </div>

        <div className="p-5 rounded-xl bg-[#0e1222] border border-cyan-500/40 text-center select-all">
          <div className="text-2xl sm:text-3xl md:text-4xl font-black text-cyan-300 tracking-wider cyber-text-glow-cyan break-all">
            {ciphertext}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
          <span>Chiffrement : Vigenère (alphabet latin 26 lettres)</span>
          <span className="text-zinc-500">Ponctuation et accolades préservées</span>
        </div>
      </div>

      {/* Key & Decryption Tools Info */}
      <div className="rounded-2xl border border-orange-500/30 bg-[#0e1222]/90 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">
              MOT-CLÉ INTERCEPTÉ
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyKey}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-500/15 text-orange-300 hover:bg-orange-500/25 border border-orange-500/30 text-xs font-bold cursor-pointer transition-colors"
          >
            {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey ? "Clé copiée !" : "Copier la clé"}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#070913] border border-zinc-800">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] text-zinc-500 block">CLÉ DE DÉCHIFFREMENT :</span>
            <span className="text-2xl font-black text-orange-400 tracking-widest cyber-text-glow-orange">
              {cipherKey}
            </span>
          </div>

          {/* Clickable dCode Link */}
          <a
            href={dCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            <span>Ouvrir l&apos;outil dCode Vigenère</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Security Warning Box */}
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200/90 text-xs flex items-start gap-2.5 font-sans">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Avertissement de sécurité :</strong> dCode est un service externe indépendant. En cybersécurité, ne copiez jamais de données personnelles ou confidentielles sur des plateformes en ligne — utilisez-le uniquement pour les données d&apos;exercice de ce challenge.
          </p>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// CHALLENGE 10: Le dernier cryptogramme (Substitution)
// ========================================================
function Challenge10Substitution({ challenge }: { challenge: Challenge }) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const ciphertext = challenge.encodedValue || "";
  const dCodeUrl = challenge.dCodeUrl || "https://www.dcode.fr/chiffre-substitution";

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      cyberAudio?.playClick();
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Ciphertext Card */}
      <div className="rounded-2xl border border-orange-500/40 bg-[#070913] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-400" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">
              TRANSMISSION FINALE ARCHIVÉE (SUBSTITUTION SANS CLÉ)
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(ciphertext)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/15 text-orange-300 hover:bg-orange-500/25 border border-orange-500/30 text-xs font-bold cursor-pointer transition-colors shadow-sm"
          >
            {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSnippet ? "Cryptogramme copié !" : "Copier la transmission"}</span>
          </button>
        </div>

        {/* Full Formatted Ciphertext Block */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#0e1222] border border-orange-500/30 text-zinc-100 text-sm sm:text-base leading-relaxed tracking-wide select-all break-words shadow-inner">
          {ciphertext}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
          <span>Technique : Substitution monoalphabétique</span>
          <span className="text-orange-400 font-bold">Aucune clé fournie</span>
        </div>
      </div>

      {/* Cryptanalysis Guidance & dCode Tool */}
      <div className="rounded-2xl border border-cyan-500/30 bg-[#0e1222]/90 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>OUTIL DE CRYPTANALYSE EXTERNE</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#070913] border border-zinc-800">
          <div className="space-y-1 text-center sm:text-left text-xs">
            <p className="text-white font-bold">Analyse automatique par dCode</p>
            <p className="text-zinc-400">
              L&apos;outil dCode analyse les fréquences de lettres et les motifs de mots pour reconstituer l&apos;alphabet de substitution.
            </p>
          </div>

          {/* Clickable dCode Link */}
          <a
            href={dCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
          >
            <span>Ouvrir dCode Substitution</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Security Warning Box */}
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200/90 text-xs flex items-start gap-2.5 font-sans">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Avertissement de sécurité :</strong> dCode est un service tiers externe. Dans le cadre de ce challenge, collez uniquement le cryptogramme fourni ci-dessus, et aucune information privée ou personnelle.
          </p>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// MAIN COMPONENT DISPATCHER
// ========================================================
export default function ChallengePlayground({ challenge }: ChallengePlaygroundProps) {
  const challengeId = challenge.id;
  const challengeSlug = challenge.slug;

  return (
    <div className="space-y-6">
      {(challengeSlug === "image-mysterieuse" || challengeId === "1") && (
        <Challenge1Image />
      )}

      {(challengeSlug === "cle-fragmentee" || challengeId === "2") && challenge.codeSnippet && (
        <Challenge2Code challenge={challenge} />
      )}

      {(challengeSlug === "langage-hackers" || challengeId === "3") && (
        <Challenge3Leet challenge={challenge} />
      )}

      {(challengeSlug === "secret-serveur" || challengeId === "4") && (
        <Challenge4Server />
      )}

      {(challengeSlug === "bouton-interdit" || challengeId === "5") && (
        <Challenge5Button />
      )}

      {(challengeSlug === "commentaire-invisible" || challengeId === "6") && (
        <Challenge6Css />
      )}

      {(challengeSlug === "mot-de-passe-decoupe" || challengeId === "7") && challenge.codeSnippet && (
        <Challenge7Slicing challenge={challenge} />
      )}

      {(challengeSlug === "message-decale" || challengeId === "8") && (
        <Challenge8Caesar challenge={challenge} />
      )}

      {(challengeSlug === "message-oublie" || challengeId === "9" || challenge.number === "09" || challengeSlug === "profil-oublie") && (
        <Challenge9Vigenere challenge={challenge} />
      )}

      {(challengeSlug === "dernier-cryptogramme" || challengeId === "10" || challenge.number === "10" || challengeSlug === "acces-autorise") && (
        <Challenge10Substitution challenge={challenge} />
      )}
    </div>
  );
}
