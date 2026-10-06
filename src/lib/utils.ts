// Utility functions for classNames and helpers

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPoints(points: number): string {
  return `${points} PTS`;
}
