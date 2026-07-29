import { useMemo, useState } from "react";

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

export default function QuizDeck({ deckKey, type, cards, onBack }) {
  const [order] = useState(() => shuffle(cards.map((_, i) => i)));
  const [pos, setPos] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const question = useMemo(
    () => buildQuestion(cards, order[pos]),
    [cards, order, pos]
  );

  const finished = pos >= order.length;

  const choose = (choice) => {
    if (selected) return;
    setSelected(choice);
    setScore((s) => ({
      correct: s.correct + (choice === question.correct ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const next = () => {
    setSelected(null);
    setPos((p) => p + 1);
  };

  const restart = () => {
    setPos(0);
    setSelected(null);
    setScore({ correct: 0, total: 0 });
  };

  if (finished) {
    return (
      <div className="quiz-view quiz-result">
        <button className="btn-link" onClick={onBack}>← กลับ</button>
        <h2>สรุปผล</h2>
        <p className="quiz-score">
          ตอบถูก {score.correct} / {score.total}
        </p>
        <div className="study-actions">
          <button className="btn btn-yes" onClick={restart}>ทำอีกครั้ง</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-view">
      <div className="study-header">
        <button className="btn-link" onClick={onBack}>← กลับ</button>
        <div className="study-progress">
          {pos + 1} / {order.length} · ถูก {score.correct}
        </div>
      </div>

      <div className="quiz-question">
        <span className="kana-text">{question.correct.kana}</span>
        {type === "vocab" && question.correct.kanji && (
          <span className="kanji-text">{question.correct.kanji}</span>
        )}
      </div>

      <div className="quiz-choices">
        {question.choices.map((choice, i) => {
          const label = type === "vocab" ? choice.meaning : choice.romaji;
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
          ถัดไป →
        </button>
      )}
    </div>
  );
}
