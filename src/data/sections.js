import { hiraganaGroups } from "./hiragana.js";
import { katakanaGroups } from "./katakana.js";
import { vocabGroups } from "./vocab.js";
import { sentenceGroups } from "./sentences.js";

export const DECK_SECTIONS = [
  {
    id: "characters",
    decks: [
      { type: "hiragana", emoji: "あ", groups: hiraganaGroups },
      { type: "katakana", emoji: "ア", groups: katakanaGroups },
    ],
  },
  {
    id: "wordsSentences",
    decks: [
      { type: "vocab", emoji: "語", groups: vocabGroups },
      { type: "sentences", emoji: "文", groups: sentenceGroups },
    ],
  },
];
