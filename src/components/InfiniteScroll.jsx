import React, { useRef, useEffect, useState } from 'react';

// direction: 'down' | 'up'
export default function InfiniteScroll({ src, direction = 'down', speed = 30 }) {
  const innerRef = useRef(null);
  const posRef = useRef(null); // null 表示还未初始化
  const rafRef = useRef(null);
  const imgHeightRef = useRef(0);
  const [ready, setReady] = useState(false);

  const handleLoad = () => {
    if (!innerRef.current) return;
    const firstImg = innerRef.current.querySelector('img');
    if (!firstImg) return;
    imgHeightRef.current = firstImg.getBoundingClientRect().height;
    // down: 从 -h 开始往 0 走，到 0 重置回 -h（始终在 [-h, 0] 区间）
    // up:   从 0 开始往 -h 走，到 -h 重置回 0（始终在 [-h, 0] 区间）
    posRef.current = direction === 'down' ? -imgHeightRef.current : 0;
    setReady(true);
  };

  useEffect(() => {
    if (!ready) return;
    const el = innerRef.current;
    let last = performance.now();

    const tick = (now) => {
      const delta = (now - last) / 1000;
      last = now;
      const h = imgHeightRef.current;

      if (direction === 'down') {
        posRef.current += speed * delta;
        if (posRef.current >= 0) posRef.current -= h;
      } else {
        posRef.current -= speed * delta;
        if (posRef.current <= -h) posRef.current += h;
      }

      el.style.transform = `translateY(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, direction, speed]);

  return (
    <div ref={innerRef} className="flex flex-col will-change-transform">
      {Array.from({ length: 10 }).map((_, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="w-20 block"
          draggable={false}
          onLoad={i === 0 ? handleLoad : undefined}
        />
      ))}
    </div>
  );
}
