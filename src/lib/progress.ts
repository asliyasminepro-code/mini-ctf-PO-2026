import { useEffect, useState } from "react";
import { CHALLENGES, MAX_POINTS, TOTAL_CHALLENGES } from "@/data/challenges";

const STORAGE_KEY = "csi_ctf_progress_2026";
const EVENT_NAME = "ctf_progress_updated";

export interface ProgressState {
  solved: string[]; // List of challenge ids/slugs
  score: number;
  totalChallenges: number;
  maxScore: number;
  completedAt: Record<string, string>;
  isLoaded: boolean;
}

const defaultState: ProgressState = {
  solved: [],
  score: 0,
  totalChallenges: TOTAL_CHALLENGES,
  maxScore: MAX_POINTS,
  completedAt: {},
  isLoaded: false,
};

function readStorage(): Omit<ProgressState, "isLoaded" | "totalChallenges" | "maxScore"> {
  if (typeof window === "undefined") {
    return { solved: [], score: 0, completedAt: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { solved: [], score: 0, completedAt: {} };
    const parsed = JSON.parse(raw);
    const solved: string[] = Array.isArray(parsed.solved) ? parsed.solved : [];
    // Compute score based on solved challenges matching data
    const score = CHALLENGES.filter((c) => solved.includes(c.id)).reduce(
      (acc, c) => acc + c.points,
      0
    );
    const completedAt = parsed.completedAt || {};
    return { solved, score, completedAt };
  } catch (e) {
    console.error("Error reading CTF progress:", e);
    return { solved: [], score: 0, completedAt: {} };
  }
}

function writeStorage(solved: string[], completedAt: Record<string, string>): void {
  if (typeof window === "undefined") return;
  try {
    const data = {
      solved,
      completedAt,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }));
  } catch (e) {
    console.error("Error writing CTF progress:", e);
  }
}

export function solveChallenge(challengeId: string): boolean {
  const current = readStorage();
  if (current.solved.includes(challengeId)) {
    return false; // Already solved
  }

  const updatedSolved = [...current.solved, challengeId];
  const updatedCompletedAt = {
    ...current.completedAt,
    [challengeId]: new Date().toISOString(),
  };

  writeStorage(updatedSolved, updatedCompletedAt);
  return true;
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { solved: [], completedAt: {} } }));
}

export function isChallengeSolved(challengeId: string): boolean {
  const current = readStorage();
  return current.solved.includes(challengeId);
}

export function useCTFProgress(): ProgressState {
  const [state, setState] = useState<ProgressState>(defaultState);

  useEffect(() => {
    const syncState = () => {
      const data = readStorage();
      setState({
        solved: data.solved,
        score: data.score,
        totalChallenges: TOTAL_CHALLENGES,
        maxScore: MAX_POINTS,
        completedAt: data.completedAt,
        isLoaded: true,
      });
    };

    // Initial sync on mount
    syncState();

    const handleUpdate = () => syncState();
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return state;
}
