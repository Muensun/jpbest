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

function buildQuestion(cards, correctIndex) {
  const correct = cards[correctIndex];
  const distractors = shuffle(
    cards.filter((_, i) => i !== correctIndex)
  ).slice(0, 3);
  const choices = shuffle([correct, ...distractors]);
  return { correct, choices };
}

function computeResult(score, comboBonusXp, maxCombo) {
  const accuracy = score.total ? score.correct / score.total : 0;
  const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.5 ? 1 : 0;
  const xpEarned = score.correct * 10 + (accuracy === 1 ? 20 : 0) + comboBonusXp;
  return { stars, xpEarned, accuracy, maxCombo, comboBonusXp };
}

export default function QuizDeck({ deckKey, type, cards, onBack, onFinish }) {
  const { t } = useLanguage();
  const [order] = useState(() => shuffle(cards.map((_, i) => i)));
  const [pos, setPos] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const comboBonusRef = useRef(0);
  const reachedMilestonesRef = useRef(new Set());
  const reportedRef = useRef(false);

  const question = useMemo(
    () => buildQuestion(cards, order[pos]),
    [cards, order, pos]
  );

  const finished = pos >= order.length;
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

  const choose = (choice) => {
    if (selected) return;
    setSelected(choice);
    const isCorrect = choice === question.correct;
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
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
  };

  const next = () => {
    setSelected(null);
    setPos((p) => p + 1);
  };

  const restart = () => {
    reportedRef.current = false;
    comboBonusRef.current = 0;
    reachedMilestonesRef.current = new Set();
    setPos(0);
    setSelected(null);
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

  return (
    <div className="quiz-view">
      <div className="study-header">
        <button className="btn-link" onClick={onBack}>{t("nav.back")}</button>
        <div className="study-progress">
          {t("quiz.progress", { pos: pos + 1, total: order.length, correct: score.correct })}
        </div>
      </div>

      {combo >= 2 && (
        <p className="quiz-combo">🔥 {t("quiz.combo", { combo })}</p>
      )}

      <div className="quiz-question">
        <span className={type === "sentences" ? "sentence-text" : "kana-text"}>
          {question.correct.kana}
        </span>
        {(type === "vocab" || type === "sentences") && question.correct.kanji && (
          <span className={type === "sentences" ? "sentence-kanji-text" : "kanji-text"}>
            {question.correct.kanji}
          </span>
        )}
      </div>

      <div className="quiz-choices">
        {question.choices.map((choice, i) => {
          const label = choice.meaning || choice.romaji;
          let cls = "quiz-choice";
          if (selected) {
            if (choice === question.correct) cls += " is-correct";
            else if (choice === selected) cls += " is-wrong";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => choose(choice)}
              disabled={!!selected}
            >
              {label}
            </button>
          );
        })}
      </div>

      {selected && (
        <button className="btn btn-yes quiz-next" onClick={next}>
          {t("quiz.next")}
        </button>
      )}
    </div>
  );
}
