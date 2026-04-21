import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart } from 'lucide-react';
import { SECTIONS } from '../data/index.js';

export default function SideMenu({ isOpen, onClose, activeSection }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1100] bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 面板 */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 h-full z-[1200]
                       w-[80vw] sm:w-[50vw] md:w-[35vw]
                       bg-white rounded-l-[80px]
                       shadow-2xl shadow-sakura-300/30
                       flex flex-col overflow-hidden"
          >
            {/* 爱心纹理背景层 */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "url('/images/common/bg_pattern-head-ht.png')",
                backgroundRepeat: 'repeat',
                backgroundSize: '120px',
              }}
            />

            {/* 内容 */}
            <div className="relative z-10 flex flex-col h-full px-12 pt-10 pb-16">

              {/* 关闭按钮 — 面板内左上角，远离右上角悬浮爱心 */}
              <div className="flex justify-start mb-10">
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center
                             rounded-full bg-sakura-100/60 hover:bg-sakura-200
                             text-sakura-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* 标题 */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={12} className="fill-sakura-400 text-sakura-400" />
                  <span className="font-jp text-[10px] tracking-[0.4em] text-sakura-400">NAVIGATION</span>
                </div>
                <p className="font-serif text-xl font-bold text-ink-900 leading-snug">
                  真愛の百合は<br />赤く染まる
                </p>
              </div>

              {/* 导航链接 */}
              <nav className="flex flex-col gap-1 flex-1">
                {SECTIONS.map((section, i) => (
                  <motion.a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={onClose}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
                    className={`group flex items-center gap-4 py-4 border-b border-sakura-100/60
                                font-serif tracking-widest text-sm transition-colors
                                ${activeSection === section.id
                                  ? 'text-sakura-500'
                                  : 'text-ink-900/50 hover:text-sakura-500'}`}
                  >
                    <span className="text-[10px] text-sakura-300 font-sans w-5 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.label}
                    {activeSection === section.id && (
                      <Heart size={8} className="ml-auto fill-sakura-400 text-sakura-400" />
                    )}
                  </motion.a>
                ))}
              </nav>

              {/* 底部装饰 */}
              <div className="mt-8 flex items-center gap-2">
                <div className="h-px flex-1 bg-sakura-200/50" />
                <Heart size={10} className="fill-sakura-300 text-sakura-300" />
                <div className="h-px flex-1 bg-sakura-200/50" />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
