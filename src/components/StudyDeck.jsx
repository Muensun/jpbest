import { useState } from "react";
import Flashcard from "./Flashcard.jsx";
import DeckTable from "./DeckTable.jsx";
import { useLanguage } from "../i18n.jsx";

export default function StudyDeck({ deckKey, type, cards, progress, onMark, onBack }) {
  const { t } = useLanguage();
  const [pos, setPos] = useState(null); // null = table view, index = focus view
  const [flipped, setFlipped] = useState(false);

  const knownSet = new Set(progress[deckKey]?.known ?? []);

  if (pos === null) {
    return (
      <div className="study-view">
        <div className="study-header">
          <button className="btn-link" onClick={onBack}>{t("nav.back")}</button>
          <div className="study-progress">
            {t("study.knownCount", { known: knownSet.size, total: cards.length })}
          </div>
          <span className="menu-header-spacer" />
        </div>
        <p className="hint-text">{t("study.tapHintTable")}</p>
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
        <button className="btn-link" onClick={() => setPos(null)}>{t("study.backToTable")}</button>
        <div className="study-progress">{pos + 1} / {cards.length}</div>
        <span className="menu-header-spacer" />
      </div>

      <Flashcard card={card} type={type} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
      <p className="hint-text">{t("study.tapHintCard")}</p>

      <div className="study-actions">
        <button className="btn btn-no" onClick={() => mark(false)}>{t("study.dontKnow")}</button>
        <button className="btn btn-skip" onClick={goNext}>{t("study.skip")}</button>
        <button className="btn btn-yes" onClick={() => mark(true)}>{t("study.know")}</button>
      </div>
    </div>
  );
}
