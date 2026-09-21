import { thaiReading } from "../data/kanaThai.js";
import { useLanguage } from "../i18n.jsx";

export default function DeckTable({ cards, type, knownSet, onRowClick }) {
  const { t } = useLanguage();
  const isTextHeavy = type === "vocab" || type === "sentences";

  return (
    <div className="deck-table-wrap">
      <table className={`deck-table deck-table--${type}`}>
        <thead>
          <tr>
            <th>{isTextHeavy ? t("table.headerWordSentence") : t("table.headerCharacter")}</th>
            <th>{t("table.headerRomaji")}</th>
            <th>{t("table.headerThai")}</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, i) => {
            const known = knownSet.has(card.kana);
            const thai = card.meaning || thaiReading(card.romaji);
            return (
              <tr
                key={card.kana + i}
                className={known ? "is-known" : ""}
                onClick={() => onRowClick(i)}
              >
                <td className="deck-table-kana">
                  {known && <span className="deck-table-check">✓</span>}
                  {card.kana}
                </td>
                <td className="deck-table-romaji">{card.romaji}</td>
                <td className="deck-table-thai">{thai}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
