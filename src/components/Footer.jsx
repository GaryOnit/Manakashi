import React from 'react';
import { motion } from 'motion/react';
import { Twitter, Github, Music } from 'lucide-react';
import { asset } from '../utils/asset.js';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#e65097] text-white w-full">

      {/* 1. 修复后的密波浪：使用 CSS 渐变实现无限平铺的半圆 */}
      <div
        className="absolute top-0 left-0 w-full h-[20px] -translate-y-full"
        style={{
          // 逻辑：在透明背景上画粉色的圆，圆心在下方
          backgroundImage: `radial-gradient(circle at 10px 20px, #e65097 12px, transparent 13px)`,
          backgroundSize: '20px 20px',
          backgroundRepeat: 'repeat-x'
        }}
      />

      {/* 2. 主体内容 */}
      <div className="relative px-8 pt-12 pb-14 flex flex-col items-center gap-6">

        {/* 社交图标区 */}
        <div className="flex gap-8 text-white">
          <Twitter className="cursor-pointer hover:scale-110 transition-transform" size={26} />
          <Github className="cursor-pointer hover:scale-110 transition-transform" size={26} />
          <Music className="cursor-pointer hover:scale-110 transition-transform" size={26} />
        </div>

        {/* 版权信息 */}
        <p className="text-[10px] tracking-[0.4em] text-white/70 font-sans text-center leading-relaxed">
          © 2026 CELESTIAL SOUNDS & MANAKASHI PROJECT. ALL RIGHTS RESERVED.
        </p>

        {/* 3. PAGE TOP 按钮：修复贴边与位置 */}
        <div className="absolute top-0 right-0 h-full flex items-center">
          <motion.button
            onClick={scrollToTop}
            whileHover={{
              x: -5, // 往左微动，更有交互感
              scale: 1.1,
              rotate: 5
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            // 移除原本的 absolute 定位，利用父容器 flex 垂直居中，完全贴右
            className="translate-x-[5%] md:translate-x-[15%] cursor-pointer"
            aria-label="ページトップへ"
          >
            <img
              src={asset('/images/common/btn_pagetop.png')}
              alt="PAGE TOP"
              className="w-20 md:w-28 h-auto drop-shadow-xl"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}