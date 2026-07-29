export default function Flashcard({ card, type, flipped, onFlip }) {
  return (
    <div className="flashcard-wrap" onClick={onFlip}>
      <div className={`flashcard ${flipped ? "is-flipped" : ""}`}>
        <div className="flashcard-face flashcard-front">
          <span className="kana-text">{card.kana}</span>
        </div>
        <div className="flashcard-face flashcard-back">
          {type === "vocab" ? (
            <>
              {card.kanji && <span className="kanji-text">{card.kanji}</span>}
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
