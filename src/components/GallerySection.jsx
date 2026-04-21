import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, Plus } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/index.js';
import SectionTitle from './SectionTitle.jsx';

export default function GallerySection() {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <>
      <section 
        id="gallery" 
        className="relative min-h-[130vh] py-48 px-6 md:px-12 bg-[#fffdfd] overflow-hidden"
      >
        {/* 背景装饰文案：增加层级感与呼吸感 */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex flex-col justify-between py-12 leading-none font-serif select-none">
          <motion.span 
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[20vw] -ml-10 tracking-tighter"
          >
            MEMORY
          </motion.span>
          <motion.span 
            initial={{ x: 100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[20vw] -mr-10 text-right tracking-tighter"
          >
            MOMENTS
          </motion.span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* 顶部标题栏 */}
          <motion.div
            className="flex flex-col md:flex-row items-end justify-between mb-28 gap-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle enText="GALLERY" zhText="追憶の一幕" />
            
            <div className="h-[px] flex-1 bg-gradient-to-r from-sakura-200 to-transparent mx-8 hidden md:block" />
            
            {/* View All 链接 */}
            <a 
              href="https://e-hentai.org/g/1525945/af39970130/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white border border-sakura-100 rounded-full hover:bg-sakura-500 hover:text-white transition-all duration-500 group shadow-sm hover:shadow-sakura-200/50"
            >
              <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="font-serif text-sm tracking-[0.2em]">VIEW ALL</span>
            </a>
          </motion.div>

          {/* 瀑布流错落布局网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20">
            {GALLERY_IMAGES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                // 奇数列向下偏移，创造非对称美感
                className={`relative group cursor-pointer ${idx % 2 !== 0 ? 'lg:mt-20' : ''}`}
                onClick={() => setLightboxImg(item)}
              >
                {/* 图片外壳 */}
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl shadow-xl shadow-sakura-900/5 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-sakura-200 group-hover:-translate-y-2">
                  <motion.img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* 悬停时的光影扫过效果 */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <motion.div 
                      className="w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-20 -translate-x-full"
                      animate={lightboxImg ? {} : { x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 1.8, repeatDelay: 3 }}
                    />
                  </div>

                  {/* 悬停信息层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sakura-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div>
                        <p className="text-white font-serif text-xl tracking-widest mb-1">{item.label}</p>
                        <p className="text-white/60 text-[10px] uppercase tracking-[0.2em]">Memories Collection</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform group-hover:rotate-90 transition-transform duration-500">
                        <Plus size={24} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 沉浸式灯箱（Lightbox） */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12"
          >
            {/* 半透明毛玻璃背景 */}
            <motion.div 
              className="absolute inset-0 bg-white/90 backdrop-blur-3xl"
              onClick={() => setLightboxImg(null)}
            />
            
            <div className="relative w-full max-w-6xl flex flex-col items-center">
              {/* 图片展示 */}
              <motion.img
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 30, opacity: 0 }}
                src={lightboxImg.src}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-white"
              />
              
              {/* 灯箱底部文字 */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-center"
              >
                <h3 className="font-serif text-3xl text-ink-900 tracking-[0.3em] uppercase">{lightboxImg.label}</h3>
                <div className="w-16 h-[1px] bg-sakura-300 mx-auto mt-4 mb-2" />
                <p className="text-ink-900/40 text-xs tracking-widest uppercase">Ethereal Gallery Experience</p>
              </motion.div>

              {/* 关闭按钮 */}
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 md:top-0 md:-right-20 text-ink-900/30 hover:text-sakura-500 transition-all p-2 hover:scale-110 bg-white/60 md:bg-transparent rounded-full backdrop-blur-sm md:backdrop-blur-none"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}