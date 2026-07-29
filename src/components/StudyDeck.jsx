import { useState } from "react";
import Flashcard from "./Flashcard.jsx";
import DeckTable from "./DeckTable.jsx";

export default function StudyDeck({ deckKey, type, cards, progress, onMark, onBack }) {
  const [pos, setPos] = useState(null); // null = table view, index = focus view
  const [flipped, setFlipped] = useState(false);

  const knownSet = new Set(progress[deckKey]?.known ?? []);

  if (pos === null) {
    return (
      <div className="study-view">
        <div className="study-header">
          <button className="btn-link" onClick={onBack}>← กลับ</button>
          <div className="study-progress">จำได้แล้ว {knownSet.size}/{cards.length} คำ</div>
          <span className="menu-header-spacer" />
        </div>
        <p className="hint-text">แตะแถวเพื่อดูทีละคำ</p>
        <DeckTable
          cards={cards}
          type={type}
          knownSet={knownSet}
          onRowClick={(i) => {
            setPos(i);
            setFlipped(false);
          }}
        />
      </div>
    );
  }

  const card = cards[pos];

  const goNext = () => {
    setFlipped(false);
    setPos((p) => (p + 1) % cards.length);
  };

  const mark = (isKnown) => {
    onMark(deckKey, card, isKnown);
    goNext();
  };

  return (
    <div className="study-view">
      <div className="study-header">
        <button className="btn-link" onClick={() => setPos(null)}>← ตาราง</button>
        <div className="study-progress">{pos + 1} / {cards.length}</div>
        <span className="menu-header-spacer" />
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
