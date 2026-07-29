export default function CategoryDeckList({ sections, renderMeta, renderActions }) {
  return (
    <div className="deck-list">
      {sections.map((section) => (
        <section key={section.category} className="category-block">
          <h2 className="category-title">{section.category}</h2>
          {section.decks.map((deck) => (
            <div key={deck.type} className="deck-block">
              <h3 className="deck-block-title">
                <span className="deck-emoji">{deck.emoji}</span> {deck.label}
              </h3>
              <div className="group-grid">
                {deck.groups.map((group) => (
                  <div key={group.id} className="group-card">
                    <div className="group-card-head">
                      <span className="group-card-label">{group.label}</span>
                      {renderMeta(deck.type, group)}
                    </div>
                    <div className="group-card-actions">
                      {renderActions(deck.type, group)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
