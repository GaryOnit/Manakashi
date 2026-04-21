import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import SectionTitle from './SectionTitle.jsx';

export default function StorySection() {
  return (
    <section id="story" className="min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 order-2 md:order-1"
        >
          <div className="flex gap-4 md:gap-8">
            <div className="writing-vertical font-jp text-2xl md:text-5xl text-sakura-300/20 font-bold opacity-30 select-none hidden sm:block">
              歪んだ愛、交差する心。
            </div>
            <div>
              <SectionTitle enText="STORY" zhText="歪んでいく、ふたりの関係" className="mb-8" />
              <div className="space-y-5 leading-relaxed font-jp text-base">
                <p className="text-ink-900/90 font-medium">
                  新しい町に引っ越してきた真奈美。
                  彼女はレズビアンであり、同じクラスの愛実に想いを寄せてしまう。
                </p>
                <p className="text-ink-900/90 font-medium">
                  最初はそれを隠していたが、すぐに見抜かれてしまい、
                  衝撃的な言葉を聞かされる。
                </p>
                <p className="text-sakura-500 font-bold border-l-2 border-sakura-400 pl-4 text-sm leading-loose">
                  「私もね……女の子が好きなの」
                </p>
                <p className="text-ink-900/90 font-medium">
                  互いの想いを通じ合わせることができるようになった２人。
                  しかしその関係は、徐々にいびつなものへと変化していく。
                </p>
                <p className="text-ink-900/50 text-sm font-medium">
                  やがて、真奈美と愛実以外の人間達も巻き込んで、<br />
                  物語は大きく歪んでいく……。
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="md:col-span-7 order-1 md:order-2"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-sakura-100 rounded-2xl rotate-3 group-hover:rotate-1 transition-transform shadow-sm" />
            <img
              src="/images/story/prologue.jpg"
              alt="Story CG"
              className="rounded-2xl shadow-xl relative z-10 transition-all duration-700 w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
