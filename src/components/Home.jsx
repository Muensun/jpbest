import XpBar from "./XpBar.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useLanguage } from "../i18n.jsx";

export default function Home({ xp, onExplore, onChallenge, onWrite }) {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      <div className="home-lang-row">
        <LanguageSwitcher />
      </div>

      <img src="/logo.png" alt="JPTalk" className="app-logo" />
      <h1 className="app-title">JPTalk</h1>
      <p className="app-subtitle">{t("home.subtitle")}</p>

      <XpBar level={xp.level} xpIntoLevel={xp.xpIntoLevel} xpForLevel={xp.xpForLevel} />

      <div className="home-menu">
        <button className="menu-card menu-card-explore" onClick={onExplore}>
          <span className="menu-card-icon">📖</span>
          <span className="menu-card-label">{t("nav.explore")}</span>
          <span className="menu-card-desc">{t("home.exploreDesc")}</span>
        </button>
        <button className="menu-card menu-card-write" onClick={onWrite}>
          <span className="menu-card-icon">✍️</span>
          <span className="menu-card-label">{t("nav.write")}</span>
          <span className="menu-card-desc">{t("home.writeDesc")}</span>
        </button>
        <button className="menu-card menu-card-challenge" onClick={onChallenge}>
          <span className="menu-card-icon">🎯</span>
          <span className="menu-card-label">{t("nav.challenge")}</span>
          <span className="menu-card-desc">{t("home.challengeDesc")}</span>
        </button>
      </div>

      <p className="home-more-hint">{t("home.moreHint")}</p>
    </div>
  );
}
