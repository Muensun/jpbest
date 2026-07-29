import { DECK_SECTIONS } from "../data/sections.js";
import CategoryDeckList from "./CategoryDeckList.jsx";

export default function ExploreMenu({ progress, onBack, onSelect }) {
  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="btn-link" onClick={onBack}>← กลับ</button>
        <h1 className="menu-title">EXPLORE</h1>
        <span className="menu-header-spacer" />
      </div>
      <p className="menu-subtitle">จำตัวอักษร คำศัพท์ และประโยคด้วยบัตรคำ</p>

      <CategoryDeckList
        sections={DECK_SECTIONS}
        renderMeta={(type, group) => {
          const key = `${type}:${group.id}`;
          const known = progress[key]?.known?.length ?? 0;
          return <span className="group-card-progress">{known}/{group.cards.length}</span>;
        }}
        renderActions={(type, group) => (
          <button className="btn btn-yes" onClick={() => onSelect(type, group)}>
            ฝึกบัตรคำ
          </button>
        )}
      />
    </div>
  );
}
