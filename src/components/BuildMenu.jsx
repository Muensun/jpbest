import { DECK_SECTIONS } from "../data/sections.js";
import CategoryDeckList from "./CategoryDeckList.jsx";
import { useLanguage } from "../i18n.jsx";

// ต่อคำใช้ได้เฉพาะหมวดคำศัพท์/ประโยค (ตัวอักษรเดี่ยวต่อคำไม่ได้)
const BUILD_SECTIONS = DECK_SECTIONS.filter((s) => s.id === "wordsSentences");

export default function BuildMenu({ progress, onBack, onSelect }) {
  const { t } = useLanguage();

  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="btn-link" onClick={onBack}>{t("nav.back")}</button>
        <h1 className="menu-title">{t("nav.build")}</h1>
        <span className="menu-header-spacer" />
      </div>
      <p className="menu-subtitle">{t("buildMenu.subtitle")}</p>

      <CategoryDeckList
        sections={BUILD_SECTIONS}
        renderMeta={(type, group) => {
          const key = `build:${type}:${group.id}`;
          const stars = progress[key]?.bestStars ?? 0;
          return (
            <span className="group-card-stars">
              {"★".repeat(stars)}
              {"☆".repeat(3 - stars)}
            </span>
          );
        }}
        renderActions={(type, group) => (
          <button className="btn btn-yes" onClick={() => onSelect(type, group)}>
            {t("buildMenu.action")}
          </button>
        )}
      />
    </div>
  );
}
