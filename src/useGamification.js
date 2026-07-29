import { useEffect, useState } from "react";

const STORAGE_KEY = "jpbest-xp";
const XP_PER_LEVEL = 100;

function loadXp() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed?.totalXp ?? 0;
  } catch {
    return 0;
  }
}

export function useGamification() {
  const [totalXp, setTotalXp] = useState(loadXp);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ totalXp }));
  }, [totalXp]);

  const addXp = (amount) => setTotalXp((xp) => xp + amount);

  return {
    totalXp,
    level: Math.floor(totalXp / XP_PER_LEVEL) + 1,
    xpIntoLevel: totalXp % XP_PER_LEVEL,
    xpForLevel: XP_PER_LEVEL,
    addXp,
  };
}
