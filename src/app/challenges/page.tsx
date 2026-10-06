import ChallengeGrid from "@/components/ChallengeGrid";

export const metadata = {
  title: "Missions CTF — CSI Portes Ouvertes 2026",
  description: "Choisis ta mission de cybersécurité parmi les challenges disponibles.",
};

export default function ChallengesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <ChallengeGrid />
    </div>
  );
}
