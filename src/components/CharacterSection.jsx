import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS } from '../data/index.js';
import SectionTitle from './SectionTitle.jsx';
import { asset } from '../utils/asset.js';

export default function CharacterSection() {
  const [activeChar, setActiveChar] = useState(0);

  return (
    <section id="character" className="min-h-screen py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionTitle enText="CHARACTER" zhText="登場人物" center className="mb-20" />
        </motion.div>

        <div className="flex-1 flex flex-col md:flex-row items-center gap-12 md:gap-24">
          {/* Details */}
          <motion.div
            className="flex-1 order-2 md:order-1 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChar}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-zen text-3xl sm:text-5xl md:text-7xl font-black mb-1 text-ink-900">
                    {CHARACTERS[activeChar].jpName}
                  </h3>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <span className="font-serif text-base sm:text-xl tracking-widest text-sakura-400">{CHARACTERS[activeChar].name}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="inline-flex items-center justify-center relative w-9 h-9 shrink-0">
                      <img src={asset('/images/common/side-ball.svg')} alt="" className="absolute inset-0 w-full h-full" />
                      <span className="relative z-10 font-serif text-[10px] tracking-widest text-white leading-none">CV</span>
                    </span>
                    <span className="font-serif text-sm tracking-widest text-ink-700">{CHARACTERS[activeChar].cv}</span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-ink-900/80 font-zen font-medium leading-loose tracking-wide max-w-lg whitespace-pre-line">
                  {CHARACTERS[activeChar].description}
                </p>

                <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
                  {CHARACTERS.map((char, idx) => (
                    <button
                      key={char.id}
                      onClick={() => setActiveChar(idx)}
                      className={`group relative transition-all ${activeChar === idx ? 'scale-110' : 'opacity-40 hover:opacity-100 hover:scale-105'}`}
                    >
                      <div
                        className="absolute -inset-1 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: char.color }}
                      />
                      <img
                        src={char.avatar}
                        alt={char.name}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 relative z-10 box-content"
                        style={{ borderColor: activeChar === idx ? char.color : 'transparent' }}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="flex-1 order-1 md:order-2 relative perspective-1000 h-[280px] sm:h-[400px] md:h-[600px] w-full max-w-md"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChar}
                initial={{ opacity: 0, x: 100, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -10 }}
                transition={{ type: 'spring', damping: 20 }}
                className="absolute inset-0"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative h-full w-full"
                >
                  <div className="absolute inset-0 bg-sakura-300/10 blur-[100px] rounded-full" />
                  <img
                    src={CHARACTERS[activeChar].image}
                    alt={CHARACTERS[activeChar].name}
                    className="h-full w-full object-contain rounded-3xl relative z-10"
                  />
                  <div
                    className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full opacity-30 blur-2xl"
                    style={{ backgroundColor: CHARACTERS[activeChar].color }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
