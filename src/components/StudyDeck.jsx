import { useState } from "react";
import Flashcard from "./Flashcard.jsx";
import DeckTable from "./DeckTable.jsx";
import { useLanguage } from "../i18n.jsx";
import { KNOWN_BOX_THRESHOLD } from "../useProgress.js";
import { useScrollRestore } from "../useScrollRestore.js";

export default function StudyDeck({ deckKey, type, cards, getCardState, onMark, onActivity, onBack }) {
  const { t } = useLanguage();
  const [pos, setPos] = useState(null); // null = table view, index = focus view (into `cards` or `reviewQueue`)
  const [reviewQueue, setReviewQueue] = useState(null); // null = browsing all cards, array = due-only queue
  const [flipped, setFlipped] = useState(false);

  const knownSet = new Set(
    cards.filter((c) => getCardState(deckKey, c.kana).box >= KNOWN_BOX_THRESHOLD).map((c) => c.kana)
  );
  const dueIndices = cards
    .map((_, i) => i)
    .filter((i) => getCardState(deckKey, cards[i].kana).nextReview <= Date.now());

  // สลับระหว่างตารางกับบัตรคำก็จำตำแหน่งเหมือนกัน กดกลับจากบัตรจะได้อยู่ตรงแถวเดิมในตาราง
  useScrollRestore(pos === null ? "table" : `card:${reviewQueue ? reviewQueue[pos] : pos}`);

  const exitFocus = () => {
    setPos(null);
    setReviewQueue(null);
  };

  const startReview = () => {
    setReviewQueue(dueIndices);
    setPos(0);
    setFlipped(false);
  };

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

        {dueIndices.length > 0 && (
          <div className="review-banner">
            <span>{t("study.dueCount", { count: dueIndices.length })}</span>
            <button className="btn btn-yes" onClick={startReview}>{t("study.reviewButton")}</button>
          </div>
        )}

        <DeckTable
          cards={cards}
          type={type}
          knownSet={knownSet}
          onRowClick={(i) => {
            setReviewQueue(null);
            setPos(i);
            setFlipped(false);
          }}
        />
      </div>
    );
  }

  const sequenceLength = reviewQueue ? reviewQueue.length : cards.length;
  const cardIndex = reviewQueue ? reviewQueue[pos] : pos;
  const card = cards[cardIndex];

  const goNext = () => {
    setFlipped(false);
    setPos((p) => (p + 1) % sequenceLength);
  };

  const mark = (isKnown) => {
    onMark(deckKey, card, isKnown);
    onActivity();
    goNext();
  };

  return (
    <div className="study-view">
      <div className="study-header">
        <button className="btn-link" onClick={exitFocus}>{t("study.backToTable")}</button>
        <div className="study-progress">{pos + 1} / {sequenceLength}</div>
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
