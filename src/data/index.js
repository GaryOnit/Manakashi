export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Story' },
  { id: 'character', label: 'Character' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'special', label: 'Special' },
  { id: 'download', label: 'Download' },
];

export const CHARACTERS = [
  {
    id: 'manami',
    name: 'Manami Honjo',
    jpName: '本庄 真奈美',
    cv: '八尋まみ',
    tagline: 'The girl who promised the spring.',
    description:
      '町内の学校に転校してきた普通の女子学生。引っ越したばかりで何も分からないため、「愛実」から様々なことを教えてもらっている。\nあまり自己主張しない性格でクラスでは目立たないようにしている。\n実はレズビアンで、同じクラスの愛実に心惹かれているが、告白するような勇気はないため普通の友達として接している。',
    quote: "Even if the snow never melts, I'll still be waiting for you under this tree.",
    color: '#FFB7C5',
    image: '/images/characters/chr_0a.png',
    avatar: '/images/characters/avatar1.png',
  },
  {
    id: 'aimi',
    name: 'Aimi Kanzaki',
    jpName: '神崎 愛実',
    cv: '風花ましろ',
    tagline: 'The silent observer of the night.',
    description:
      '町内の学校に通っている女子学生。勉強も運動もできる優秀な生徒。全てのことをそつなくこなす。\n特に親しい友人もおらず、周囲には少し近寄りがたい雰囲気を放っている。\n隣の席に転校してきた「真奈美」には、自ら言葉をかけ学校生活を手助けしようとしている。',
    quote: "The moon is beautiful tonight, don't you think? But beauty is often a trap.",
    color: '#A0C4FF',
    image: '/images/characters/chr_1a.png',
    avatar: '/images/characters/avatar2.png',
  },
  {
    id: 'yuko',
    name: 'Yuko',
    jpName: '優子',
    cv: '水野七海',
    tagline: 'A spark of fire in the cold frost.',
    description:
      "「愛実」と何かしらの関係がある人物。\n常にゴスロリ調の服を着ており、「真奈美」にも友好的に接してくる。",
    quote: "Hey! Don't you dare give up now. We're in this together, remember?",
    color: '#FFADAD',
    image: '/images/characters/chr_2.png',
    avatar: '/images/characters/avatar3.png',
  },
];

export const GALLERY_IMAGES = [
  { src: '/images/gallery/1.webp', label: 'SCENE 01' },
  { src: '/images/gallery/2.webp', label: 'SCENE 02' },
  { src: '/images/gallery/3.webp', label: 'SCENE 03' },
  { src: '/images/gallery/4.webp', label: 'SCENE 04' },
  { src: '/images/gallery/5.webp', label: 'SCENE 05' },
  { src: '/images/gallery/6.webp', label: 'SCENE 06' },
];

export const SPECIAL_ITEMS = [
  {
    key: 'soundtrack',
    title: 'Original Soundtrack',
    desc: '時を超える調べ、全楽曲フル収録。',
    cover: '/images/special/cover1.png',
    content: '/images/special/content1.jpg',
  },
  {
    key: 'artbook',
    title: 'Official Artbook',
    desc: '秘蔵原画で綴る、百余頁のキャラ設定。',
    cover: '/images/special/cover2.png',
    content: '/images/special/content2.jpg',
  },
  {
    key: 'story',
    title: 'Secret Episode',
    desc: '語られぬ恋心、秘められた後日談。',
    cover: '/images/special/cover3.png',
    content: '/images/special/content3.jpg',
  },
];

export const SYSTEM_REQUIREMENTS = [
  { label: 'OS', value: 'Windows 10/11 (64-bit)' },
  { label: 'Processor', value: 'Intel Core i3-8xxx / AMD Ryzen 3 3xxx' },
  { label: 'Memory', value: '8 GB RAM' },
  { label: 'Graphics', value: 'GTX 1050 / Radeon RX 560 (4GB VRAM)' },
  { label: 'DirectX', value: 'Version 11' },
  { label: 'Storage', value: '12 GB available space' },
];
