import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Smartphone, Play, Download, Cpu, HardDrive, MemoryStick, ChevronRight } from 'lucide-react';
import { SYSTEM_REQUIREMENTS } from '../data/index.js';
import SectionTitle from './SectionTitle.jsx';
import { asset } from '../utils/asset.js';

const DOWNLOAD_URL = 'https://pan.baidu.com/s/1D0HeZGkUWkyGHKqUn0BRiw?pwd=jbbs';

const REQ_ICONS = {
  OS: Monitor,
  Processor: Cpu,
  Memory: MemoryStick,
  Graphics: Monitor,
  DirectX: HardDrive,
  Storage: HardDrive,
};

export default function DownloadSection() {
  return (
    <section id="download" className="py-32 relative border-t border-sakura-100 bg-sakura-50/40 backdrop-blur-sm">

      {/* 左侧冰箱贴：img_intro-pick.png — 移动端隐藏 */}
      <motion.img
        src={asset('/images/download/img_intro-pick.png')}
        alt=""
        className="absolute left-6 top-[15%] w-64 md:w-96 pointer-events-none select-none drop-shadow-lg hidden md:block"
        style={{ rotate: '-5deg' }}
        initial={{ opacity: 0, y: 20, rotate: '-8deg' }}
        whileInView={{ opacity: 1, y: 0, rotate: '-5deg' }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* 右侧冰箱贴：txt_novel-comic-promo.png — 移动端隐藏 */}
      <motion.img
        src={asset('/images/download/txt_novel-comic-promo.png')}
        alt=""
        className="absolute right-6 bottom-[20%] w-56 md:w-82 pointer-events-none select-none drop-shadow-lg hidden md:block"
        style={{ rotate: '4deg' }}
        initial={{ opacity: 0, y: 20, rotate: '7deg' }}
        whileInView={{ opacity: 1, y: 0, rotate: '4deg' }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />

      {/* 氛围装饰：背景光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sakura-300/10 blur-[120px]" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-sakura-200/20 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-sakura-100/30 blur-[60px]" />
      </div>

      {/* 装饰线条 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-sakura-200/30 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-sakura-200/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* 标题 */}
        <div className="text-center mb-20">
          <SectionTitle enText="DOWNLOAD" zhText="春へ帰る" center className="mb-6" />
          <motion.p
            className="text-ink-700/50 font-jp text-sm tracking-widest mt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ― 画像をクリックすると、配布先へ移動します ―
          </motion.p>
        </div>

        {/* 主下载按钮 */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center gap-4 md:gap-5 px-8 md:px-14 py-5 md:py-6 rounded-2xl overflow-hidden cursor-pointer select-none"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            {/* 渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-r from-sakura-400 via-sakura-500 to-sakura-600" />

            {/* 光晕阴影 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-sakura-300/40 via-white/10 to-sakura-300/40 blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Shimmer 光扫效果 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            {/* 外发光 */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sakura-400 to-sakura-500 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500 -z-10" />

            {/* 内容 */}
            <div className="relative flex items-center gap-5">
              <motion.div
                className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-sm shadow-inner"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Download size={22} className="text-white" />
              </motion.div>
              <div className="text-left">
                <div className="text-white/70 text-[10px] font-jp tracking-[0.3em] mb-0.5">FREE DOWNLOAD</div>
                <div className="text-white font-serif text-xl tracking-[0.15em] font-bold">WINDOWS VERSION</div>
              </div>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ChevronRight size={22} className="text-white/70" />
              </motion.div>
            </div>
          </motion.a>
        </motion.div>

        {/* 副按钮（App Store / Google Play） */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {[
            { icon: Smartphone, label: 'APP STORE', sub: 'iOS 14+' },
            { icon: Play, label: 'GOOGLE PLAY', sub: 'Android 9+' },
          ].map(({ icon: Icon, label, sub }) => (
            <motion.button
              key={label}
              className="relative group flex items-center gap-3 glass px-7 py-3.5 rounded-full border border-sakura-200/60 hover:border-sakura-400/60 transition-colors duration-300"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              <Icon size={17} className="text-sakura-500" />
              <div className="text-left">
                <div className="text-ink-900 font-serif text-xs tracking-widest leading-tight">{label}</div>
                <div className="text-ink-700/40 text-[9px] font-sans tracking-wider">{sub}</div>
              </div>
              {/* 悬停光晕 */}
              <div className="absolute inset-0 rounded-full bg-sakura-100/0 group-hover:bg-sakura-100/40 transition-colors duration-300" />
            </motion.button>
          ))}
        </motion.div>

        {/* 分隔装饰 */}
        <motion.div
          className="flex items-center gap-4 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-sakura-200/60" />
          <span className="font-jp text-[10px] text-sakura-400/70 tracking-[0.4em]">動作環境</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-sakura-200/60" />
        </motion.div>

        {/* 系统需求卡片 */}
        <motion.div
          className="max-w-2xl mx-auto glass rounded-3xl overflow-hidden border border-sakura-100/60 shadow-xl shadow-sakura-100/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* 卡片头部 */}
          <div className="flex items-center gap-3 px-8 py-5 border-b border-sakura-100/50 bg-sakura-50/30">
            <div className="w-8 h-8 rounded-lg bg-sakura-500/10 flex items-center justify-center">
              <Monitor size={15} className="text-sakura-500" />
            </div>
            <h3 className="font-serif text-sm tracking-[0.25em] text-ink-900">SYSTEM REQUIREMENTS</h3>
            <div className="ml-auto flex gap-1.5">
              {['bg-sakura-200', 'bg-sakura-300', 'bg-sakura-500'].map((c, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${c} opacity-60`} />
              ))}
            </div>
          </div>

          {/* 需求列表 */}
          <div className="px-8 py-6 divide-y divide-sakura-100/40">
            {SYSTEM_REQUIREMENTS.map((req, idx) => {
              const Icon = REQ_ICONS[req.label] || Monitor;
              return (
                <motion.div
                  key={req.label}
                  className="flex items-center gap-4 py-4 group/row"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * idx, duration: 0.5 }}
                >
                  {/* 左：图标 + 标签 */}
                  <div className="flex items-center gap-3 w-32 shrink-0">
                    <div className="w-7 h-7 rounded-lg bg-sakura-100/60 group-hover/row:bg-sakura-200/60 transition-colors flex items-center justify-center">
                      <Icon size={13} className="text-sakura-400" />
                    </div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink-700/40 group-hover/row:text-sakura-400 transition-colors">
                      {req.label}
                    </span>
                  </div>
                  {/* 分隔点 */}
                  <div className="w-1 h-1 rounded-full bg-sakura-200/60 shrink-0" />
                  {/* 右：值 */}
                  <span className="text-xs font-sans text-ink-800/80 group-hover/row:text-ink-900 transition-colors leading-relaxed">
                    {req.value}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* 卡片底部 */}
          <div className="px-8 py-4 bg-sakura-50/20 border-t border-sakura-100/40 flex items-center justify-between">
            <span className="text-[9px] font-jp text-ink-700/30 tracking-widest">推奨環境以上を推奨します</span>
            <span className="text-[9px] font-sans text-sakura-400/60 tracking-wider">Ver. 1.0.0</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
