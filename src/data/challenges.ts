export interface Challenge {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: "WEB" | "ENCODING";
  difficulty: "VERY EASY" | "TRÈS FACILE";
  points: number;
  shortDescription: string;
  missionDescription: string;
  objective: string;
  flag: string;
  hints: string[];
  encodedValue?: string;
  htmlCommentFlag?: string;
  explanationAfterSuccess?: string;
  nextChallengeSlug?: string;
  educationalTip: string;
}

export const CHALLENGES: Challenge[] = [
  {
    id: "source-code",
    slug: "source-code",
    number: "01",
    title: "SOURCE: SECRET",
    category: "WEB",
    difficulty: "VERY EASY",
    points: 100,
    shortDescription: "Une information secrète se cache dans cette page.\nSaurez-vous la retrouver ?",
    missionDescription:
      "Quelqu'un a laissé une information secrète dans cette page.\n\nLes développeurs laissent parfois des traces là où on ne les attend pas.\n\nVotre mission:\nretrouver le flag.",
    objective: "Find the hidden flag.",
    flag: "FLAG{CSI_SOURCE_CODE}",
    htmlCommentFlag: "<!-- FLAG{CSI_SOURCE_CODE} -->",
    hints: [
      "Les navigateurs reçoivent beaucoup plus d'informations que ce que tu vois à l'écran.",
      "Essaie d'utiliser F12 ou d'inspecter le code de la page.",
    ],
    educationalTip:
      "Astuce : En cybersécurité web, l'inspection du code source HTML/JS (via clic droit > Inspecter ou la touche F12) est la première étape élémentaire pour comprendre le fonctionnement d'une application.",
    nextChallengeSlug: "base64",
  },
  {
    id: "base64",
    slug: "base64",
    number: "02",
    title: "ENCODED: ROSE",
    category: "ENCODING",
    difficulty: "VERY EASY",
    points: 100,
    shortDescription: "Un message incompréhensible...\nou simplement encodé ?",
    missionDescription:
      "Ce message semble incompréhensible.\n\nMais est-il réellement chiffré ?\n\nTrouve comment le décoder.",
    objective: "Décoder la chaîne de caractères pour extraire le flag.",
    flag: "FLAG{CSI_OCTOBRE_ROSE_CTF}",
    encodedValue: "RkxBR3tDU0lfT0NUT0JSRV9ST1NFX0NURn0=",
    hints: [
      "Tous les messages illisibles ne sont pas chiffrés.",
      "Recherche ce qu'est Base64.",
    ],
    explanationAfterSuccess:
      "Bravo !\n\nTu viens de découvrir Base64.\n\nBase64 est un encodage, pas un système de chiffrement.",
    educationalTip:
      "Différence clé : Un encodage (comme Base64) transforme des données sans clé secrète (tout le monde peut le décoder facilement). Un chiffrement (comme AES ou RSA) nécessite une clé pour être déchiffré.",
  },
];

export const TOTAL_CHALLENGES = CHALLENGES.length;
export const MAX_POINTS = CHALLENGES.reduce((acc, c) => acc + c.points, 0);

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return CHALLENGES.find((c) => c.slug === slug);
}
