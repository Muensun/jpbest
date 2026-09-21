import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "jptalk-lang";

export const translations = {
  th: {
    "nav.back": "← กลับ",
    "nav.level": "เลเวล",
    "nav.explore": "EXPLORE",
    "nav.write": "WRITE",
    "nav.challenge": "CHALLENGE",
    "nav.build": "BUILD",

    "home.subtitle": "ฝึกภาษาญี่ปุ่นทีละก้าว จากฮิรางานะถึงประโยคง่ายๆ",
    "home.exploreDesc": "จำตัวอักษร คำศัพท์ และประโยค",
    "home.writeDesc": "ฝึกลากเส้นตัวอักษรให้ใกล้เคียง",
    "home.challengeDesc": "ทำแบบทดสอบ สะสม XP และดาว",
    "home.buildDesc": "ต่อตัวอักษรให้เป็นคำศัพท์/ประโยค",
    "home.moreHint": "เมนูอื่น ๆ กำลังจะตามมาเร็ว ๆ นี้",

    "explore.subtitle": "จำตัวอักษร คำศัพท์ และประโยคด้วยบัตรคำ",
    "explore.action": "ฝึกบัตรคำ",

    "challengeMenu.subtitle": "ทำแบบทดสอบเพื่อสะสม XP และดาว",
    "challengeMenu.action": "เริ่มทำแบบทดสอบ",

    "writeMenu.subtitle": "ฝึกลากเส้นฮิรางานะ/คาตากานะให้ใกล้เคียงตัวจริง",
    "writeMenu.action": "ฝึกเขียน",

    "buildMenu.subtitle": "ดูคำแปลไทย แล้วแตะตัวอักษรต่อกันให้เป็นคำอ่านที่ถูกต้อง",
    "buildMenu.action": "เริ่มต่อคำ",

    "build.undo": "ลบตัวล่าสุด",
    "build.correct": "ถูกต้อง! 🎉",
    "build.wrongAnswer": "ไม่ถูกนะ เฉลยคือ {answer}",

    "category.characters": "ตัวอักษร",
    "category.wordsSentences": "คำและประโยค",

    "deck.hiragana": "ひらがな Hiragana",
    "deck.katakana": "カタカナ Katakana",
    "deck.vocab": "คำศัพท์ N5",
    "deck.sentences": "ประโยค N5",
    "deck.kanji": "คันจิ N5",

    "group.kana.seion": "พื้นฐาน (清音)",
    "group.kana.dakuon": "เสียงก้อง (濁音・半濁音)",
    "group.kana.youon": "เสียงควบ (拗音)",
    "group.vocab.greetings": "ทักทาย",
    "group.vocab.numbers": "ตัวเลข",
    "group.vocab.family": "ครอบครัว",
    "group.vocab.food": "อาหาร",
    "group.vocab.time": "เวลา/วัน",
    "group.vocab.verbs-adjectives": "คำกริยา/คำคุณศัพท์พื้นฐาน",
    "group.sentences.intro": "แนะนำตัว",
    "group.sentences.daily": "ชีวิตประจำวัน",
    "group.sentences.questions": "คำถามพื้นฐาน",
    "group.sentences.polite": "คำขอ/สุภาพ",
    "group.vocab.colors": "สี",
    "group.vocab.places": "สถานที่",
    "group.vocab.transport": "การเดินทาง",
    "group.vocab.weather": "อากาศ/ฤดูกาล",
    "group.sentences.shopping": "ซื้อของ",
    "group.sentences.restaurant": "ร้านอาหาร",
    "group.sentences.directions": "ถามทาง",
    "group.sentences.feelings": "ความรู้สึก/สุขภาพ",
    "group.kanji.numbers": "ตัวเลข/จำนวน",
    "group.kanji.week": "วันในสัปดาห์",
    "group.kanji.time": "เวลา",
    "group.kanji.people": "คน/ครอบครัว",
    "group.kanji.nature": "ธรรมชาติ",
    "group.kanji.directions": "ทิศทาง/ตำแหน่ง",
    "group.kanji.verbs": "กริยาพื้นฐาน",
    "group.kanji.adjectives": "คำคุณศัพท์",
    "group.kanji.common": "คำที่พบบ่อย",

    "study.knownCount": "จำได้แล้ว {known}/{total} คำ",
    "study.tapHintTable": "แตะแถวเพื่อดูทีละคำ",
    "study.backToTable": "← ตาราง",
    "study.tapHintCard": "แตะบัตรคำเพื่อดูคำเฉลย",
    "study.dontKnow": "ยังไม่รู้",
    "study.skip": "ข้าม",
    "study.know": "รู้แล้ว ✓",
    "study.dueCount": "ถึงกำหนดทบทวน {count} คำ",
    "study.reviewButton": "ทบทวนตอนนี้",

    "table.headerWordSentence": "คำ/ประโยค",
    "table.headerCharacter": "ตัวอักษร",
    "table.headerRomaji": "โรมาจิ",
    "table.headerThai": "ไทย",

    "quiz.progress": "{pos} / {total} · ถูก {correct}",
    "quiz.resultTitle": "สรุปผล",
    "quiz.resultScore": "ตอบถูก {correct} / {total}",
    "quiz.retry": "ทำอีกครั้ง",
    "quiz.next": "ถัดไป →",
    "quiz.combo": "คอมโบ x{combo}",
    "quiz.comboBonus": "+{xp} XP จากคอมโบ",

    "streak.label": "{days} วันติดต่อกัน",
    "streak.best": "สถิติสูงสุด {days} วัน",

    "challengeMenu.bestCombo": "คอมโบสูงสุด x{combo}",

    "write.modeGuide": "มีเส้นให้ลอก",
    "write.modeBlind": "ไม่มีเส้น (ท่องจำ)",
    "write.hintGuide": "ลากนิ้วหรือเมาส์ทับตัวจาง ๆ ให้ใกล้เคียงที่สุด",
    "write.hintBlind": "เขียนจากความจำ แล้วกด \"ดูเฉลย\" เพื่อเทียบ",
    "write.scoreLabel": "ใกล้เคียง {score}%",
    "write.clear": "ล้าง",
    "write.showAnswer": "ดูเฉลย",
    "write.hideAnswer": "ซ่อนเฉลย",
    "write.check": "ตรวจ",
    "write.prev": "← ก่อนหน้า",
    "write.next": "ถัดไป →",
  },
  en: {
    "nav.back": "← Back",
    "nav.level": "Level",
    "nav.explore": "EXPLORE",
    "nav.write": "WRITE",
    "nav.challenge": "CHALLENGE",
    "nav.build": "BUILD",

    "home.subtitle": "Learn Japanese step by step, from hiragana to simple sentences",
    "home.exploreDesc": "Learn characters, vocabulary, and sentences",
    "home.writeDesc": "Practice tracing characters accurately",
    "home.challengeDesc": "Take quizzes to earn XP and stars",
    "home.buildDesc": "Piece characters together into words/sentences",
    "home.moreHint": "More menus coming soon",

    "explore.subtitle": "Learn characters, vocabulary, and sentences with flashcards",
    "explore.action": "Study Flashcards",

    "challengeMenu.subtitle": "Take quizzes to earn XP and stars",
    "challengeMenu.action": "Start Quiz",

    "writeMenu.subtitle": "Practice tracing hiragana/katakana as accurately as you can",
    "writeMenu.action": "Practice Writing",

    "buildMenu.subtitle": "See the Thai meaning, then tap the characters to spell it correctly",
    "buildMenu.action": "Start Building",

    "build.undo": "Undo last",
    "build.correct": "Correct! 🎉",
    "build.wrongAnswer": "Not quite — the answer is {answer}",

    "category.characters": "Characters",
    "category.wordsSentences": "Words & Sentences",

    "deck.hiragana": "ひらがな Hiragana",
    "deck.katakana": "カタカナ Katakana",
    "deck.vocab": "N5 Vocabulary",
    "deck.sentences": "N5 Sentences",
    "deck.kanji": "N5 Kanji",

    "group.kana.seion": "Basic (清音)",
    "group.kana.dakuon": "Voiced (濁音・半濁音)",
    "group.kana.youon": "Combined (拗音)",
    "group.vocab.greetings": "Greetings",
    "group.vocab.numbers": "Numbers",
    "group.vocab.family": "Family",
    "group.vocab.food": "Food",
    "group.vocab.time": "Time / Days",
    "group.vocab.verbs-adjectives": "Basic Verbs / Adjectives",
    "group.sentences.intro": "Self-Introduction",
    "group.sentences.daily": "Daily Life",
    "group.sentences.questions": "Basic Questions",
    "group.sentences.polite": "Requests / Polite Phrases",
    "group.vocab.colors": "Colors",
    "group.vocab.places": "Places",
    "group.vocab.transport": "Transport",
    "group.vocab.weather": "Weather / Seasons",
    "group.sentences.shopping": "Shopping",
    "group.sentences.restaurant": "At the Restaurant",
    "group.sentences.directions": "Asking Directions",
    "group.sentences.feelings": "Feelings / Health",
    "group.kanji.numbers": "Numbers / Amounts",
    "group.kanji.week": "Days of the Week",
    "group.kanji.time": "Time",
    "group.kanji.people": "People / Family",
    "group.kanji.nature": "Nature",
    "group.kanji.directions": "Directions / Position",
    "group.kanji.verbs": "Basic Verbs",
    "group.kanji.adjectives": "Adjectives",
    "group.kanji.common": "Everyday Kanji",

    "study.knownCount": "Learned {known}/{total}",
    "study.tapHintTable": "Tap a row to view it on its own",
    "study.backToTable": "← Table",
    "study.tapHintCard": "Tap the card to reveal the answer",
    "study.dontKnow": "Don't know yet",
    "study.skip": "Skip",
    "study.know": "Know it ✓",
    "study.dueCount": "{count} due for review",
    "study.reviewButton": "Review Now",

    "table.headerWordSentence": "Word / Sentence",
    "table.headerCharacter": "Character",
    "table.headerRomaji": "Romaji",
    "table.headerThai": "Meaning (TH)",

    "quiz.progress": "{pos} / {total} · Correct {correct}",
    "quiz.resultTitle": "Results",
    "quiz.resultScore": "Correct {correct} / {total}",
    "quiz.retry": "Try Again",
    "quiz.next": "Next →",
    "quiz.combo": "Combo x{combo}",
    "quiz.comboBonus": "+{xp} XP combo bonus",

    "streak.label": "{days}-day streak",
    "streak.best": "Best {days} days",

    "challengeMenu.bestCombo": "Best combo x{combo}",

    "write.modeGuide": "With Guide",
    "write.modeBlind": "No Guide (Memory)",
    "write.hintGuide": "Trace over the faint character as closely as you can",
    "write.hintBlind": "Write from memory, then tap \"Reveal\" to compare",
    "write.scoreLabel": "{score}% match",
    "write.clear": "Clear",
    "write.showAnswer": "Reveal",
    "write.hideAnswer": "Hide",
    "write.check": "Check",
    "write.prev": "← Previous",
    "write.next": "Next →",
  },
  ja: {
    "nav.back": "← 戻る",
    "nav.level": "レベル",
    "nav.explore": "EXPLORE",
    "nav.write": "WRITE",
    "nav.challenge": "CHALLENGE",
    "nav.build": "BUILD",

    "home.subtitle": "ひらがなから簡単な文まで、一歩ずつ日本語を学ぼう",
    "home.exploreDesc": "文字・単語・文を覚えよう",
    "home.writeDesc": "文字をなぞって練習しよう",
    "home.challengeDesc": "クイズに挑戦してXPと星を集めよう",
    "home.buildDesc": "文字を組み合わせて単語・文を作ろう",
    "home.moreHint": "他のメニューも近日公開予定",

    "explore.subtitle": "フラッシュカードで文字・単語・文を覚えよう",
    "explore.action": "カードで練習",

    "challengeMenu.subtitle": "クイズに挑戦してXPと星を集めよう",
    "challengeMenu.action": "クイズを始める",

    "writeMenu.subtitle": "ひらがな・カタカナをできるだけ正確になぞって練習しよう",
    "writeMenu.action": "書く練習",

    "buildMenu.subtitle": "タイ語の意味を見て、正しい読み方になるように文字をタップしよう",
    "buildMenu.action": "組み立てる",

    "build.undo": "1つ戻す",
    "build.correct": "正解! 🎉",
    "build.wrongAnswer": "違います。正解は {answer}",

    "category.characters": "文字",
    "category.wordsSentences": "単語と文",

    "deck.hiragana": "ひらがな Hiragana",
    "deck.katakana": "カタカナ Katakana",
    "deck.vocab": "N5単語",
    "deck.sentences": "N5の文",
    "deck.kanji": "N5漢字",

    "group.kana.seion": "清音",
    "group.kana.dakuon": "濁音・半濁音",
    "group.kana.youon": "拗音",
    "group.vocab.greetings": "あいさつ",
    "group.vocab.numbers": "数字",
    "group.vocab.family": "家族",
    "group.vocab.food": "食べ物",
    "group.vocab.time": "時間・曜日",
    "group.vocab.verbs-adjectives": "基本の動詞・形容詞",
    "group.sentences.intro": "自己紹介",
    "group.sentences.daily": "日常生活",
    "group.sentences.questions": "基本の質問",
    "group.sentences.polite": "お願い・丁寧表現",
    "group.vocab.colors": "色",
    "group.vocab.places": "場所",
    "group.vocab.transport": "乗り物",
    "group.vocab.weather": "天気・季節",
    "group.sentences.shopping": "買い物",
    "group.sentences.restaurant": "レストラン",
    "group.sentences.directions": "道を聞く",
    "group.sentences.feelings": "気持ち・体調",
    "group.kanji.numbers": "数・お金",
    "group.kanji.week": "曜日",
    "group.kanji.time": "時間",
    "group.kanji.people": "人・家族",
    "group.kanji.nature": "自然",
    "group.kanji.directions": "方向・位置",
    "group.kanji.verbs": "基本の動詞",
    "group.kanji.adjectives": "形容詞",
    "group.kanji.common": "よく使う漢字",

    "study.knownCount": "覚えた数 {known}/{total}",
    "study.tapHintTable": "行をタップして1つずつ見る",
    "study.backToTable": "← 表",
    "study.tapHintCard": "カードをタップして答えを見る",
    "study.dontKnow": "まだ",
    "study.skip": "スキップ",
    "study.know": "覚えた ✓",
    "study.dueCount": "復習が必要な単語 {count}個",
    "study.reviewButton": "今すぐ復習",

    "table.headerWordSentence": "単語・文",
    "table.headerCharacter": "文字",
    "table.headerRomaji": "ローマ字",
    "table.headerThai": "意味(タイ語)",

    "quiz.progress": "{pos} / {total} ・ 正解 {correct}",
    "quiz.resultTitle": "結果",
    "quiz.resultScore": "正解 {correct} / {total}",
    "quiz.retry": "もう一度",
    "quiz.next": "次へ →",
    "quiz.combo": "コンボ x{combo}",
    "quiz.comboBonus": "コンボボーナス +{xp} XP",

    "streak.label": "連続{days}日",
    "streak.best": "自己ベスト {days}日",

    "challengeMenu.bestCombo": "最高コンボ x{combo}",

    "write.modeGuide": "なぞり書き",
    "write.modeBlind": "見本なし(暗記)",
    "write.hintGuide": "薄い文字をできるだけ正確になぞってください",
    "write.hintBlind": "記憶を頼りに書いて、「答えを見る」で確認しよう",
    "write.scoreLabel": "一致度 {score}%",
    "write.clear": "消す",
    "write.showAnswer": "答えを見る",
    "write.hideAnswer": "隠す",
    "write.check": "採点",
    "write.prev": "← 前へ",
    "write.next": "次へ →",
  },
};

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
}

function loadLang() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "th";
  } catch {
    return "th";
  }
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(loadLang);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const t = (key, vars) => {
    const raw = translations[lang]?.[key] ?? translations.th[key] ?? key;
    return interpolate(raw, vars);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function groupNamespace(type) {
  return type === "hiragana" || type === "katakana" ? "kana" : type;
}
