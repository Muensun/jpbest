import { useEffect, useRef, useState } from "react";

const SIZE = 300; // CSS px, canvas is square

function drawGlyph(canvas, dpr, char, color) {
  canvas.width = SIZE * dpr;
  canvas.height = SIZE * dpr;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.font = `${Math.round(SIZE * 0.72)}px "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(char, SIZE / 2, SIZE / 2 + SIZE * 0.03);
  return ctx;
}

export default function WriteDeck({ cards, onBack }) {
  const [pos, setPos] = useState(0);
  const [score, setScore] = useState(null);
  const [mode, setMode] = useState("guide"); // "guide" | "blind"
  const [showAnswer, setShowAnswer] = useState(false);
  const guideCanvasRef = useRef(null);
  const inkCanvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);

  const card = cards[pos];
  const dpr = window.devicePixelRatio || 1;

  useEffect(() => {
    drawGlyph(guideCanvasRef.current, dpr, card.kana, "rgba(139, 59, 255, 0.2)");

    if (!maskCanvasRef.current) {
      maskCanvasRef.current = document.createElement("canvas");
    }
    drawGlyph(maskCanvasRef.current, dpr, card.kana, "#000000");

    setShowAnswer(false);
    clearInk();
  }, [pos]);

  const clearInk = () => {
    const ink = inkCanvasRef.current;
    ink.width = SIZE * dpr;
    ink.height = SIZE * dpr;
    const ctx = ink.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, SIZE, SIZE);
    setScore(null);
  };

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setShowAnswer(false);
  };

  const getPoint = (e) => {
    const rect = inkCanvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const dot = (ctx, p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#3a1b66";
    ctx.fill();
  };

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const p = getPoint(e);
    lastPointRef.current = p;
    const ctx = inkCanvasRef.current.getContext("2d");
    dot(ctx, p);
  };

  const handlePointerMove = (e) => {
    if (!drawingRef.current) return;
    const ctx = inkCanvasRef.current.getContext("2d");
    const p = getPoint(e);
    ctx.strokeStyle = "#3a1b66";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastPointRef.current = p;
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
  };

  const checkScore = () => {
    const ink = inkCanvasRef.current;
    const mask = maskCanvasRef.current;
    const inkData = ink.getContext("2d").getImageData(0, 0, ink.width, ink.height).data;
    const maskData = mask.getContext("2d").getImageData(0, 0, mask.width, mask.height).data;

    let glyphCount = 0;
    let inkCount = 0;
    let intersect = 0;
    for (let i = 3; i < maskData.length; i += 4) {
      const isGlyph = maskData[i] > 40;
      const isInk = inkData[i] > 40;
      if (isGlyph) glyphCount++;
      if (isInk) inkCount++;
      if (isGlyph && isInk) intersect++;
    }
    if (inkCount === 0 || glyphCount === 0) {
      setScore(0);
      return;
    }
    const coverage = intersect / glyphCount;
    const precision = intersect / inkCount;
    setScore(Math.round(((coverage + precision) / 2) * 100));
  };

  const goPrev = () => setPos((p) => (p - 1 + cards.length) % cards.length);
  const goNext = () => setPos((p) => (p + 1) % cards.length);

  const scoreClass = score === null ? "" : score >= 70 ? "is-good" : score >= 40 ? "is-ok" : "is-low";
  const guideVisible = mode === "guide" || showAnswer;

  return (
    <div className="write-view">
      <div className="study-header">
        <button className="btn-link" onClick={onBack}>← กลับ</button>
        <div className="study-progress">{pos + 1} / {cards.length}</div>
        <span className="menu-header-spacer" />
      </div>

      <div className="write-mode-toggle">
        <button
          className={`write-mode-btn ${mode === "guide" ? "is-active" : ""}`}
          onClick={() => changeMode("guide")}
        >
          มีเส้นให้ลอก
        </button>
        <button
          className={`write-mode-btn ${mode === "blind" ? "is-active" : ""}`}
          onClick={() => changeMode("blind")}
        >
          ไม่มีเส้น (ท่องจำ)
        </button>
      </div>

      <div className="write-canvas-wrap">
        <canvas
          ref={guideCanvasRef}
          className={`write-canvas write-canvas-guide ${guideVisible ? "" : "is-hidden"}`}
        />
        <canvas
          ref={inkCanvasRef}
          className="write-canvas write-canvas-ink"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>

      <p className="hint-text">
        {mode === "guide"
          ? "ลากนิ้วหรือเมาส์ทับตัวจาง ๆ ให้ใกล้เคียงที่สุด"
          : "เขียนจากความจำ แล้วกด \"ดูเฉลย\" เพื่อเทียบ"}
      </p>

      <p className={`write-score ${scoreClass}`}>
        {score === null ? " " : `ใกล้เคียง ${score}%`}
      </p>

      <div className="study-actions">
        <button className="btn btn-skip" onClick={clearInk}>ล้าง</button>
        {mode === "blind" && (
          <button className="btn btn-skip" onClick={() => setShowAnswer((s) => !s)}>
            {showAnswer ? "ซ่อนเฉลย" : "ดูเฉลย"}
          </button>
        )}
        <button className="btn btn-yes" onClick={checkScore}>ตรวจ</button>
      </div>

      <div className="write-nav">
        <button className="btn-link" onClick={goPrev}>← ก่อนหน้า</button>
        <button className="btn-link" onClick={goNext}>ถัดไป →</button>
      </div>
    </div>
  );
}
