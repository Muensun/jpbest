import { hiraganaGroups } from "./hiragana.js";
import { katakanaGroups } from "./katakana.js";
import { vocabGroups } from "./vocab.js";
import { sentenceGroups } from "./sentences.js";

export const DECK_SECTIONS = [
  {
    category: "ตัวอักษร",
    decks: [
      { type: "hiragana", label: "ひらがな Hiragana", emoji: "あ", groups: hiraganaGroups },
      { type: "katakana", label: "カタカナ Katakana", emoji: "ア", groups: katakanaGroups },
    ],
  },
  {
    category: "คำและประโยค",
    decks: [
      { type: "vocab", label: "คำศัพท์ N5", emoji: "語", groups: vocabGroups },
      { type: "sentences", label: "ประโยค N5", emoji: "文", groups: sentenceGroups },
    ],
  },
];
