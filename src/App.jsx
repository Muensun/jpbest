import { useState } from "react";
import { useProgress } from "./useProgress.js";
import { useGamification } from "./useGamification.js";
import Home from "./components/Home.jsx";
import ExploreMenu from "./components/ExploreMenu.jsx";
import ChallengeMenu from "./components/ChallengeMenu.jsx";
import WriteMenu from "./components/WriteMenu.jsx";
import StudyDeck from "./components/StudyDeck.jsx";
import QuizDeck from "./components/QuizDeck.jsx";
import WriteDeck from "./components/WriteDeck.jsx";
import "./App.css";

export default function App() {
  const { progress, markCard, recordQuizResult } = useProgress();
  const gamification = useGamification();
  const [screen, setScreen] = useState("home"); // "home" | "explore" | "challenge" | "write"
  const [selection, setSelection] = useState(null); // { type, group }

  const goHome = () => {
    setScreen("home");
    setSelection(null);
  };
  const backToMenu = () => setSelection(null);

  const handleFinishQuiz = (deckKey, result) => {
    recordQuizResult(deckKey, result);
    gamification.addXp(result.xpEarned);
  };

  let content;

  if (screen === "explore" && selection) {
    const deckKey = `${selection.type}:${selection.group.id}`;
    content = (
      <StudyDeck
        deckKey={deckKey}
        type={selection.type}
        cards={selection.group.cards}
        progress={progress}
        onMark={markCard}
        onBack={backToMenu}
      />
    );
  } else if (screen === "explore") {
    content = (
      <ExploreMenu
        progress={progress}
        onBack={goHome}
        onSelect={(type, group) => setSelection({ type, group })}
      />
    );
  } else if (screen === "challenge" && selection) {
    const deckKey = `${selection.type}:${selection.group.id}`;
    content = (
      <QuizDeck
        deckKey={deckKey}
        type={selection.type}
        cards={selection.group.cards}
        onBack={backToMenu}
        onFinish={handleFinishQuiz}
      />
    );
  } else if (screen === "challenge") {
    content = (
      <ChallengeMenu
        progress={progress}
        xp={gamification}
        onBack={goHome}
        onSelect={(type, group) => setSelection({ type, group })}
      />
    );
  } else if (screen === "write" && selection) {
    content = <WriteDeck cards={selection.group.cards} onBack={backToMenu} />;
  } else if (screen === "write") {
    content = (
      <WriteMenu
        onBack={goHome}
        onSelect={(type, group) => setSelection({ type, group })}
      />
    );
  } else {
    content = (
      <Home
        xp={gamification}
        onExplore={() => setScreen("explore")}
        onChallenge={() => setScreen("challenge")}
        onWrite={() => setScreen("write")}
      />
    );
  }

  return <div className="app-shell">{content}</div>;
}
