import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Music, Sparkles, Heart, X, ChevronRight, Share2 } from 'lucide-react';
import { SPECIAL_ITEMS } from '../data/index.js';
import SectionTitle from './SectionTitle.jsx';
import Img from './Img.jsx';
import { asset } from '../utils/asset.js';

const ICONS = { soundtrack: Music, artbook: Sparkles, story: Heart };

// 3D 视差卡片组件
const HoverCard = ({ item, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // 控制旋转幅度，增加空间感
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = ICONS[item.key] || Sparkles;

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      className="relative w-full aspect-[3/4] group cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden group-hover:bg-sakura-500/10 transition-colors duration-500"
      >
        {/* 背景图蒙层 */}
        <Img
          src={item.cover}
          webpSrc={item.coverWebP}
          className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000"
          alt={item.title}
        />
        
        {/* 樱花渐变遮罩：从深樱花色到几乎全黑 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />

        {/* 卡片内容 */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div style={{ transform: "translateZ(60px)" }} className="mb-4">
             <Icon className="text-sakura-300 mb-4 drop-shadow-[0_0_12px_rgba(245,100,134,0.6)]" size={32} strokeWidth={1.5} />
             <span className="text-sakura-200 font-serif text-[10px] tracking-[0.4em] block mb-1 uppercase opacity-70">Premium Edition</span>
             <h3 className="text-white text-2xl font-serif tracking-widest">{item.title}</h3>
          </div>
          <p className="text-white/40 text-xs leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2">
            {item.desc}
          </p>
        </div>

        {/* 装饰边框 */}
        <div className="absolute inset-4 border border-sakura-500/10 rounded-2xl pointer-events-none group-hover:border-sakura-500/40 transition-colors" />
      </div>
    </motion.div>
  );
};

export default function SpecialSection() {
  const [activeItem, setActiveItem] = useState(null);

  const openItem = (item) => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    setActiveItem(item);
  };

  const closeItem = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    setActiveItem(null);
  };

  return (
    <section id="special" className="py-32 relative overflow-hidden">
      {/* 背景图 */}
      <div className="absolute inset-0">
        <Img
          src={asset('/images/special/bg.jpg')}
          webpSrc={asset('/images/special/bg.webp')}
          mobileSrc={asset('/images/special/bg-mobile.webp')}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      {/* 动态背景水印：使用主题色 sakura-500 极低透明度 */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeItem ? activeItem.key : 'default'}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 0.04, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h1 className="text-[28vw] font-serif font-black italic select-none text-sakura-500">
            {activeItem ? activeItem.title.substring(0, 2).toUpperCase() : 'SP.'}
          </h1>
        </motion.div>
      </AnimatePresence>

      {/* 氛围流光效果 */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-sakura-500/20 to-transparent" />
         <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-sakura-400/20 to-transparent" />
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <SectionTitle enText="SPECIAL" zhText="限定特典" center />
             <div className="w-12 h-[2px] bg-sakura-500 mx-auto mt-8 shadow-[0_0_15px_#f56486]" />
           </motion.div>
        </div>

        {/* 特典卡片网格布局 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 perspective-1000">
          {SPECIAL_ITEMS.map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
            >
              <HoverCard item={item} onClick={openItem} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 全屏剧场式详情预览 */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center px-4 md:px-12 overflow-y-auto"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            {/* 磨砂背景遮罩 */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={closeItem}
            />
            
            <div className="relative w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-center px-2 md:px-0">
              {/* 左侧：大尺寸视觉图展示 */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="md:col-span-7 relative aspect-[16/10] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(245,100,134,0.25)] border border-white/10"
              >
                <Img
                  src={activeItem.content}
                  webpSrc={activeItem.contentWebP}
                  mobileSrc={activeItem.contentMobileWebP}
                  className="w-full h-full object-cover"
                  alt={activeItem.title}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                
                <div className="absolute top-8 left-8">
                   <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-[10px] font-serif tracking-[0.2em] text-sakura-200">
                     EXCLUSIVE COLLECTION
                   </div>
                </div>
              </motion.div>

              {/* 右侧：排版详情 */}
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                className="md:col-span-5 flex flex-col space-y-8"
              >
                <div>
                  <motion.span className="text-sakura-400 font-serif text-2xl italic mb-3 block drop-shadow-sm">
                    Luxury Gifts
                  </motion.span>
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight text-white leading-tight">
                    {activeItem.title}
                  </h3>
                </div>

                <div className="w-16 h-1 bg-sakura-500 shadow-[0_0_8px_#f56486]" />

                <p className="text-white/60 text-lg font-sans leading-relaxed max-w-md">
                  {activeItem.desc}
                </p>

                <div className="pt-6 flex flex-wrap gap-4">
                  <button className="flex-1 bg-sakura-500 text-white py-5 px-8 rounded-2xl font-serif tracking-widest text-lg hover:bg-sakura-400 transition-all flex items-center justify-center gap-3 group shadow-lg shadow-sakura-500/30">
                    立即预约获取 <ChevronRight className="group-hover:translate-x-2 transition-transform" size={20} />
                  </button>
                  <button className="w-16 h-16 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-sakura-400 hover:border-sakura-400 transition-all">
                    <Share2 size={22} />
                  </button>
                </div>

                {/* 元数据展示 */}
                <div className="pt-10 border-t border-white/5 grid grid-cols-2 gap-8 text-[10px] font-serif tracking-[0.2em] text-white/30 uppercase">
                   <div>
                     <p className="mb-2">Quality</p>
                     <p className="text-sakura-200">Lossless / Hi-Res</p>
                   </div>
                   <div>
                     <p className="mb-2">Availability</p>
                     <p className="text-sakura-200">Pre-order Bonus</p>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* 顶层关闭按钮 — 放左上角避开右上悬浮球 */}
            <button
              onClick={closeItem}
              className="absolute top-8 left-8 text-white/20 hover:text-sakura-400 transition-all p-4 z-10"
            >
              <X size={44} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}