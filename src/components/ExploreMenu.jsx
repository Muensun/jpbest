import { DECK_SECTIONS } from "../data/sections.js";
import CategoryDeckList from "./CategoryDeckList.jsx";
import { useLanguage } from "../i18n.jsx";
import { KNOWN_BOX_THRESHOLD } from "../useProgress.js";

export default function ExploreMenu({ progress, onBack, onSelect }) {
  const { t } = useLanguage();

  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="btn-link" onClick={onBack}>{t("nav.back")}</button>
        <h1 className="menu-title">{t("nav.explore")}</h1>
        <span className="menu-header-spacer" />
      </div>
      <p className="menu-subtitle">{t("explore.subtitle")}</p>

      <CategoryDeckList
        sections={DECK_SECTIONS}
        renderMeta={(type, group) => {
          const key = `${type}:${group.id}`;
          const known = Object.values(progress[key]?.cards ?? {}).filter(
            (c) => c.box >= KNOWN_BOX_THRESHOLD
          ).length;
          return <span className="group-card-progress">{known}/{group.cards.length}</span>;
        }}
        renderActions={(type, group) => (
          <button className="btn btn-yes" onClick={() => onSelect(type, group)}>
            {t("explore.action")}
          </button>
        )}
      />
    </div>
  );
}
