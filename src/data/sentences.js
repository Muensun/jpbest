// ประโยคพื้นฐานระดับ N5 แบ่งตามสถานการณ์
export const sentenceGroups = [
  {
    id: "intro",
    label: "แนะนำตัว",
    cards: [
      { kana: "わたしは たなかです。", kanji: "私は田中です。", romaji: "watashi wa tanaka desu.", meaning: "ฉันชื่อทานากะ" },
      { kana: "わたしは タイじんです。", kanji: "私はタイ人です。", romaji: "watashi wa tai jin desu.", meaning: "ฉันเป็นคนไทย" },
      { kana: "はじめまして。", kanji: "", romaji: "hajimemashite.", meaning: "ยินดีที่ได้รู้จัก" },
      { kana: "どうぞ よろしく おねがいします。", kanji: "", romaji: "douzo yoroshiku onegaishimasu.", meaning: "ฝากตัวด้วยนะครับ/ค่ะ" },
      { kana: "がくせいです。", kanji: "学生です。", romaji: "gakusei desu.", meaning: "ฉันเป็นนักเรียน" },
      { kana: "かいしゃいんです。", kanji: "会社員です。", romaji: "kaishain desu.", meaning: "ฉันเป็นพนักงานบริษัท" },
    ],
  },
  {
    id: "daily",
    label: "ชีวิตประจำวัน",
    cards: [
      { kana: "まいあさ ろくじに おきます。", kanji: "毎朝6時に起きます。", romaji: "maiasa rokuji ni okimasu.", meaning: "ตื่นนอนหกโมงเช้าทุกวัน" },
      { kana: "がっこうへ いきます。", kanji: "学校へ行きます。", romaji: "gakkou e ikimasu.", meaning: "ไปโรงเรียน" },
      { kana: "ごはんを たべます。", kanji: "ご飯を食べます。", romaji: "gohan wo tabemasu.", meaning: "กินข้าว" },
      { kana: "テレビを みます。", kanji: "", romaji: "terebi wo mimasu.", meaning: "ดูโทรทัศน์" },
      { kana: "ほんを よみます。", kanji: "本を読みます。", romaji: "hon wo yomimasu.", meaning: "อ่านหนังสือ" },
      { kana: "じゅういちじに ねます。", kanji: "11時に寝ます。", romaji: "juuichiji ni nemasu.", meaning: "นอนตอนสี่ทุ่ม" },
    ],
  },
  {
    id: "questions",
    label: "คำถามพื้นฐาน",
    cards: [
      { kana: "これは なんですか。", kanji: "", romaji: "kore wa nan desu ka.", meaning: "นี่คืออะไร" },
      { kana: "おなまえは なんですか。", kanji: "お名前は何ですか。", romaji: "onamae wa nan desu ka.", meaning: "คุณชื่ออะไร" },
      { kana: "いま なんじですか。", kanji: "今何時ですか。", romaji: "ima nanji desu ka.", meaning: "ตอนนี้กี่โมง" },
      { kana: "トイレは どこですか。", kanji: "", romaji: "toire wa doko desu ka.", meaning: "ห้องน้ำอยู่ที่ไหน" },
      { kana: "いくらですか。", kanji: "", romaji: "ikura desu ka.", meaning: "ราคาเท่าไหร่" },
      { kana: "だいじょうぶですか。", kanji: "", romaji: "daijoubu desu ka.", meaning: "ไม่เป็นไรใช่ไหม" },
    ],
  },
  {
    id: "polite",
    label: "คำขอ/สุภาพ",
    cards: [
      { kana: "ちょっと まってください。", kanji: "少し待ってください。", romaji: "chotto matte kudasai.", meaning: "รอสักครู่นะ" },
      { kana: "もういちど おねがいします。", kanji: "もう一度お願いします。", romaji: "mou ichido onegaishimasu.", meaning: "ขอพูดอีกครั้งนะ" },
      { kana: "てつだって ください。", kanji: "手伝ってください。", romaji: "tetsudatte kudasai.", meaning: "ช่วยหน่อยนะ" },
      { kana: "しゃしんを とっても いいですか。", kanji: "写真を撮ってもいいですか。", romaji: "shashin wo tottemo ii desu ka.", meaning: "ถ่ายรูปได้ไหม" },
      { kana: "みずを ください。", kanji: "水をください。", romaji: "mizu wo kudasai.", meaning: "ขอน้ำหน่อย" },
      { kana: "ここに すわっても いいですか。", kanji: "", romaji: "koko ni suwattemo ii desu ka.", meaning: "นั่งตรงนี้ได้ไหม" },
    ],
  },
];
