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
      return { ...prev, [deckKey]: { known: [...known] } };
    });
  };

  return { progress, markCard };
}
