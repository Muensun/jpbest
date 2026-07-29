const DECKS = [
  { type: "hiragana", label: "ひらがな Hiragana", emoji: "あ" },
  { type: "katakana", label: "カタカナ Katakana", emoji: "ア" },
  { type: "vocab", label: "คำศัพท์ N5", emoji: "語" },
];

export default function DeckMenu({ dataByType, progress, onSelect }) {
  return (
    <div className="deck-menu">
      <h1 className="app-title">JPBest 🇯🇵</h1>
      <p className="app-subtitle">ฝึกฮิรางานะ คาตากานะ และคำศัพท์ N5 ด้วยบัตรคำ</p>

      {DECKS.map((deck) => (
        <section key={deck.type} className="deck-section">
          <h2 className="deck-section-title">
            <span className="deck-emoji">{deck.emoji}</span> {deck.label}
          </h2>
          <div className="group-grid">
            {dataByType[deck.type].map((group) => {
              const deckKey = `${deck.type}:${group.id}`;
              const known = progress[deckKey]?.known?.length ?? 0;
              const total = group.cards.length;
              return (
                <div key={group.id} className="group-card">
                  <div className="group-card-head">
                    <span className="group-card-label">{group.label}</span>
                    <span className="group-card-progress">{known}/{total}</span>
                  </div>
                  <div className="group-card-actions">
                    <button
                      className="btn btn-yes"
                      onClick={() => onSelect(deck.type, group, "study")}
                    >
                      ฝึกบัตรคำ
                    </button>
                    <button
                      className="btn btn-skip"
                      onClick={() => onSelect(deck.type, group, "quiz")}
                    >
                      ทำแบบทดสอบ
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
