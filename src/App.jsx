import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Menu } from 'lucide-react';

import { SECTIONS } from './data/index.js';
import LoadingScreen from './components/LoadingScreen.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import SideMenu from './components/SideMenu.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import InfiniteScroll from './components/InfiniteScroll.jsx';
import HomeSection from './components/HomeSection.jsx';
import StorySection from './components/StorySection.jsx';
import MovieSection from './components/MovieSection.jsx';
import CharacterSection from './components/CharacterSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import SpecialSection from './components/SpecialSection.jsx';
import DownloadSection from './components/DownloadSection.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pastHome, setPastHome] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  useEffect(() => {
    const homeEl = document.getElementById('home');

    // pastHome：home section 离开视口 60% 时触发
    const homeObserver = new IntersectionObserver(
      ([entry]) => setPastHome(entry.intersectionRatio < 0.4),
      { threshold: [0.4] }
    );
    if (homeEl) homeObserver.observe(homeEl);

    // activeSection：各 section 进入视口时更新
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      homeObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <div className="relative selection:bg-sakura-500/20 selection:text-ink-900">
      <AnimatePresence>
        {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />

      {/* 悬浮菜单按钮 */}
      <AnimatePresence>
        {pastHome && !drawerOpen && (
          <motion.button
            key="menu-btn"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            onClick={() => setDrawerOpen(true)}
            className="fixed top-5 right-5 z-[1050] hover:scale-110 transition-transform drop-shadow-lg"
          >
            <div className="relative w-16 h-16">
              <img src="/images/common/side-ball.svg" alt="" className="w-16 h-16" />
              <Menu size={26} className="absolute inset-0 m-auto text-white pointer-events-none" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <SideMenu
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeSection={activeSection}
      />

      <MusicPlayer />

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/images/common/bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover bg-drift opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/60" />
      </div>

      {/* 左侧无限滚动（从上往下） */}
      <div className="fixed left-0 top-0 w-20 h-full overflow-hidden pointer-events-none z-0">
        <InfiniteScroll src="/images/common/bg_infinite-txt-left.png" direction="down" speed={30} />
      </div>

      {/* 右侧无限滚动（从下往上） */}
      <div className="fixed right-0 top-0 w-20 h-full overflow-hidden pointer-events-none z-0">
        <InfiniteScroll src="/images/common/bg_infinite-txt-right.png" direction="up" speed={30} />
      </div>

      <main className="relative z-10">
        <HomeSection isLoading={isLoading} heroOpacity={heroOpacity} heroScale={heroScale} />
        <StorySection />
        <MovieSection />
        <CharacterSection />
        <GallerySection />
        <SpecialSection />
        <DownloadSection />
        <Footer />
      </main>
    </div>
  );
}
