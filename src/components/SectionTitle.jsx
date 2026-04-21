import { motion } from 'motion/react';
import { asset } from '../utils/asset.js';

/**
 * SectionTitle — 带 heart-clipped 效果的区块标题
 * @param {string} enText   — 英文大标题（heart-clipped 渐变效果）
 * @param {string} zhText   — 日/中文副标题（粉色装饰感小字）
 * @param {boolean} center  — 是否居中对齐（默认左对齐）
 * @param {string} className — 额外的外层样式
 */
export default function SectionTitle({ enText, zhText, center = false, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.1, 1] }}
      className={`flex flex-col gap-2 ${center ? 'items-center text-center' : ''} ${className}`}
    >
      {/* 日/中文副标题 */}
      <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        <div className="h-px w-5 bg-sakura-400/50" />
        <span className="font-jp text-[11px] tracking-[0.42em] text-sakura-400 select-none">
          {zhText}
        </span>
        <div className="h-px w-5 bg-sakura-400/50" />
      </div>

      {/* 英文大标题 */}
      <div className="relative">
        <img
          src={asset('/images/common/img-deco-heading.png')}
          alt=""
          aria-hidden="true"
          className="absolute -top-5 -left-8 w-9 h-9 object-contain select-none pointer-events-none"
        />
        <h2 className="heart-clipped-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          {enText}
        </h2>
      </div>
    </motion.div>
  );
}
