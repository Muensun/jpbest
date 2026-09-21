import { useEffect, useLayoutEffect, useRef } from "react";

// จำตำแหน่ง scroll ของแต่ละหน้าไว้ พอกดกลับมาหน้าเดิมจะได้อยู่ตรงจุดที่ค้างไว้
// ไม่เด้งขึ้นบนสุด ส่วนหน้าที่เพิ่งเข้าครั้งแรกจะเริ่มที่บนสุดตามปกติ
export function useScrollRestore(routeKey) {
  const positionsRef = useRef({});
  const currentKeyRef = useRef(routeKey);

  // บันทึกตำแหน่งล่าสุดของหน้าที่กำลังดูอยู่ทุกครั้งที่เลื่อนจอ
  useEffect(() => {
    const handleScroll = () => {
      positionsRef.current[currentKeyRef.current] = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // พอเปลี่ยนหน้า ค่อยคืนตำแหน่งที่เคยจำไว้ (ทำก่อน paint จะได้ไม่เห็นจอกระพริบ)
  useLayoutEffect(() => {
    if (currentKeyRef.current === routeKey) return;
    currentKeyRef.current = routeKey;
    window.scrollTo(0, positionsRef.current[routeKey] ?? 0);
  }, [routeKey]);
}
