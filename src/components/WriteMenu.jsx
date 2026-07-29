import { DECK_SECTIONS } from "../data/sections.js";
import CategoryDeckList from "./CategoryDeckList.jsx";

const WRITE_SECTIONS = DECK_SECTIONS.filter((s) => s.category === "ตัวอักษร");

export default function WriteMenu({ onBack, onSelect }) {
  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="btn-link" onClick={onBack}>← กลับ</button>
        <h1 className="menu-title">WRITE</h1>
        <span className="menu-header-spacer" />
      </div>
      <p className="menu-subtitle">ฝึกลากเส้นฮิรางานะ/คาตากานะให้ใกล้เคียงตัวจริง</p>

      <CategoryDeckList
        sections={WRITE_SECTIONS}
        renderMeta={() => null}
        renderActions={(type, group) => (
          <button className="btn btn-yes" onClick={() => onSelect(type, group)}>
            ฝึกเขียน
          </button>
        )}
      />
    </div>
  );
}
