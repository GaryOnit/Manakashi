import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { asset } from '../utils/asset.js';

// 预加载 WebP 版本（现代浏览器）；旧浏览器遇到 404 会触发 onerror→resolve，不阻塞加载
const PRELOAD_IMAGES = [
  '/images/common/q1.webp',
  '/images/common/q2.webp',
  '/images/common/title.webp',
  '/images/common/bg.jpg',
];

export default function LoadingScreen({ onFinish }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let loaded = 0;
    const total = PRELOAD_IMAGES.length;

    const promises = PRELOAD_IMAGES.map(src =>
      new Promise(resolve => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded += 1;
          setPercent(Math.round((loaded / total) * 100));
          resolve();
        };
        img.src = asset(src);
      })
    );

    Promise.all(promises).then(() => {
      setTimeout(onFinish, 800);
    });
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-sakura-50 flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'circOut' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="relative mb-8">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-4 bg-sakura-300/40 blur-xl rounded-full"
          />
          <h1 className="text-4xl font-serif tracking-widest text-ink-900 relative">
            真愛の百合は赤く染まる
          </h1>
        </div>
        <div className="w-64 h-[1px] bg-ink-900/10 relative overflow-hidden mx-auto">
          <motion.div
            className="absolute inset-y-0 left-0 bg-sakura-500"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-4 font-serif text-sm opacity-50 tabular-nums text-ink-900">
          {percent}%
        </div>
      </motion.div>
    </motion.div>
  );
}
