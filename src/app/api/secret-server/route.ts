import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json(
    {
      status: "success",
      message: "Connexion établie avec le serveur CSI 2026. Examinez les en-têtes HTTP de cette réponse !",
      endpoint: "/api/secret-server",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );

  // Return the authentic X-Secret-Flag header as required by Challenge 4
  response.headers.set("X-Secret-Flag", "CTF{headers_http_receptionnes}");
  response.headers.set("Access-Control-Expose-Headers", "X-Secret-Flag");
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

  return response;
}
