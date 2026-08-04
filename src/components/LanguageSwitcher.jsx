import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n.jsx";

const LANGUAGES = [
  { code: "ja", flag: "🇯🇵", name: "日本語" },
  { code: "th", flag: "🇹🇭", name: "ไทย" },
  { code: "en", flag: "🇺🇸", name: "English" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[1];

  return (
    <div className="lang-switch" ref={containerRef}>
      <button className="lang-switch-trigger" onClick={() => setOpen((o) => !o)}>
        <span className="lang-switch-globe">🌐</span>
        <span>{current.name}</span>
        <span className={`lang-switch-chevron ${open ? "is-open" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="lang-switch-menu">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`lang-switch-option ${l.code === lang ? "is-selected" : ""}`}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
            >
              <span className="lang-switch-flag">{l.flag}</span>
              <span className="lang-switch-name">{l.name}</span>
              {l.code === lang && <span className="lang-switch-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
