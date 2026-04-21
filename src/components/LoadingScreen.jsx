import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function LoadingScreen({ onFinish }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);
    return () => clearInterval(interval);
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
