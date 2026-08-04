import { useLanguage } from "../i18n.jsx";

export default function XpBar({ level, xpIntoLevel, xpForLevel }) {
  const { t } = useLanguage();
  const pct = Math.round((xpIntoLevel / xpForLevel) * 100);
  return (
    <div className="xp-bar-wrap">
      <div className="xp-bar-label">
        <span>{t("nav.level")} {level}</span>
        <span>{xpIntoLevel}/{xpForLevel} XP</span>
      </div>
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
