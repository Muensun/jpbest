# CLAUDE.md — JPTalk (โฟลเดอร์ JPBest)

เอกสารสรุปสำหรับ session ถัดไป อ่านไฟล์นี้ก่อนเริ่มแก้โค้ด

## 1. โปรเจกต์นี้คืออะไร

เว็บแอปเรียนภาษาญี่ปุ่นระดับ N5 สำหรับคนไทย แบบ gamification เล่นคนเดียว **ไม่มี backend** (state ทั้งหมดอยู่ใน localStorage) ชื่อแสดงผลคือ **JPTalk** (ชื่อโฟลเดอร์/repo ยังเป็น JPBest — ตั้งใจให้ต่างกัน ดู commit `38fb58b`)

เนื้อหาที่สอน (รวม 435 ใบ): ฮิรางานะ 104 ตัว / คาตากานะ 104 ตัว (清音 46, 濁音 25, 拗音 33 ต่อชุด), คันจิ N5 88 ตัว (9 หมวด), คำศัพท์ N5 91 คำ (10 หมวด), ประโยค N5 48 ประโยค (8 หมวด)

**4 โหมดหลัก** (เลือกจากหน้า Home):

| โหมด | ไฟล์ | ทำอะไร |
|---|---|---|
| EXPLORE 📖 | `StudyDeck` + `DeckTable` + `Flashcard` | ดูตารางอ้างอิง (kana / romaji / คำอ่านไทย) แตะแถวเพื่อเปิดบัตรคำพลิกได้ กด "จำได้/ยังไม่รู้" เพื่อป้อนระบบ spaced repetition มีแบนเนอร์ "ถึงกำหนดทบทวน" เปิดคิวเฉพาะการ์ดที่ครบกำหนด |
| WRITE ✍️ | `WriteDeck` | เขียนตัวอักษร (คานะ + คันจิ) บน canvas มี 2 โหมด: ลอกเส้นจาง / ไม่มีเส้น (ท่องจำ + ปุ่มเฉลย) กดตรวจแล้วให้คะแนน % จากการซ้อนทับ pixel (coverage + precision เฉลี่ยกัน) **ไม่มีการเช็กลำดับเส้น** เพราะยังไม่มี stroke-order dataset |
| BUILD 🧩 | `BuildDeck` | โชว์คำแปลไทย ผู้เล่นแตะ tile คานะที่สับแล้วต่อเป็นคำ/ประโยค (เฉพาะหมวดคำศัพท์+ประโยค ตัวอักษรเดี่ยวต่อไม่ได้) ตรวจอัตโนมัติเมื่อเติมครบทุกช่อง |
| CHALLENGE 🎯 | `QuizDeck` | ควิซ 4 ตัวเลือก (คานะ → romaji, คันจิ/คำ/ประโยค → ความหมายไทย) มี combo, XP, ดาว 3 ระดับ |

ระบบสะสมร่วม: XP/เลเวล (100 XP ต่อเลเวล), daily streak + longest streak, ดาวสูงสุดและคอมโบสูงสุดต่อเด็ค, Leitner box ต่อการ์ด
UI สลับได้ 3 ภาษา: ไทย (ดีฟอลต์) / English / 日本語 — **แต่เนื้อหาบัตรคำเป็นภาษาไทยเสมอ** เพราะถือเป็นสื่อการเรียน ไม่ใช่ UI chrome (เจตนาตั้งแต่ commit `223f328`)

## 2. Tech stack

- **React 19 + Vite 8** (JavaScript ล้วน ไม่มี TypeScript), `@vitejs/plugin-react`
- **CSS เปล่า ไม่ใช้ Tailwind** — ธีมผ่าน CSS variables ใน `src/index.css` (รองรับ dark mode ด้วย `prefers-color-scheme`), สไตล์คอมโพเนนต์รวมอยู่ใน `src/App.css` ไฟล์เดียว
- **oxlint** เป็น linter (`npm run lint`) ไม่มี Prettier ไม่มี test framework ไม่มี CI
- Deploy: **Netlify** (`netlify.toml` → build `npm run build`, publish `dist`, SPA redirect `/* → /index.html`)
- ไม่มี router — นำทางด้วย `useState` ใน `App.jsx`
- ไม่มี dependency นอกจาก react/react-dom

คำสั่ง: `npm run dev` | `npm run build` | `npm run preview` | `npm run lint`

## 3. โครงสร้างไฟล์

```
index.html              favicon/apple-touch-icon = /logo.png?v=2, title ไทย
netlify.toml            build + SPA redirect
src/
  main.jsx              mount + ครอบด้วย <LanguageProvider>
  App.jsx               router แบบ state: screen ("home"|"explore"|"challenge"|"write"|"build")
                        + selection ({type, group}); ประกอบ hooks ทั้ง 3 ตัวและส่ง props ลงไป
  i18n.jsx              dictionary 3 ภาษา + LanguageProvider/useLanguage/groupNamespace
  index.css             CSS variables + reset (ธีม navy #2c687b / teal #8cc7c4 / red #db1a1a)
  App.css               สไตล์ทั้งแอป แบ่งด้วยคอมเมนต์ /* ---------- ชื่อส่วน ---------- */
  useProgress.js        Leitner box ต่อการ์ด + bestStars/bestCombo ต่อเด็ค
  useGamification.js    XP รวม + เลเวล
  useStreak.js          daily streak + longest
  useScrollRestore.js   จำตำแหน่ง scroll ต่อหน้า กดกลับแล้วไม่เด้งขึ้นบนสุด
  components/
    Home.jsx            โลโก้ + streak badge + XpBar + เมนู 4 ใบ
    ExploreMenu / ChallengeMenu / WriteMenu / BuildMenu   หน้าเลือกเด็คของแต่ละโหมด
    CategoryDeckList.jsx  ตัวกลาง render รายการเด็ค รับ renderMeta/renderActions เป็น render prop
    StudyDeck / QuizDeck / WriteDeck / BuildDeck          หน้าจอเล่นจริงของแต่ละโหมด
    DeckTable.jsx       ตารางอ้างอิงใน EXPLORE
    Flashcard.jsx       บัตรคำพลิกหน้า-หลัง
    XpBar.jsx / LanguageSwitcher.jsx
  data/
    hiragana.js / katakana.js   groups: seion / dakuon / youon
    kanji.js                    คันจิ N5 88 ตัว 9 หมวดตามความหมาย
    vocab.js / sentences.js     groups แยกตามหมวด/สถานการณ์
    sections.js                 DECK_SECTIONS: characters (hiragana/katakana/kanji) | wordsSentences (vocab/sentences)
                                — แหล่งความจริงของเมนูทุกโหมด
    kanaThai.js                 romaji → คำอ่านไทยโดยประมาณ + thaiReading()
public/logo.png         โลโก้ + favicon
public/icons.svg        ** leftover จาก template ไม่ได้ใช้ที่ไหน ลบได้ **
hiragana-app-prompt.md  prompt ต้นฉบับที่ใช้เริ่มโปรเจกต์ (ยังไม่ commit)
language switch.png     mockup ของ language switcher (ยังไม่ commit)
```

รูปร่างข้อมูล: deck group = `{ id, label, cards[] }`; card คานะ = `{ kana, romaji }`; card คำ/ประโยค = `{ kana, kanji, romaji, meaning }` (`kanji` เป็น `""` ได้); card คันจิ = `{ kana: "漢", kanji: "", romaji: "on / kun", meaning }`

⚠️ ฟิลด์ `kana` จริง ๆ แล้วหมายถึง **"หน้าบัตร"** ไม่ใช่ "ตัวคานะ" — เป็นทั้งตัวที่โชว์หน้าบัตรทุกชนิดเด็คและเป็น key ของ progress ([useProgress.js:31](src/useProgress.js#L31)) ตัวคันจิจึงอยู่ในฟิลด์นี้ ไม่ใช่ฟิลด์ `kanji` (ฟิลด์นั้นไว้ใส่รูปคันจิของคำ/ประโยคที่เขียนด้วยคานะ) ถ้าจะ rename เป็น `front` ต้องแก้ 7 ไฟล์ (6 คอมโพเนนต์ + `useProgress.js`) แต่ค่าใน localStorage ไม่เสียเพราะเก็บเป็นค่าของฟิลด์ ไม่ใช่ชื่อฟิลด์
**deckKey** = `` `${type}:${group.id}` `` และ BUILD ใช้ `` `build:${type}:${group.id}` `` เพื่อแยกสถิติออกจาก CHALLENGE

## 4. Timeline การพัฒนา (จาก git log — main เดียว ไม่มี branch)

| วันที่ | commit | สาระ / เหตุผล |
|---|---|---|
| 29 ก.ค. | `bf8e01c` | **Initial** — React+Vite flashcard: study mode, ควิซ 4 ตัวเลือก, localStorage |
| 29 ก.ค. | `4f7a383` | เพิ่ม Netlify config (เริ่มมีการ deploy จริง) |
| 29 ก.ค. | `3577f9e` | เพิ่มหน้า Home แยก EXPLORE / CHALLENGE, เพิ่มชุดประโยค N5, เริ่มระบบ XP/เลเวล/ดาว (แทน `DeckMenu.jsx` เดิมด้วย `ExploreMenu`+`ChallengeMenu`+`CategoryDeckList`) |
| 29 ก.ค. | `8b0876d` | เปลี่ยน EXPLORE จากสุ่มทีละใบ → **ตารางอ้างอิงเห็นทั้งชุด** แล้วค่อยแตะเข้าโฟกัส เพราะการจำตัวอักษรต้องเห็นภาพรวม; เพิ่มคำอ่านไทย (`kanaThai.js`) |
| 29 ก.ค. | `484c402` | เพิ่มโหมด **WRITE** ลากเส้นบน canvas + คะแนนความใกล้เคียง (ระบุชัดว่ายังไม่เช็ก stroke order) |
| 29 ก.ค. | `cde203c` | WRITE เพิ่มโหมด "ไม่มีเส้น (ท่องจำ)" + ปุ่มเฉลย |
| 4 ส.ค. | `38fb58b`, `7c58c97`, `bf9b006` | รีแบรนด์ชื่อแสดงผล JPBest → **JPTalk**, ใส่ logo.png เป็น favicon/หน้า Home, cache-bust + apple-touch-icon |
| 4 ส.ค. | `223f328` | **i18n ไทย/อังกฤษ/ญี่ปุ่น** + language switcher (ทำตาม mockup `language switch.png`); ตัดสินใจว่าเนื้อหาบัตรคำคงเป็นไทย |
| 4 ส.ค. | `b04056d` | เปลี่ยนธีมสีม่วง → **แดง/เทา-เขียว/น้ำเงินเข้ม** ผ่าน CSS variables |
| 4 ส.ค. | `0d36279` | **ยกเครื่องระบบความจำ**: flag known/unknown → Leitner box 0-5 (ผิด=กลับ box 0, ถูก=ขยับ box, ทบทวน 1/3/7/14/30 วัน), daily streak, combo + โบนัส XP, personal best, และแก้คำอ่านไทยแถว さ/ざ/ち/を ให้ตรงสเปกต้นฉบับ |
| 8 ส.ค. | `4e02899` | **โหมด BUILD (ต่อคำ)** — ใช้ระบบ combo/XP/ดาวร่วมกับ CHALLENGE |
| 21 ก.ย. | `585aca8` | เพิ่มไฟล์ CLAUDE.md นี้ |
| 21 ก.ย. | `0bff954` | **แก้ scroll เด้ง**: เพิ่ม `useScrollRestore` เพราะแอปไม่มี router เบราว์เซอร์เลยไม่เคยจำตำแหน่งให้ กดกลับจากเด็คทีไรไปโผล่บนสุด |
| 21 ก.ย. | `2043be5` | เพิ่มคำศัพท์ 4 หมวด (สี/สถานที่/การเดินทาง/อากาศ) + ประโยค 4 หมวด (ซื้อของ/ร้านอาหาร/ถามทาง/ความรู้สึก) |
| 21 ก.ย. | `2261449` | **เด็คคันจิ N5** เป็นเด็คที่สามในหมวด "ตัวอักษร" ได้ WRITE ฟรีและถูกกันออกจาก BUILD เอง; เปลี่ยนการเช็กชนิดเด็คใน 3 จุดเป็นกฎ "มี meaning ใช้ meaning" (commit ล่าสุด) |

ทิศทางที่เห็นจาก timeline: เริ่มจาก flashcard ธรรมดา → เพิ่มโหมดการเรียนหลายแบบ → ทำ gamification ให้ลึกขึ้น (จาก "ใส่แต้ม" เป็น "บังคับสมองทวนจริง" ตามเป้าใน `hiragana-app-prompt.md`)

## 5. ทำเสร็จแล้ว vs ยังค้าง

### เสร็จแล้ว
- 4 โหมดครบ (EXPLORE / WRITE / BUILD / CHALLENGE) ใช้งานได้จริง
- Spaced repetition แบบ Leitner 6 ระดับ + คิวทบทวนตามกำหนด
- XP / เลเวล / ดาว / combo + โบนัส / daily streak / personal best — persist ครบ
- i18n 3 ภาษา **key ครบเท่ากันทั้ง 94 key ทั้ง th/en/ja** (เช็กแล้ว ไม่มีตกหล่น)
- Dark mode ผ่าน CSS variables, layout mobile-first
- จำตำแหน่ง scroll ตอนกดกลับ ทั้งระดับหน้าและระดับตาราง↔บัตรคำใน EXPLORE
- Deploy บน Netlify ได้

### ยังค้าง / รู้ปัญหาแล้วแต่ยังไม่แก้
- **`home.moreHint` = "เมนูอื่น ๆ กำลังจะตามมาเร็ว ๆ นี้"** — ค้างอยู่ในหน้า Home แต่ยังไม่มีเมนูที่ 5 ในแผน
- ฟีเจอร์จากสเปกต้นฉบับที่ยังไม่ได้ทำ (`hiragana-app-prompt.md`):
  - **collection grid 46 ช่อง** (ตัวที่ยังไม่เก็บเป็นสีเทา) — ตอนนี้ใช้ตารางอ้างอิง + เครื่องหมาย ✓ แทน
  - **ปลดล็อกทีละแถว** (ต้องผ่านแถวก่อนถึงเปิดแถวถัดไป) — ยังเปิดทุกเด็คตั้งแต่แรก
  - **โหมดกลับด้าน** (โชว์คำอ่าน → เลือกตัวอักษร) และ **โหมดจับเวลา**
  - Noto Sans JP จาก Google Fonts (ตอนนี้ใช้ system-ui / Hiragino-Yu Gothic เฉพาะบน canvas)
- **WRITE ไม่ให้ XP** — นับแค่ streak (`onActivity`) ไม่เรียก `addXp` ต่างจาก CHALLENGE/BUILD
- **WRITE ไม่เช็กลำดับ/ทิศทางเส้น** ให้คะแนนจากการซ้อนทับ pixel อย่างเดียว
- **storage key ไม่สม่ำเสมอหลังรีแบรนด์**: `jpbest-progress`, `jpbest-xp` (เก่า) ปนกับ `jptalk-streak`, `jptalk-lang` — ถ้าจะ rename ต้องเขียน migration ไม่งั้น progress ผู้ใช้หาย
- **โค้ดซ้ำระหว่าง `QuizDeck` กับ `BuildDeck`**: `shuffle()`, `computeResult()`, logic combo/milestone/รายงานผล เกือบเหมือนกัน (ต่างแค่ XP ต่อข้อ 10 vs 12) — ควรแยกเป็น hook ร่วมถ้าจะเพิ่มโหมดที่ 5
- **lint warning ค้าง 4 ข้อ** (ไม่ error): `react/only-export-components` ใน `i18n.jsx` 3 จุด และ `exhaustive-deps` ใน `WriteDeck.jsx:44` (ตั้งใจ: effect ต้องรันเมื่อเปลี่ยนการ์ดเท่านั้น)
- **README.md ยังเป็น template ของ Vite** ไม่ได้เขียนถึงโปรเจกต์จริง
- `public/icons.svg` เป็นไฟล์ค้างจาก template ไม่มีใครอ้างถึง
- ไม่มีเทสต์ ไม่มี CI
- ไฟล์ที่ยังไม่ commit: `hiragana-app-prompt.md`, `language switch.png`

## 6. Convention ที่ใช้อยู่

**ภาษาและคอมเมนต์**
- UI ทุกสตริงผ่าน `t("namespace.key")` เสมอ ห้าม hardcode ข้อความ — เพิ่ม key ต้องเพิ่มครบทั้ง `th`, `en`, `ja` ใน `src/i18n.jsx`
- key i18n เป็น `camelCase` ใต้ namespace: `nav.*`, `home.*`, `study.*`, `quiz.*`, `write.*`, `build.*`, `category.*`, `deck.*`, `group.<ns>.<id>`, `table.*`, `streak.*`
- ตัวแปรในสตริงใช้ `{name}` แล้ว interpolate เอง เช่น `t("study.knownCount", { known, total })`
- **คอมเมนต์ในโค้ดเป็นภาษาไทย** เฉพาะจุดที่ตัดสินใจอะไรไว้ (ไม่ใช่อธิบายบรรทัดต่อบรรทัด) ส่วน header ของไฟล์ data ก็เป็นไทย

**ไฟล์และการตั้งชื่อ**
- คอมโพเนนต์ = `PascalCase.jsx` ใน `src/components/` ใช้ `export default function` + destructure props ในวงเล็บ
- hook = `useXxx.js` ที่ราก `src/` ใช้ named export คืน object ของ state + action
- data = `camelCase.js` ใน `src/data/` export ชื่อ `xxxGroups` เป็น array คงที่
- ค่าคงที่ไฟล์-ระดับเป็น `SCREAMING_SNAKE` ไว้บนสุดของไฟล์ (`SIZE`, `COMBO_MILESTONES`, `STORAGE_KEY`, `INTERVAL_DAYS`)
- import ใส่นามสกุล `.js` / `.jsx` เสมอ
- ไม่มี semicolon-free style — **ใส่ semicolon** และใช้ double quotes ใน `src/components/` และ hooks (ไฟล์ template เดิม `main.jsx`/`vite.config.js` ยังเป็น single quote ไม่มี semi — ไม่ต้องไปแก้)

**สถาปัตยกรรม**
- state ทั้งหมดอยู่ที่ `App.jsx` แล้วส่งลงเป็น props — **ไม่มี context ยกเว้น i18n**
- คอมโพเนนต์ลูกไม่แตะ localStorage เอง ทุกอย่างผ่าน hook 3 ตัว
- เมนูทุกโหมดสร้างจาก `DECK_SECTIONS` ผ่าน `CategoryDeckList` ด้วย render props (`renderMeta`, `renderActions`) — จะเพิ่มโหมดใหม่ให้ filter `DECK_SECTIONS` แบบที่ `WriteMenu`/`BuildMenu` ทำ
- **เพิ่มเด็คชนิดใหม่ให้ใส่ใน section ที่ถูก แล้ว filter ของทุกโหมดจะจัดการเอง** ไม่ต้องไล่แก้เมนู (คันจิใช้วิธีนี้: อยู่ใน `characters` → WRITE ได้ฟรี, BUILD กันออกเอง)
- การ์ดแต่ละชนิดแยกด้วย **คุณสมบัติของการ์ด ไม่ใช่ `type`** — `card.meaning || thaiReading(card.romaji)` ใน `DeckTable`/`Flashcard`/`QuizDeck` ถ้าจะเพิ่มชนิดเด็คใหม่ให้ทำแนวนี้ อย่าไล่เติม `type === "..."`
- อ่าน/เขียน localStorage ห่อ `try/catch` เสมอ และมีค่า fallback

**CSS**
- class เป็น `kebab-case` ตามบล็อก เช่น `build-tile`, `quiz-choice`; ตัว modifier ใช้ `is-xxx` (`is-correct`, `is-wrong`, `is-active`, `is-known`, `is-used`, `is-hidden`)
- สีต้องมาจาก CSS variable ใน `index.css` เท่านั้น อย่า hardcode hex ใน `App.css` (ยกเว้นสีหมึก canvas ใน `WriteDeck.jsx` ที่ยังเป็น literal `#1c4855`)
- เพิ่มสไตล์ใหม่ = ต่อท้าย `App.css` พร้อมหัวข้อ `/* ---------- ชื่อส่วน ---------- */`
