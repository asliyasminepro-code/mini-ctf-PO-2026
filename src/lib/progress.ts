import { useEffect, useState } from "react";
import { CHALLENGES, MAX_POINTS, TOTAL_CHALLENGES, Challenge } from "@/data/challenges";

const STORAGE_KEY = "csi_ctf_progress_2026";
const EVENT_NAME = "ctf_progress_updated";

export interface ProgressState {
  solved: string[]; // List of canonical challenge IDs: "1", "2", ... "10"
  score: number;
  totalChallenges: number;
  maxScore: number;
  completedAt: Record<string, string>;
  isLoaded: boolean;
}

export const defaultState: ProgressState = {
  solved: [],
  score: 0,
  totalChallenges: TOTAL_CHALLENGES,
  maxScore: MAX_POINTS,
  completedAt: {},
  isLoaded: false,
};

/**
 * Finds a current challenge by ID or slug.
 * Returns null if the identifier is obsolete or invalid.
 */
export function getCanonicalChallenge(identifier: string): Challenge | null {
  if (!identifier || typeof identifier !== "string") return null;
  const trimmed = identifier.trim();
  const found = CHALLENGES.find(
    (c) => c.id === trimmed || c.slug === trimmed || c.number === trimmed
  );
  return found || null;
}

/**
 * Reconciles raw localStorage data against the canonical challenge dataset:
 * 1. Safe JSON parsing (handles malformed data without crashing)
 * 2. Prunes obsolete challenge IDs not in the current 10-challenge dataset
 * 3. Canonicalizes identifiers to challenge IDs ("1", "2", etc.)
 * 4. Deduplicates solved IDs (prevents double counting)
 * 5. Recalculates total score dynamically from current point definitions
 * 6. Bounds completed challenges between 0 and 10
 */
export function reconcileStorageData(rawJson: string | null): {
  solved: string[];
  score: number;
  completedAt: Record<string, string>;
} {
  if (!rawJson) {
    return { solved: [], score: 0, completedAt: {} };
  }

  try {
    const parsed = JSON.parse(rawJson);
    if (!parsed || typeof parsed !== "object") {
      return { solved: [], score: 0, completedAt: {} };
    }

    const rawSolved: unknown[] = Array.isArray(parsed.solved) ? parsed.solved : [];
    const rawCompletedAt: Record<string, string> =
      parsed.completedAt && typeof parsed.completedAt === "object"
        ? parsed.completedAt
        : {};

    const validSolvedSet = new Set<string>();
    const reconciledCompletedAt: Record<string, string> = {};

    for (const item of rawSolved) {
      if (typeof item !== "string") continue;
      const ch = getCanonicalChallenge(item);
      if (ch) {
        validSolvedSet.add(ch.id);
        const timestamp =
          rawCompletedAt[ch.id] ||
          rawCompletedAt[ch.slug] ||
          rawCompletedAt[item] ||
          new Date().toISOString();
        if (!reconciledCompletedAt[ch.id]) {
          reconciledCompletedAt[ch.id] = timestamp;
        }
      }
    }

    // Sort canonical IDs numerically ("1", "2", ... "10")
    const solved = Array.from(validSolvedSet).sort(
      (a, b) => parseInt(a, 10) - parseInt(b, 10)
    );

    // Calculate score solely from CURRENT active challenge definitions and validated completed IDs
    const score = CHALLENGES.filter((c) => validSolvedSet.has(c.id)).reduce(
      (acc, c) => acc + c.points,
      0
    );

    return { solved, score, completedAt: reconciledCompletedAt };
  } catch (error) {
    console.warn("Error reconciling CTF progress storage (reverting to empty state):", error);
    return { solved: [], score: 0, completedAt: {} };
  }
}

/**
 * Reads and validates client-side progress from localStorage.
 * Automatically saves the reconciled state back to localStorage if obsolete
 * or duplicate entries were purged.
 */
function readStorage(): {
  solved: string[];
  score: number;
  completedAt: Record<string, string>;
} {
  if (typeof window === "undefined") {
    return { solved: [], score: 0, completedAt: {} };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const reconciled = reconcileStorageData(raw);

    // Persist cleaned up data if localStorage contained duplicates or obsolete records
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const rawSolved = Array.isArray(parsed?.solved) ? parsed.solved : [];
        const isDirty =
          rawSolved.length !== reconciled.solved.length ||
          rawSolved.some((id: string) => !reconciled.solved.includes(id));

        if (isDirty) {
          writeStorage(reconciled.solved, reconciled.completedAt);
        }
      } catch {
        writeStorage(reconciled.solved, reconciled.completedAt);
      }
    }

    return reconciled;
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
  if (!challengeId || typeof challengeId !== "string") return false;

  const ch = getCanonicalChallenge(challengeId);
  if (!ch) return false;

  const current = readStorage();
  if (current.solved.includes(ch.id)) {
    return false; // Already solved! Do not award duplicate points or add duplicate IDs.
  }

  const updatedSolved = [...current.solved, ch.id].sort(
    (a, b) => parseInt(a, 10) - parseInt(b, 10)
  );
  const updatedCompletedAt = {
    ...current.completedAt,
    [ch.id]: new Date().toISOString(),
  };

  writeStorage(updatedSolved, updatedCompletedAt);
  return true;
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, { detail: { solved: [], completedAt: {} } })
  );
}

export function isChallengeSolved(challengeId: string): boolean {
  if (!challengeId || typeof challengeId !== "string") return false;
  const ch = getCanonicalChallenge(challengeId);
  if (!ch) return false;

  const current = readStorage();
  return current.solved.includes(ch.id);
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

    // Client-side initial sync on mount
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
