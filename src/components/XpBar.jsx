export default function XpBar({ level, xpIntoLevel, xpForLevel }) {
  const pct = Math.round((xpIntoLevel / xpForLevel) * 100);
  return (
    <div className="xp-bar-wrap">
      <div className="xp-bar-label">
        <span>เลเวล {level}</span>
        <span>{xpIntoLevel}/{xpForLevel} XP</span>
      </div>
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
