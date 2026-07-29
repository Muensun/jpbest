export default function Flashcard({ card, type, flipped, onFlip }) {
  const isSentence = type === "sentences";
  const isTextHeavy = type === "vocab" || isSentence;

  return (
    <div className="flashcard-wrap" onClick={onFlip}>
      <div className={`flashcard ${flipped ? "is-flipped" : ""}`}>
        <div className="flashcard-face flashcard-front">
          <span className={isSentence ? "sentence-text" : "kana-text"}>{card.kana}</span>
        </div>
        <div className="flashcard-face flashcard-back">
          {isTextHeavy ? (
            <>
              {card.kanji && (
                <span className={isSentence ? "sentence-kanji-text" : "kanji-text"}>{card.kanji}</span>
              )}
              <span className="romaji-text">{card.romaji}</span>
              <span className="meaning-text">{card.meaning}</span>
            </>
          ) : (
            <span className="romaji-text-big">{card.romaji}</span>
          )}
        </div>
      </div>
    </div>
  );
}
