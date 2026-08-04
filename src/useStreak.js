import { useEffect, useState } from "react";

const STORAGE_KEY = "jptalk-streak";
const DAY_MS = 24 * 60 * 60 * 1000;

function localDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function loadStreak() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { current: 0, longest: 0, lastActiveDate: null };
  } catch {
    return { current: 0, longest: 0, lastActiveDate: null };
  }
}

export function useStreak() {
  const [streak, setStreak] = useState(loadStreak);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(streak));
  }, [streak]);

  const recordActivity = () => {
    setStreak((prev) => {
      const today = localDateStr(new Date());
      if (prev.lastActiveDate === today) return prev;
      const yesterday = localDateStr(new Date(Date.now() - DAY_MS));
      const current = prev.lastActiveDate === yesterday ? prev.current + 1 : 1;
      const longest = Math.max(prev.longest, current);
      return { current, longest, lastActiveDate: today };
    });
  };

  return { current: streak.current, longest: streak.longest, recordActivity };
}
