import { useEffect, useState } from "react";

const STORAGE_KEY = "jpbest-progress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markCard = (deckKey, card, isKnown) => {
    setProgress((prev) => {
      const entry = prev[deckKey] ?? { known: [] };
      const cardId = card.kana;
      const known = new Set(entry.known);
      if (isKnown) known.add(cardId);
      else known.delete(cardId);
      return { ...prev, [deckKey]: { ...entry, known: [...known] } };
    });
  };

  const recordQuizResult = (deckKey, result) => {
    setProgress((prev) => {
      const entry = prev[deckKey] ?? { known: [] };
      const bestStars = Math.max(entry.bestStars ?? 0, result.stars);
      return { ...prev, [deckKey]: { ...entry, bestStars } };
    });
  };

  return { progress, markCard, recordQuizResult };
}
