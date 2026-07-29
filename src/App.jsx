import { useState } from "react";
import { hiraganaGroups } from "./data/hiragana.js";
import { katakanaGroups } from "./data/katakana.js";
import { vocabGroups } from "./data/vocab.js";
import { useProgress } from "./useProgress.js";
import DeckMenu from "./components/DeckMenu.jsx";
import StudyDeck from "./components/StudyDeck.jsx";
import QuizDeck from "./components/QuizDeck.jsx";
import "./App.css";

const dataByType = {
  hiragana: hiraganaGroups,
  katakana: katakanaGroups,
  vocab: vocabGroups,
};

export default function App() {
  const { progress, markCard } = useProgress();
  const [active, setActive] = useState(null); // { type, group, mode }

  const handleSelect = (type, group, mode) => setActive({ type, group, mode });
  const handleBack = () => setActive(null);

  if (active) {
    const deckKey = `${active.type}:${active.group.id}`;
    if (active.mode === "study") {
      return (
        <div className="app-shell">
          <StudyDeck
            deckKey={deckKey}
            type={active.type}
            cards={active.group.cards}
            progress={progress}
            onMark={markCard}
            onBack={handleBack}
          />
        </div>
      );
    }
    return (
      <div className="app-shell">
        <QuizDeck
          deckKey={deckKey}
          type={active.type}
          cards={active.group.cards}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <DeckMenu dataByType={dataByType} progress={progress} onSelect={handleSelect} />
    </div>
  );
}
