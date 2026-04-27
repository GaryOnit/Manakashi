# Galgame Official Site

## 项目概述

**真愛の百合は赤く染まる** 的官方宣传网站，单页应用，风格为日系视觉小说美学。
重构已完成，组件化结构稳定。

## 技术栈

- **框架**: React 19 + Vite 6
- **样式**: Tailwind CSS v4（通过 `@tailwindcss/vite` 插件，无需 `tailwind.config.js`）
- **动画**: `motion/react`（即 Framer Motion，包名为 `motion`）
- **图标**: `lucide-react`

## 启动方式

```bash
npm install
npm run dev   # http://localhost:3000
```

## 当前文件结构

```
galgame-official-site/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── images/
│   │   ├── common/                # 全局公用素材
│   │   │   ├── bg.jpg             # 全局视差背景
│   │   │   ├── bg_pattern-head-ht.png  # 爱心纹理（标题/面板背景）
│   │   │   ├── bg_infinite-txt-left.png   # 左侧滚动条图片（向下）
│   │   │   ├── bg_infinite-txt-right.png  # 右侧滚动条图片（向上）
│   │   │   ├── img-deco-heading.png   # SectionTitle 左上角装饰图
│   │   │   ├── side-ball.svg      # 悬浮菜单按钮背景
│   │   │   ├── btn_pagetop.png    # Footer PAGE TOP 按钮图片
│   │   │   ├── title.png
│   │   │   └── top_anim.jpg
│   │   ├── characters/            # chr_0a.png / chr_1a.png / chr_2.png（立绘）
│   │   │                          # avatar1~3.png（选择器头像）
│   │   ├── gallery/               # 1.webp ~ 6.webp
│   │   └── story/                 # prologue.jpg
│   └── audio/
│       ├── speciosum.mp3          # BGM 第一首（默认播放）
│       └── Ragwort.mp3            # BGM 第二首
└── src/
    ├── main.jsx
    ├── App.jsx                    # 薄壳，组合所有组件
    ├── index.css                  # Tailwind + 主题变量 + 自定义工具类
    ├── data/
    │   └── index.js               # SECTIONS / CHARACTERS / GALLERY_IMAGES 等
    └── components/
        ├── LoadingScreen.jsx
        ├── CustomCursor.jsx       # rAF 驱动，桌面端显示
        ├── SideMenu.jsx           # 右侧滑入导航面板（替代 Navbar）
        ├── MusicPlayer.jsx        # 左下角 BGM 播放器，自动播放
        ├── InfiniteScroll.jsx     # 两侧无缝滚动图片条（rAF + DOM 测量）
        ├── SectionTitle.jsx       # 通用区块标题（heart-clipped 渐变 + 装饰图）
        ├── HomeSection.jsx
        ├── StorySection.jsx
        ├── CharacterSection.jsx
        ├── GallerySection.jsx     # 含 Lightbox（内部状态）
        ├── SpecialSection.jsx
        ├── DownloadSection.jsx
        └── Footer.jsx             # 深粉色 #e65097，顶部半圆波浪，PAGE TOP 按钮
```

## 设计系统

### 颜色（定义在 index.css）
- `sakura-*`：樱花粉系列，主色 `sakura-500 = #f56486`
- `ink-*`：墨黑系列，正文色
- Footer 主色：`#e65097`（深粉）

### 字体
- `font-serif`：Playfair Display（英文标题）
- `font-jp`：Noto Sans JP（日文）
- `font-sans`：Inter（正文）

### 工具类（index.css）
- `glass`：毛玻璃效果
- `glass-light`：更轻的毛玻璃
- `writing-vertical`：竖排日文
- `heart-clipped-text`：三层背景 clip-text 渐变标题效果
- `bg-drift`：背景图斜向漂移动画

## 页面结构

| Section ID | 内容 | 背景 |
|---|---|---|
| `home` | Hero，全屏标题 + 视差背景 | 透明 |
| `story` | 剧情介绍，左文右图 | 透明 |
| `character` | 三角色轮播（真奈美 / 愛実 / 优子） | 透明 |
| `gallery` | 6张 CG 图片网格 + Lightbox | `bg-sakura-50/40` |
| `special` | 特典内容（原声带/画集/特典剧本） | 透明 |
| `download` | 下载按钮 + 系统需求 | `bg-sakura-50/40` |

## 关键架构说明

- **导航**：无顶部 Navbar，改为悬浮菜单球（滚出 Home 后出现，`side-ball.svg` + 汉堡图标）+ 右侧滑入 `SideMenu`
- **音乐**：`MusicPlayer` 进入页面自动播放，浏览器拦截时等待首次用户交互触发
- **两侧滚动条**：`InfiniteScroll` 用 `rAF` + `getBoundingClientRect` 测量真实图片高度，`down` 从 `-h` 到 `0` 循环，`up` 从 `0` 到 `-h` 循环
- **SectionTitle**：`enText` / `zhText` / `center` props，左上角叠加 `img-deco-heading.png`
- **全局光标**：`*, *::before, *::after { cursor: none !important }` 强制隐藏原生光标
- **body 滚动锁**：`SideMenu` 开启时 `document.body.style.overflow = 'hidden'`
- **section 背景交替**：character/special 透明，gallery/download 有 `bg-sakura-50/40`

## 相关性能优化
| 文件 | 修改 | 效果 |
|------|------|------|
| GallerySection.jsx | 6 张图加 `loading="lazy"` | 首屏不加载非可见图片 |
| App.jsx | scroll 事件 → `IntersectionObserver` | 消除滚动时的同步 DOM 查询和强制重排 |
| index.css | 删除 `scroll-behavior: smooth`（与 Lenis 冲突） | 避免双重滚动控制 |
| index.css | 删除重复的 `scroll-down/up` keyframes | 减少 CSS 冗余 |
| MovieSection.jsx | video 加 `preload="none"` | 页面加载时不预请求视频资源 |
| DownloadSection.jsx | shimmer/图标旋转改用 `whileHover`，删除 hovering state | hover 动画完全绕过 React 渲染层 |
| scripts/convert-to-webp.mjs | PNG/JPG → WebP（quality 85/82），转大自动丢弃，宽 >900px 额外生成 `-mobile.webp`（480px） | FCP 预加载体积 ~2.83MB → ~387KB（↓86%） |
| Img.jsx | `<picture style="display:contents">` 封装，props: `src/webpSrc/mobileSrc`；`motion.img` 手动包裹 `<picture>` | 现代浏览器用 WebP，旧浏览器自动降级原图 |

### 图片 WebP 覆盖范围
转换脚本：`npm run convert-images`（`--force` 强制重生成）
**有 WebP**：characters/avatar1~3、chr_0a/1a/2；common/btn_pagetop、q1/q2/title、top_anim；download/img_intro-pick；movie/movie-cover；special/bg、content2/3、cover1~3（宽图含 `-mobile` 变体）
**无 WebP（保留原图）**：`common/bg.jpg`、`story/prologue.jpg`、`download/txt_novel-comic-promo.png`、`movie/txt_movie-*.png`、`special/content1.jpg`
`data/index.js` 中 CHARACTERS 含 `imageWebP/imageMobileWebP/avatarWebP`；SPECIAL_ITEMS 含 `coverWebP/contentWebP/contentMobileWebP`（无 WebP 时为 `null`）。
