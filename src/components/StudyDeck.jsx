import { useState } from "react";
import Flashcard from "./Flashcard.jsx";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function StudyDeck({ deckKey, type, cards, progress, onMark, onBack }) {
  const [order, setOrder] = useState(() => shuffle(cards.map((_, i) => i)));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[order[pos]];
  const known = progress[deckKey]?.known?.length ?? 0;

  const goNext = () => {
    setFlipped(false);
    setPos((p) => (p + 1) % order.length);
  };

  const mark = (isKnown) => {
    onMark(deckKey, card, isKnown);
    goNext();
  };

  const reshuffle = () => {
    setOrder(shuffle(cards.map((_, i) => i)));
    setPos(0);
    setFlipped(false);
  };

  return (
    <div className="study-view">
      <div className="study-header">
        <button className="btn-link" onClick={onBack}>← กลับ</button>
        <div className="study-progress">
          {pos + 1} / {order.length} · จำได้แล้ว {known} คำ
        </div>
        <button className="btn-link" onClick={reshuffle}>สลับใหม่</button>
      </div>

      <Flashcard card={card} type={type} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
      <p className="hint-text">แตะบัตรคำเพื่อดูคำเฉลย</p>

      <div className="study-actions">
        <button className="btn btn-no" onClick={() => mark(false)}>ยังไม่รู้</button>
        <button className="btn btn-skip" onClick={goNext}>ข้าม</button>
        <button className="btn btn-yes" onClick={() => mark(true)}>รู้แล้ว ✓</button>
      </div>
    </div>
  );
}
