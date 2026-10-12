export type ChallengeCategory =
  | "HTML Inspection"
  | "Python"
  | "Encoding & Substitution"
  | "HTTP Headers"
  | "DOM Manipulation"
  | "CSS Inspection"
  | "Python Strings"
  | "Classical Cryptography"
  | "JSON Inspection"
  | "Python Logic";

export type ChallengeDifficulty =
  | "TRÈS FACILE"
  | "FACILE"
  | "MOYEN"
  | "DIFFILE"
  | "EXPERT DÉBUTANT";

export interface Challenge {
  id: string;
  slug: string;
  number: string;
  level: 1 | 2 | 3;
  levelTitle: string;
  title: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  points: number;
  shortDescription: string;
  missionDescription: string;
  objective: string;
  hints: string[];
  educationalTip: string;
  nextChallengeSlug?: string;
  prevChallengeSlug?: string;
  codeSnippet?: string;
  codeLanguage?: string;
  encodedValue?: string;
  conversionTable?: Array<{ from: string; to: string }>;
  cipherKey?: string;
  dCodeUrl?: string;
}

export const CHALLENGES: Challenge[] = [
  // ==========================================
  // LEVEL 1 — PREMIERS PAS
  // ==========================================
  {
    id: "1",
    slug: "image-mysterieuse",
    number: "01",
    level: 1,
    levelTitle: "LEVEL 1 — PREMIERS PAS",
    title: "L'image mystérieuse",
    category: "HTML Inspection",
    difficulty: "TRÈS FACILE",
    points: 100,
    shortDescription: "Une image ne s'affiche pas correctement sur cette page.\nUn secret se cache dans ses attributs HTML.",
    missionDescription:
      "Une image ne s'affiche pas correctement sur cette page. Une petite icône d'image cassée apparaît.\n\nOuvre les outils de développement avec F12, puis inspecte le code HTML de l'image.\n\nUn indice important se cache dans ses attributs. Retrouve le flag !",
    objective: "Inspecter la balise <img> avec les DevTools et retrouver le flag dans l'attribut alt.",
    hints: [
      "Inspecte l'image avec les outils de développement (clic droit > Inspecter ou F12).",
      "Regarde les attributs de la balise <img> dans l'onglet Elements.",
      "L'attribut alt contient une information intéressante.",
    ],
    educationalTip:
      "L'attribut 'alt' fournit une description textuelle alternative quand une image ne peut pas se charger. En sécurité web, l'inspection minutieuse de tous les attributs HTML d'une page (alt, data-*, title, hidden) est un réflexe fondamental.",
    nextChallengeSlug: "cle-fragmentee",
  },
  {
    id: "2",
    slug: "cle-fragmentee",
    number: "02",
    level: 1,
    levelTitle: "LEVEL 1 — PREMIERS PAS",
    title: "La clé fragmentée",
    category: "Python",
    difficulty: "FACILE",
    points: 150,
    shortDescription: "Un programme assemble une clé secrète découpée en plusieurs variables.\nReconstitue la valeur finale.",
    missionDescription:
      "Un programme vérifie une clé secrète, mais celle-ci a été découpée en plusieurs morceaux.\n\nAnalyse les variables Python et reconstitue la clé en les assemblant dans le bon ordre.",
    objective: "Reconstituer la chaîne complète en observant la concaténation des variables.",
    codeSnippet: `partie_a = "CTF{py"
partie_b = "thon_c_"
partie_c = "est_simple}"

cle_exacte = partie_a + partie_b + partie_c`,
    codeLanguage: "python",
    hints: [
      "Observe les trois variables définies au début du script.",
      "L'opérateur + permet de concaténer (mettre bout à bout) des chaînes de caractères.",
      "Assemble les trois parties dans leur ordre d'apparition.",
    ],
    educationalTip:
      "En analyse de code et rétro-ingénierie, les développeurs fragmentent parfois les clés ou les mots de passe pour tromper des recherches automatisées (grep/strings). Comprendre le flux d'exécution permet de reconstituer le secret.",
    prevChallengeSlug: "image-mysterieuse",
    nextChallengeSlug: "langage-hackers",
  },
  {
    id: "3",
    slug: "langage-hackers",
    number: "03",
    level: 1,
    levelTitle: "LEVEL 1 — PREMIERS PAS",
    title: "Le langage des hackers",
    category: "Encoding & Substitution",
    difficulty: "FACILE",
    points: 150,
    shortDescription: "Un message a été encodé en Leet Speak.\nDécode chaque chiffre à l'aide de la table de conversion.",
    missionDescription:
      "Les hackers utilisent parfois le Leet Speak, un système dans lequel certains chiffres ressemblent à des lettres.\n\nDécode le message suivant à l'aide de la table de conversion.",
    objective: "Remplacer chaque chiffre du message chiffré par sa lettre correspondante pour soumettre le flag décodé.",
    encodedValue: "C7F{l337_5p34k_357_f4c1l3}",
    conversionTable: [
      { from: "7", to: "T" },
      { from: "3", to: "E" },
      { from: "5", to: "S" },
      { from: "4", to: "A" },
      { from: "1", to: "I" },
    ],
    hints: [
      "Certains chiffres remplacent des lettres dans le texte.",
      "Applique la table de correspondance caractère par caractère.",
      "Par exemple, 7 devient T et 3 devient E.",
    ],
    educationalTip:
      "Le Leet speak (1337) est apparu dans les années 1980 sur les BBS (Bulletin Board Systems) pour contourner les filtres textuels. C'est un exemple élémentaire de substitution mono-alphabétique.",
    prevChallengeSlug: "cle-fragmentee",
    nextChallengeSlug: "secret-serveur",
  },

  // ==========================================
  // LEVEL 2 — EXPLORATION
  // ==========================================
  {
    id: "4",
    slug: "secret-serveur",
    number: "04",
    level: 2,
    levelTitle: "LEVEL 2 — EXPLORATION",
    title: "Le secret du serveur",
    category: "HTTP Headers",
    difficulty: "MOYEN",
    points: 200,
    shortDescription: "Interroge l'API du serveur CSI et examine les en-têtes HTTP de réponse dans Network.",
    missionDescription:
      "Lorsqu'un navigateur communique avec un serveur, des informations sont transmises dans les en-têtes HTTP.\n\nOuvre les outils de développement, sélectionne l'onglet Network (Réseau), puis examine les en-têtes de la requête ou de la réponse de cette page.\n\nRetrouve l'en-tête secret !",
    objective: "Cliquer sur 'Interroger le serveur' et inspecter l'en-tête HTTP 'X-Secret-Flag' dans l'onglet Network de DevTools.",
    hints: [
      "Les réponses HTTP contiennent des en-têtes (Headers) de métadonnées invisibles sur la page.",
      "Sélectionne la requête 'secret-server' dans l'onglet Network.",
      "Cherche un en-tête de réponse personnalisé commençant par X-Secret.",
    ],
    educationalTip:
      "Les en-têtes HTTP (Headers) transportent des informations critiques comme les jetons d'autorisation, les politiques de sécurité (CSP) ou les cookies. Les développeurs laissent parfois des en-têtes personnalisés (préfixés par 'X-') qui divulguent des informations confidentielles.",
    prevChallengeSlug: "langage-hackers",
    nextChallengeSlug: "bouton-interdit",
  },
  {
    id: "5",
    slug: "bouton-interdit",
    number: "05",
    level: 2,
    levelTitle: "LEVEL 2 — EXPLORATION",
    title: "Le bouton interdit",
    category: "DOM Manipulation",
    difficulty: "MOYEN",
    points: 200,
    shortDescription: "Un bouton est désactivé côté navigateur.\nDébloque-le directement depuis l'inspecteur d'éléments.",
    missionDescription:
      "Un bouton semble désactivé et refuse de répondre à tes clics.\n\nInspecte son code HTML. Peux-tu comprendre pourquoi il est bloqué et comment le débloquer depuis les outils de développement ?",
    objective: "Supprimer l'attribut disabled dans le DOM pour cliquer sur le bouton et déclencher l'alerte contenant le flag.",
    hints: [
      "Inspecte le bouton dans l'onglet Elements de DevTools.",
      "Cherche un attribut HTML qui empêche le clic.",
      "Essaie de retirer l'attribut disabled directement dans l'inspecteur, puis clique sur le bouton.",
    ],
    educationalTip:
      "Principe fondamental en sécurité applicative : 'Ne jamais faire confiance au client'. Désactiver un bouton ou masquer un champ en HTML n'est qu'une commodité visuelle ; tout utilisateur peut modifier le DOM à la volée. Toute restriction doit être impérativement validée sur le serveur.",
    prevChallengeSlug: "secret-serveur",
    nextChallengeSlug: "commentaire-invisible",
  },
  {
    id: "6",
    slug: "commentaire-invisible",
    number: "06",
    level: 2,
    levelTitle: "LEVEL 2 — EXPLORATION",
    title: "Le commentaire invisible",
    category: "CSS Inspection",
    difficulty: "TRÈS FACILE",
    points: 100,
    shortDescription: "Un commentaire secret a été oublié dans la feuille de style CSS.\nRetrouve-le dans l'onglet Sources.",
    missionDescription:
      "Le fichier de style de cette page contient un commentaire laissé par un développeur.\n\nOuvre l'onglet Sources dans les outils de développement et cherche le fichier CSS utilisé par la page.",
    objective: "Ouvrir le fichier style.css dans l'onglet Sources de DevTools et localiser le commentaire contenant le flag.",
    hints: [
      "Explore les fichiers chargés par le navigateur dans l'onglet Sources (ou Réseau).",
      "Recherche le fichier style.css.",
      "Les commentaires CSS sont délimités par /* et */.",
    ],
    educationalTip:
      "Tout fichier envoyé au navigateur (CSS, JavaScript, HTML) est public. Laisser des identifiants, flags ou remarques internes dans des fichiers publics est une vulnérabilité d'exposition d'informations ('Information Disclosure').",
    prevChallengeSlug: "bouton-interdit",
    nextChallengeSlug: "mot-de-passe-decoupe",
  },
  {
    id: "7",
    slug: "mot-de-passe-decoupe",
    number: "07",
    level: 2,
    levelTitle: "LEVEL 2 — EXPLORATION",
    title: "Le mot de passe découpé",
    category: "Python Strings",
    difficulty: "MOYEN",
    points: 200,
    shortDescription: "Un script extrait des portions de chaînes avec du slicing Python.\nDétermine la valeur finale produite.",
    missionDescription:
      "Un script génère un flag en sélectionnant certaines lettres dans deux chaînes de caractères.\n\nAnalyse les opérations de slicing et détermine la valeur finale.",
    objective: "Résoudre les opérations de slicing [0:3] sur les deux chaînes et reconstituer le flag.",
    codeSnippet: `mot_1 = "CYBER"
mot_2 = "SECURITE"

combinaison = mot_1[0:3] + "_" + mot_2[0:3]

flag = f"CTF{{{combinaison}}}"`,
    codeLanguage: "python",
    hints: [
      "En Python, les indices de chaînes commencent à zéro (0).",
      "[0:3] extrait les trois premiers caractères (indices 0, 1 et 2).",
      "Combine les deux sous-chaînes avec le caractère séparateur _.",
    ],
    educationalTip:
      "La syntaxe [debut:fin] en Python extrait une portion de chaîne à partir de 'debut' (inclus) jusqu'à 'fin' (exclu). mot_1[0:3] extrait donc les indices 0, 1 et 2 ('CYB').",
    prevChallengeSlug: "commentaire-invisible",
    nextChallengeSlug: "message-decale",
  },

  // ==========================================
  // LEVEL 3 — AGENT CYBER
  // ==========================================
  {
    id: "8",
    slug: "message-decale",
    number: "08",
    level: 3,
    levelTitle: "LEVEL 3 — AGENT CYBER",
    title: "Le message décalé",
    category: "Classical Cryptography",
    difficulty: "MOYEN",
    points: 200,
    shortDescription: "Un message chiffré avec le chiffre de César (+1).\nDécale chaque lettre d'un cran vers l'arrière.",
    missionDescription:
      "Un message a été chiffré avec un décalage de César de +1.\n\nChaque lettre a été remplacée par la lettre suivante dans l'alphabet.\n\nPour retrouver le message original, décale chaque lettre d'une position vers l'arrière.",
    objective: "Appliquer un décalage inverse de -1 à chaque lettre du message chiffré DUG{gbdjmf}.",
    encodedValue: "DUG{gbdjmf}",
    hints: [
      "Chaque lettre du message chiffré a avancé d'une position dans l'alphabet (+1).",
      "Pour déchiffrer, effectue l'opération inverse : recule d'une position (-1).",
      "D devient C, U devient T et G devient F. Fais de même pour le contenu entre accolades !",
    ],
    educationalTip:
      "Le chiffre de César est l'une des plus anciennes techniques cryptographiques connues. C'est un chiffrement par substitution très vulnérable, car il n'existe que 25 décalages possibles dans l'alphabet latin, ce qui le rend trivial à casser par force brute.",
    prevChallengeSlug: "mot-de-passe-decoupe",
    nextChallengeSlug: "message-oublie",
  },
  {
    id: "9",
    slug: "message-oublie",
    number: "09",
    level: 3,
    levelTitle: "LEVEL 3 — AGENT CYBER",
    title: "Le message oublié",
    category: "Classical Cryptography",
    difficulty: "DIFFILE",
    points: 300,
    shortDescription: "Un message chiffré avec la méthode de Vigenère.\nUtilise le mot-clé CYBER et l'outil dCode pour retrouver le flag.",
    missionDescription:
      "Un message intercepté sur un ancien terminal du CSI semble incompréhensible.\n\nL'équipe d'investigation a découvert que son auteur utilisait un chiffrement de Vigenère. Une note retrouvée sur le terminal indique également le mot-clé utilisé.\n\nTa mission consiste à utiliser un outil de décryptage, retrouver le message original et soumettre le flag.",
    objective: "Déchiffrer le message chiffré par Vigenère avec la clé CYBER pour obtenir le flag.",
    encodedValue: "ERG{zzicoiig_bfqpurjjzg}",
    cipherKey: "CYBER",
    dCodeUrl: "https://www.dcode.fr/chiffre-vigenere",
    hints: [
      "Le chiffrement utilise un mot-clé qui influence le décalage de chaque lettre.",
      "Le chiffrement de Vigenère utilise une clé répétée sur le texte. La clé fournie est CYBER.",
      "Utilise l'outil Vigenère de dCode, saisis le texte chiffré et indique la clé CYBER, puis lance le déchiffrement.",
    ],
    educationalTip:
      "Le chiffrement de Vigenère est un chiffrement polyalphabétique inventé au XVIe siècle. Contrairement au chiffre de César qui utilise un décalage unique fixe, Vigenère utilise une clé dont chaque lettre définit un décalage différent, ce qui masque les fréquences simples de lettres.",
    prevChallengeSlug: "message-decale",
    nextChallengeSlug: "dernier-cryptogramme",
  },
  {
    id: "10",
    slug: "dernier-cryptogramme",
    number: "10",
    level: 3,
    levelTitle: "LEVEL 3 — AGENT CYBER",
    title: "Le dernier cryptogramme",
    category: "Classical Cryptography",
    difficulty: "EXPERT DÉBUTANT",
    points: 400,
    shortDescription: "Une transmission chiffrée par substitution monoalphabétique sans clé.\nAnalyse les répétitions et utilise la cryptanalyse dCode.",
    missionDescription:
      "Une dernière transmission a été retrouvée dans les archives du CSI.\n\nLe message a été chiffré à l'aide d'une substitution monoalphabétique : chaque lettre du message original est remplacée par une autre lettre selon une correspondance fixe.\n\nAucune clé n'est disponible.\n\nAnalyse les répétitions, utilise un outil de cryptanalyse pour rechercher une solution et retrouve le flag dissimulé dans le message.",
    objective: "Analyser le cryptogramme par substitution monoalphabétique pour déchiffrer le texte et extraire le flag final.",
    encodedValue:
      "Dj gjifsji pjvijo gm VPS jpo VOZ{pmqposomosnf_uxsoispjj}. Nqpjikj djp ijhjososnfp gjp djooijp jo djp unoszp gjp unop hnmi ijoinmkji dj ujppxaj nisasfxd.",
    dCodeUrl: "https://www.dcode.fr/chiffre-substitution",
    hints: [
      "Dans une substitution monoalphabétique, une même lettre du texte original est toujours remplacée par la même lettre chiffrée.",
      "Observe les lettres qui apparaissent le plus souvent, les répétitions et les motifs des mots. Ces indices peuvent aider à retrouver la correspondance.",
      "Utilise l'outil de substitution de dCode. Teste l'analyse automatique, examine le texte proposé et repère le flag dans le message déchiffré.",
    ],
    educationalTip:
      "La substitution monoalphabétique remplace chaque lettre par une autre selon un alphabet désordonné. Bien qu'il existe plus de 4×10^26 combinaisons d'alphabets possibles, ce chiffrement est vulnérable à l'analyse fréquentielle (la lettre 'E' est la plus fréquente en français) et à la reconnaissance des motifs de mots.",
    prevChallengeSlug: "message-oublie",
  },
];

export const TOTAL_CHALLENGES = CHALLENGES.length;
export const MAX_POINTS = CHALLENGES.reduce((acc, c) => acc + c.points, 0);

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return CHALLENGES.find(
    (c) =>
      c.slug === slug ||
      c.id === slug ||
      c.number === slug ||
      (slug === "profil-oublie" && c.id === "9") ||
      (slug === "acces-autorise" && c.id === "10")
  );
}

export function getChallengesByLevel(level: 1 | 2 | 3): Challenge[] {
  return CHALLENGES.filter((c) => c.level === level);
}
