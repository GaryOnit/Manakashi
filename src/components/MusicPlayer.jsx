import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Music, Pause, Play, SkipForward } from 'lucide-react';

const PLAYLIST = [
  '/audio/speciosum.mp3',
  '/audio/Ragwort.mp3',
];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);

  // 自动播放 — 浏览器需要用户交互才允许，监听首次点击/触摸
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = PLAYLIST[0];
    audio.volume = 0.5;

    const tryPlay = () => {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {});
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
    };

    // 先尝试直接播放（部分浏览器允许）
    audio.play().then(() => {
      setPlaying(true);
    }).catch(() => {
      // 被拦截则等待首次用户交互
      document.addEventListener('click', tryPlay);
      document.addEventListener('touchstart', tryPlay);
    });

    return () => {
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
    };
  }, []);

  // 切歌后自动播放
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnd = () => {
      const next = (current + 1) % PLAYLIST.length;
      setCurrent(next);
      audio.src = PLAYLIST[next];
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };
    audio.addEventListener('ended', onEnd);
    return () => audio.removeEventListener('ended', onEnd);
  }, [current]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const skipNext = () => {
    const audio = audioRef.current;
    const next = (current + 1) % PLAYLIST.length;
    setCurrent(next);
    audio.src = PLAYLIST[next];
    audio.play().then(() => setPlaying(true)).catch(() => {});
  };

  return (
    <>
      <audio ref={audioRef} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-6 left-6 z-[900]"
      >
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm
                        rounded-full px-3 py-2 shadow-sm">
          <Music
            size={13}
            className={`text-sakura-400 ${playing ? 'animate-pulse' : ''}`}
          />
          <button
            onClick={toggle}
            className="w-7 h-7 flex items-center justify-center
                       rounded-full hover:bg-sakura-100 transition-colors text-sakura-500"
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            onClick={skipNext}
            className="w-7 h-7 flex items-center justify-center
                       rounded-full hover:bg-sakura-100 transition-colors text-sakura-400"
          >
            <SkipForward size={13} />
          </button>
        </div>
      </motion.div>
    </>
  );
}
