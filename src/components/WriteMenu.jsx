import { DECK_SECTIONS } from "../data/sections.js";
import CategoryDeckList from "./CategoryDeckList.jsx";
import { useLanguage } from "../i18n.jsx";

const WRITE_SECTIONS = DECK_SECTIONS.filter((s) => s.id === "characters");

export default function WriteMenu({ onBack, onSelect }) {
  const { t } = useLanguage();

  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="btn-link" onClick={onBack}>{t("nav.back")}</button>
        <h1 className="menu-title">{t("nav.write")}</h1>
        <span className="menu-header-spacer" />
      </div>
      <p className="menu-subtitle">{t("writeMenu.subtitle")}</p>

      <CategoryDeckList
        sections={WRITE_SECTIONS}
        renderMeta={() => null}
        renderActions={(type, group) => (
          <button className="btn btn-yes" onClick={() => onSelect(type, group)}>
            {t("writeMenu.action")}
          </button>
        )}
      />
    </div>
  );
}
