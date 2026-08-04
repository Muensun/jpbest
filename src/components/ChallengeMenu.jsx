import { DECK_SECTIONS } from "../data/sections.js";
import CategoryDeckList from "./CategoryDeckList.jsx";
import XpBar from "./XpBar.jsx";
import { useLanguage } from "../i18n.jsx";

export default function ChallengeMenu({ progress, xp, onBack, onSelect }) {
  const { t } = useLanguage();

  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="btn-link" onClick={onBack}>{t("nav.back")}</button>
        <h1 className="menu-title">{t("nav.challenge")}</h1>
        <span className="menu-header-spacer" />
      </div>
      <XpBar level={xp.level} xpIntoLevel={xp.xpIntoLevel} xpForLevel={xp.xpForLevel} />
      <p className="menu-subtitle">{t("challengeMenu.subtitle")}</p>

      <CategoryDeckList
        sections={DECK_SECTIONS}
        renderMeta={(type, group) => {
          const key = `${type}:${group.id}`;
          const stars = progress[key]?.bestStars ?? 0;
          const bestCombo = progress[key]?.bestCombo ?? 0;
          return (
            <span className="group-card-meta">
              <span className="group-card-stars">
                {"★".repeat(stars)}
                {"☆".repeat(3 - stars)}
              </span>
              {bestCombo >= 3 && (
                <span className="group-card-combo">
                  🔥 {t("challengeMenu.bestCombo", { combo: bestCombo })}
                </span>
              )}
            </span>
          );
        }}
        renderActions={(type, group) => (
          <button className="btn btn-skip" onClick={() => onSelect(type, group)}>
            {t("challengeMenu.action")}
          </button>
        )}
      />
    </div>
  );
}
