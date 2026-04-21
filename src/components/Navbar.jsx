import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SECTIONS } from '../data/index.js';

export default function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-[1000] h-16 flex items-center justify-between px-6 md:px-12 glass shadow-lg">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-sakura-500 flex items-center justify-center text-white font-serif font-bold text-xs ring-4 ring-sakura-500/20">
          YR
        </div>
        <span className="font-serif font-bold tracking-tighter text-lg md:text-xl text-ink-900">
          真愛の百合は赤く染まる
        </span>
      </motion.div>

      <div className="hidden md:flex items-center gap-8">
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`font-serif text-sm tracking-widest transition-all relative py-2 ${
              activeSection === section.id
                ? 'text-sakura-500'
                : 'text-ink-900/60 hover:text-sakura-500'
            }`}
          >
            {section.label}
            {activeSection === section.id && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-sakura-500"
              />
            )}
          </a>
        ))}
      </div>

      <button className="md:hidden text-ink-900" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 glass h-screen flex flex-col items-center justify-center gap-8 text-2xl font-serif z-50 md:hidden"
          >
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setIsOpen(false)}
                className={activeSection === section.id ? 'text-sakura-500' : 'text-ink-900'}
              >
                {section.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
