import { DECK_SECTIONS } from "../data/sections.js";
import CategoryDeckList from "./CategoryDeckList.jsx";
import XpBar from "./XpBar.jsx";

export default function ChallengeMenu({ progress, xp, onBack, onSelect }) {
  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="btn-link" onClick={onBack}>← กลับ</button>
        <h1 className="menu-title">CHALLENGE</h1>
        <span className="menu-header-spacer" />
      </div>
      <XpBar level={xp.level} xpIntoLevel={xp.xpIntoLevel} xpForLevel={xp.xpForLevel} />
      <p className="menu-subtitle">ทำแบบทดสอบเพื่อสะสม XP และดาว</p>

      <CategoryDeckList
        sections={DECK_SECTIONS}
        renderMeta={(type, group) => {
          const key = `${type}:${group.id}`;
          const stars = progress[key]?.bestStars ?? 0;
          return (
            <span className="group-card-stars">
              {"★".repeat(stars)}
              {"☆".repeat(3 - stars)}
            </span>
          );
        }}
        renderActions={(type, group) => (
          <button className="btn btn-skip" onClick={() => onSelect(type, group)}>
            เริ่มทำแบบทดสอบ
          </button>
        )}
      />
    </div>
  );
}
