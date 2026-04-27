/**
 * Img — 带 WebP 自动回退的图片组件
 *
 * 渲染为 <picture style="display:contents"> + <source> + <img>
 * - display:contents 使 <picture> 对布局透明，<img> 原样参与 flex/grid/绝对定位
 * - 现代浏览器（Chrome 23+/Firefox 65+/Safari 14+）：加载 WebP
 * - 旧浏览器（Safari <14 / IE 等）：自动降级到 <img src> 原图
 * - mobileSrc：移动端（≤767px）优先加载更小的 WebP 变体
 *
 * Props:
 *   src       {string}  原图路径（PNG/JPG 等），同时作为旧浏览器 fallback
 *   webpSrc   {string}  WebP 路径；若不传则退化为普通 <img>
 *   mobileSrc {string}  移动端 WebP 路径（可选）
 *   其余 props 透传给内部 <img>
 */
export default function Img({ src, webpSrc, mobileSrc, alt = '', className, style, ...rest }) {
  if (!webpSrc) {
    return <img src={src} alt={alt} className={className} style={style} {...rest} />;
  }

  return (
    <picture style={{ display: 'contents' }}>
      {mobileSrc && (
        <source media="(max-width: 767px)" srcSet={mobileSrc} type="image/webp" />
      )}
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} className={className} style={style} {...rest} />
    </picture>
  );
}
