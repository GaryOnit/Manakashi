import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let x = -100, y = -100;
    let raf;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const over = (e) => {
      const t = e.target;
      const hovering = t.tagName === 'A' || t.tagName === 'BUTTON' || !!t.closest('button') || !!t.closest('a');
      if (hovering) {
        cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1.5)`;
        cursor.style.borderWidth = '2px';
        cursor.style.borderColor = 'rgba(245,100,134,0.8)';
        dot.style.transform = 'scale(0)';
      } else {
        cursor.style.borderWidth = '1px';
        cursor.style.borderColor = 'rgba(245,100,134,0.4)';
        dot.style.transform = 'scale(1)';
      }
    };

    const render = () => {
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden md:flex"
      style={{ willChange: 'transform' }}
    >
      <div ref={dotRef} className="custom-cursor-dot" style={{ transition: 'transform 0.1s' }} />
    </div>
  );
}
