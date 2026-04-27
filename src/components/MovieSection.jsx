import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { asset } from '../utils/asset.js';

export default function MovieSection() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = muted;
    }
  }, [volume, muted]);

  const handleTogglePlay = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  return (
    <motion.section
      id="movie"
      className="w-full py-12 flex justify-center"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative w-[95%] md:w-[80%] h-[40vh] md:h-[55vh] overflow-hidden cursor-pointer group"
        style={{ borderRadius: '24px' }}
        onClick={handleTogglePlay}
        whileHover={!playing ? 'hovered' : undefined}
        initial="idle"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onTouchStart={() => setShowControls(true)}
        onTouchEnd={() => setTimeout(() => setShowControls(false), 2500)}
      >
        {/* 视频主体 */}
        <video
          ref={videoRef}
          src={asset('/video/movie.mp4')}
          poster={asset('/images/movie/movie-cover.webp')}
          className="w-full h-full object-cover"
          playsInline
          preload="none"
          onEnded={() => setPlaying(false)}
        />

        {/* 左上角装饰图 - 修改：使用负边距向左上偏移 */}
        <img
          src={asset('/images/movie/bg-deco-movie.png')}
          className="absolute -top-2 -left-6 w-26 md:w-40 pointer-events-none z-50 drop-shadow-xl"
          alt=""
        />

        {/* 蒙版层 (播放后消失) */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              key="overlay"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* 1. 基础半透明层 + 点阵蒙版层 */}
              <motion.div
                className="absolute inset-0 video-dotted-mask"
                variants={{
                  idle: { opacity: 0.8, backgroundColor: 'rgba(0,0,0,0.4)' },
                  hovered: { opacity: 0.6, backgroundColor: 'rgba(245,100,134,0.35)' },
                }}
              />

              {/* 2. bg.jpg 图案叠加层（mix-blend-screen 融合） */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${asset('/images/common/bg.jpg')})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mixBlendMode: 'screen',
                }}
                variants={{
                  idle: { opacity: 0.15 },
                  hovered: { opacity: 0.25 },
                }}
              />

              {/* 内容容器 */}
              <div className="relative flex items-center justify-center w-full px-[10%]">

                {/* 左侧文字 "PLAY" */}
                <motion.img
                  src={asset('/images/movie/txt_movie-play.png')}
                  className="h-16 md:h-24 w-auto object-contain z-10"
                  variants={{
                    idle: { x: 0 },
                    hovered: { x: 20 },
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />

                {/* 2. 中间图标：圆圈 + Base64 箭头 */}
                <div className="relative flex items-center justify-center mx-4 md:mx-8 z-20">
                  {/* 外圈虚线圆（装饰） */}
                  <motion.div
                    className="absolute w-16 h-16 md:w-20 md:h-20 border border-white/30 rounded-full border-dashed"
                    variants={{
                      idle: { rotate: 0, scale: 1 },
                      hovered: { rotate: 180, scale: 1.1 }
                    }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* 中心图标容器 */}
                  <motion.div
                    className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 shadow-lg"
                    variants={{
                      idle: { scale: 1 },
                      hovered: { scale: 1.2, backgroundColor: 'rgba(255,255,255,0.4)' },
                    }}
                  >
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAzNCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHBhdGggZD0iTTEuMzMxMzMgMjYuMjI3MUMwLjYwNTcwMyAyNi45MjA3IDAuNjA1NzAzIDI4LjA3OTYgMS4zMzEzMyAyOC43NzMyTDExLjg1OTUgMzguODM2OUMxMi41NDAzIDM5LjQ4NzcgMTMuNjEyNiAzOS40ODc3IDE0LjI5MzMgMzguODM2OUwzMi42Njc3IDIxLjI3MzJDMzMuMzkzMyAyMC41Nzk2IDMzLjM5MzMgMTkuNDIwNyAzMi42Njc3IDE4LjcyNzFMMTQuMjkzNCAxLjE2MzM1QzEzLjYxMjYgMC41MTI2MSAxMi41NDAzIDAuNTEyNjA3IDExLjg1OTYgMS4xNjMzNEwxLjMzMTM3IDExLjIyN0MwLjYwNTc0NSAxMS45MjA3IDAuNjA1NzQ0IDEzLjA3OTYgMS4zMzEzNyAxMy43NzMyTDYuOTU3ODQgMTkuMTUxNEM3LjQ0MTU5IDE5LjYxMzggNy40NDE1OSAyMC4zODY0IDYuOTU3ODQgMjAuODQ4OEwxLjMzMTMzIDI2LjIyNzFaIiBmaWxsPSJ3aGl0ZSIvPiA8L3N2Zz4="
                      className="w-4 h-auto translate-x-[1px]"
                      alt="play icon"
                    />
                  </motion.div>
                </div>

                {/* 右侧文字 "MOVIE" */}
                <motion.img
                  src={asset('/images/movie/txt_movie-movie.png')}
                  className="h-16 md:h-24 w-auto object-contain z-10"
                  variants={{
                    idle: { x: 0 },
                    hovered: { x: -20 },
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 底部控制栏（播放中 + hover 时显示） */}
        <AnimatePresence>
          {playing && showControls && (
            <motion.div
              key="controls"
              className="absolute bottom-0 left-0 right-0 z-40 px-4 md:px-8 py-3 md:py-5 flex items-center gap-3 md:gap-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-md"
              style={{ borderRadius: '0 0 24px 24px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 暂停/播放按钮 - 增加尺寸和阴影 */}
              <button
                className="text-white hover:text-[#f56486] transition-all transform hover:scale-110 drop-shadow-md"
                onClick={(e) => { e.stopPropagation(); handleTogglePlay(); }}
              >
                {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>

              {/* 音量控制组 - 增加视觉对比 */}
              <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <button
                  className="text-white hover:text-[#f56486] transition-colors"
                  onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
                >
                  {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  className="volume-slider w-24 h-1.5 rounded-full appearance-none cursor-pointer bg-white/20"
                  style={{ accentColor: '#f56486' }}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setVolume(val);
                    if (val > 0) setMuted(false);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* 装饰：可以在右侧加个提示文字，显得更专业 */}
              <div className="ml-auto text-white/40 text-xs font-mono tracking-widest uppercase hidden md:block">
                Now Playing • Trailer
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
