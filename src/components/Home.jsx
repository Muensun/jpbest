import XpBar from "./XpBar.jsx";

export default function Home({ xp, onExplore, onChallenge, onWrite }) {
  return (
    <div className="home-page">
      <img src="/logo.png" alt="JPTalk" className="app-logo" />
      <h1 className="app-title">JPTalk</h1>
      <p className="app-subtitle">ฝึกภาษาญี่ปุ่นทีละก้าว จากฮิรางานะถึงประโยคง่ายๆ</p>

      <XpBar level={xp.level} xpIntoLevel={xp.xpIntoLevel} xpForLevel={xp.xpForLevel} />

      <div className="home-menu">
        <button className="menu-card menu-card-explore" onClick={onExplore}>
          <span className="menu-card-icon">📖</span>
          <span className="menu-card-label">EXPLORE</span>
          <span className="menu-card-desc">จำตัวอักษร คำศัพท์ และประโยค</span>
        </button>
        <button className="menu-card menu-card-write" onClick={onWrite}>
          <span className="menu-card-icon">✍️</span>
          <span className="menu-card-label">WRITE</span>
          <span className="menu-card-desc">ฝึกลากเส้นตัวอักษรให้ใกล้เคียง</span>
        </button>
        <button className="menu-card menu-card-challenge" onClick={onChallenge}>
          <span className="menu-card-icon">🎯</span>
          <span className="menu-card-label">CHALLENGE</span>
          <span className="menu-card-desc">ทำแบบทดสอบ สะสม XP และดาว</span>
        </button>
      </div>

      <p className="home-more-hint">เมนูอื่น ๆ กำลังจะตามมาเร็ว ๆ นี้</p>
    </div>
  );
}
