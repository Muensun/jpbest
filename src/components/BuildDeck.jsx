import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../i18n.jsx";

const COMBO_MILESTONES = [3, 5, 10];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// สับตัวอักษรของคำ ให้ไม่เรียงตรงกับคำเฉลยพอดี (ถ้าคำยาวพอจะสับได้)
function shuffleTiles(chars) {
  const tiles = chars.map((char, i) => ({ id: `${i}-${char}`, char }));
  if (tiles.length <= 1) return tiles;
  let shuffled = shuffle(tiles);
  let attempts = 0;
  while (
    attempts < 10 &&
    shuffled.every((tile, i) => tile.char === tiles[i].char)
  ) {
    shuffled = shuffle(tiles);
    attempts += 1;
  }
  return shuffled;
}

function computeResult(score, comboBonusXp, maxCombo) {
  const accuracy = score.total ? score.correct / score.total : 0;
  const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.5 ? 1 : 0;
  const xpEarned = score.correct * 12 + (accuracy === 1 ? 20 : 0) + comboBonusXp;
  return { stars, xpEarned, accuracy, maxCombo, comboBonusXp };
}

export default function BuildDeck({ deckKey, type, cards, onBack, onFinish }) {
  const { t } = useLanguage();
  const [order] = useState(() => shuffle(cards.map((_, i) => i)));
  const [pos, setPos] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [usedIds, setUsedIds] = useState(() => new Set());
  const [status, setStatus] = useState(null); // null | "correct" | "wrong"
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const comboBonusRef = useRef(0);
  const reachedMilestonesRef = useRef(new Set());
  const reportedRef = useRef(false);

  const finished = pos >= order.length;
  const current = finished ? null : cards[order[pos]];

  const words = useMemo(
    () => (current ? current.kana.trim().split(/\s+/).map((w) => Array.from(w)) : []),
    [current]
  );
  const flatTarget = useMemo(() => words.flat(), [words]);
  const tiles = useMemo(() => shuffleTiles(flatTarget), [flatTarget]);

  const result = useMemo(
    () => computeResult(score, comboBonusRef.current, maxCombo),
    [score, maxCombo]
  );

  useEffect(() => {
    if (finished && !reportedRef.current && score.total > 0) {
      reportedRef.current = true;
      onFinish(deckKey, result);
    }
  }, [finished, score.total, deckKey, result, onFinish]);

  useEffect(() => {
    if (status || flatTarget.length === 0 || placed.length !== flatTarget.length) return;
    const isCorrect = placed.map((p) => p.char).join("") === flatTarget.join("");
    setStatus(isCorrect ? "correct" : "wrong");
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    if (isCorrect) {
      setCombo((c) => {
        const next = c + 1;
        setMaxCombo((m) => Math.max(m, next));
        COMBO_MILESTONES.forEach((ms) => {
          if (next === ms && !reachedMilestonesRef.current.has(ms)) {
            reachedMilestonesRef.current.add(ms);
            comboBonusRef.current += ms;
          }
        });
        return next;
      });
    } else {
      setCombo(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placed, flatTarget, status]);

  const tapTile = (tile) => {
    if (status || usedIds.has(tile.id) || placed.length >= flatTarget.length) return;
    setPlaced((p) => [...p, tile]);
    setUsedIds((s) => new Set(s).add(tile.id));
  };

  const undoLast = () => {
    if (status || placed.length === 0) return;
    const last = placed[placed.length - 1];
    setPlaced((p) => p.slice(0, -1));
    setUsedIds((s) => {
      const next = new Set(s);
      next.delete(last.id);
      return next;
    });
  };

  const next = () => {
    setPlaced([]);
    setUsedIds(new Set());
    setStatus(null);
    setPos((p) => p + 1);
  };

  const restart = () => {
    reportedRef.current = false;
    comboBonusRef.current = 0;
    reachedMilestonesRef.current = new Set();
    setPlaced([]);
    setUsedIds(new Set());
    setStatus(null);
    setPos(0);
    setScore({ correct: 0, total: 0 });
    setCombo(0);
    setMaxCombo(0);
  };

  if (finished) {
    return (
      <div className="quiz-view quiz-result">
        <button className="btn-link" onClick={onBack}>{t("nav.back")}</button>
        <h2>{t("quiz.resultTitle")}</h2>
        <p className="quiz-score">
          {t("quiz.resultScore", { correct: score.correct, total: score.total })}
        </p>
        <p className="quiz-stars">
          {"★".repeat(result.stars)}
          {"☆".repeat(3 - result.stars)}
        </p>
        <p className="quiz-xp">+{result.xpEarned} XP</p>
        {result.comboBonusXp > 0 && (
          <p className="quiz-combo-bonus">{t("quiz.comboBonus", { xp: result.comboBonusXp })}</p>
        )}
        <div className="study-actions">
          <button className="btn btn-yes" onClick={restart}>{t("quiz.retry")}</button>
        </div>
      </div>
    );
  }

  let flatIndex = 0;

  return (
    <div className="build-view">
      <div className="study-header">
        <button className="btn-link" onClick={onBack}>{t("nav.back")}</button>
        <div className="study-progress">
          {t("quiz.progress", { pos: pos + 1, total: order.length, correct: score.correct })}
        </div>
      </div>

      {combo >= 2 && (
        <p className="quiz-combo">🔥 {t("quiz.combo", { combo })}</p>
      )}

      <div className="build-prompt">
        <span className="build-prompt-meaning">{current.meaning}</span>
        {(type === "vocab" || type === "sentences") && current.kanji && (
          <span className="build-prompt-kanji">{current.kanji}</span>
        )}
      </div>

      <div className="build-answer">
        {words.map((word, wi) => (
          <div className="build-word-group" key={wi}>
            {word.map((char, ci) => {
              const slot = placed[flatIndex];
              flatIndex += 1;
              let cls = "build-slot";
              if (status === "correct") cls += " is-correct";
              else if (status === "wrong") cls += " is-wrong";
              return (
                <span className={cls} key={ci}>
                  {slot ? slot.char : ""}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {status === "wrong" && (
        <p className="build-feedback is-wrong">
          {t("build.wrongAnswer", { answer: current.kana })}
        </p>
      )}
      {status === "correct" && (
        <p className="build-feedback is-correct">{t("build.correct")}</p>
      )}

      <div className="build-tiles">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            className={`build-tile ${usedIds.has(tile.id) ? "is-used" : ""}`}
            onClick={() => tapTile(tile)}
            disabled={!!status || usedIds.has(tile.id)}
          >
            {tile.char}
          </button>
        ))}
      </div>

      <div className="build-controls">
        <button
          className="btn btn-skip"
          onClick={undoLast}
          disabled={!!status || placed.length === 0}
        >
          ⌫ {t("build.undo")}
        </button>
      </div>

      {status && (
        <button className="btn btn-yes build-next" onClick={next}>
          {t("quiz.next")}
        </button>
      )}
    </div>
  );
}
