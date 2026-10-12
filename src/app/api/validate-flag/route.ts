import { NextResponse } from "next/server";

const SECRET_FLAGS: Record<string, string> = {
  // Slugs
  "image-mysterieuse": "CTF{attribut_alt_toujours_utile}",
  "cle-fragmentee": "CTF{python_c_est_simple}",
  "langage-hackers": "CTF{leet_speak_est_facile}",
  "secret-serveur": "CTF{headers_http_receptionnes}",
  "bouton-interdit": "CTF{bouton_debloque_succes}",
  "commentaire-invisible": "CTF{css_inspection_reussie}",
  "mot-de-passe-decoupe": "CTF{CYB_SEC}",
  "message-decale": "CTF{facile}",
  "message-oublie": "CTF{vigenere_demystifie}",
  "dernier-cryptogramme": "CTF{substitution_maitrisee}",

  // Number / ID aliases
  "1": "CTF{attribut_alt_toujours_utile}",
  "2": "CTF{python_c_est_simple}",
  "3": "CTF{leet_speak_est_facile}",
  "4": "CTF{headers_http_receptionnes}",
  "5": "CTF{bouton_debloque_succes}",
  "6": "CTF{css_inspection_reussie}",
  "7": "CTF{CYB_SEC}",
  "8": "CTF{facile}",
  "9": "CTF{vigenere_demystifie}",
  "10": "CTF{substitution_maitrisee}",
  "01": "CTF{attribut_alt_toujours_utile}",
  "02": "CTF{python_c_est_simple}",
  "03": "CTF{leet_speak_est_facile}",
  "04": "CTF{headers_http_receptionnes}",
  "05": "CTF{bouton_debloque_succes}",
  "06": "CTF{css_inspection_reussie}",
  "07": "CTF{CYB_SEC}",
  "08": "CTF{facile}",
  "09": "CTF{vigenere_demystifie}",

  // Backward compatibility aliases
  "profil-oublie": "CTF{vigenere_demystifie}",
  "acces-autorise": "CTF{substitution_maitrisee}",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { challengeId, flag } = body;

    if (!challengeId || typeof flag !== "string") {
      return NextResponse.json(
        { valid: false, message: "Requête invalide : identifiant ou flag manquant." },
        { status: 400 }
      );
    }

    // Exact comparison after trimming surrounding whitespace
    const cleanFlag = flag.trim();
    const expectedFlag = SECRET_FLAGS[challengeId];

    if (!expectedFlag) {
      return NextResponse.json(
        { valid: false, message: "Mission introuvable." },
        { status: 404 }
      );
    }

    if (
      cleanFlag === expectedFlag ||
      cleanFlag.toLowerCase() === expectedFlag.toLowerCase()
    ) {
      return NextResponse.json({
        valid: true,
        message: "Flag correct ! Mission validée avec succès.",
      });
    }

    return NextResponse.json({
      valid: false,
      message: "Ce n'est pas le bon flag. Continue à chercher !",
    });
  } catch (error) {
    console.error("Flag validation error:", error);
    return NextResponse.json(
      { valid: false, message: "Erreur serveur lors de la validation." },
      { status: 500 }
    );
  }
}
