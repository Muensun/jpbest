import { useEffect, useState } from "react";

const STORAGE_KEY = "jpbest-progress";
const DAY_MS = 24 * 60 * 60 * 1000;
const INTERVAL_DAYS = [0, 1, 3, 7, 14, 30]; // indexed by box 0-5
export const KNOWN_BOX_THRESHOLD = 1;

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

  const getCardState = (deckKey, kana) => {
    return progress[deckKey]?.cards?.[kana] ?? { box: 0, nextReview: 0 };
  };

  const markCard = (deckKey, card, isKnown) => {
    setProgress((prev) => {
      const entry = prev[deckKey] ?? { cards: {} };
      const current = entry.cards[card.kana] ?? { box: 0, nextReview: 0 };
      const nextBox = isKnown ? Math.min(current.box + 1, INTERVAL_DAYS.length - 1) : 0;
      const nextReview = Date.now() + INTERVAL_DAYS[nextBox] * DAY_MS;
      return {
        ...prev,
        [deckKey]: {
          ...entry,
          cards: { ...entry.cards, [card.kana]: { box: nextBox, nextReview } },
        },
      };
    });
  };

  const recordQuizResult = (deckKey, result) => {
    setProgress((prev) => {
      const entry = prev[deckKey] ?? { cards: {} };
      const bestStars = Math.max(entry.bestStars ?? 0, result.stars);
      const bestCombo = Math.max(entry.bestCombo ?? 0, result.maxCombo ?? 0);
      return { ...prev, [deckKey]: { ...entry, bestStars, bestCombo } };
    });
  };

  return { progress, markCard, recordQuizResult, getCardState };
}
