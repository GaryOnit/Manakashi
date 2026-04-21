import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function HomeSection({ isLoading, heroOpacity, heroScale }) {
  return (
    <section id="home" className="h-screen relative flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="flex flex-col items-center w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative flex items-center justify-center gap-6 md:gap-12 px-8 w-full max-w-5xl"
        >
          <div className="absolute -inset-10 bg-sakura-300/10 blur-[100px] rounded-full pointer-events-none" />

          {/* 左侧 Q 版小人 */}
          <motion.img
            src="/images/common/q1.png"
            animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
            whileHover={{ scale: 1.12, rotate: 10, y: -30 }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              scale: { type: 'spring', stiffness: 300, damping: 15 },
            }}
            className="w-36 md:w-56 h-auto object-contain flex-shrink-0 relative z-10 cursor-pointer"
          />

          {/* 中间标题图 */}
          <img
            src="/images/common/title.png"
            alt="TITLE"
            className="h-[85vh] w-auto object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(230,80,151,0.2)]"
          />

          {/* 右侧 Q 版小人 */}
          <motion.img
            src="/images/common/q2.png"
            animate={{ y: [0, -20, 0], rotate: [5, -5, 5] }}
            whileHover={{ scale: 1.12, rotate: -10, y: -30 }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              scale: { type: 'spring', stiffness: 300, damping: 15 },
            }}
            className="w-36 md:w-56 h-auto object-contain flex-shrink-0 relative z-10 cursor-pointer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={!isLoading ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sakura-500"
          >
            <ChevronDown size={32} strokeWidth={1} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
