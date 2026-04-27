/**
 * convert-to-webp.mjs
 * 将 public/images/ 下所有 PNG / JPG 批量转换为 WebP。
 * - PNG (有 alpha) → WebP quality 85, lossless=false
 * - JPG → WebP quality 82
 * - 文件 < 4KB 跳过（太小无收益）
 * - 宽度 > 900px 的图另额外生成 480px 宽的移动端版本 (*-mobile.webp)
 * - 已存在对应 .webp 则跳过（可加 --force 强制重新生成）
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_IMAGES = join(__dirname, '../public/images');
const MIN_BYTES = 4 * 1024;
const MOBILE_WIDTH = 480;
const MOBILE_THRESHOLD = 900; // 宽度超过此值时生成移动端版本
const FORCE = process.argv.includes('--force');

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...(await findImages(fullPath)));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const { size } = await stat(fullPath);
        if (size >= MIN_BYTES) result.push({ path: fullPath, size, ext });
      }
    }
  }
  return result;
}

async function convert(file) {
  const webpPath = file.path.replace(/\.(png|jpe?g)$/i, '.webp');

  // 跳过已存在（除非 --force）
  if (!FORCE) {
    try {
      await stat(webpPath);
      console.log(`  skip  ${basename(file.path)} (已存在)`);
      return null;
    } catch { /* 不存在，继续 */ }
  }

  const quality = file.ext === '.png' ? 85 : 82;
  const instance = sharp(file.path);
  const meta = await instance.metadata();

  await instance.webp({ quality }).toFile(webpPath);

  const { size: webpSize } = await stat(webpPath);

  // 若转换后反而更大，删除并跳过
  if (webpSize >= file.size) {
    const { unlink } = await import('fs/promises');
    await unlink(webpPath);
    console.log(`  drop  ${basename(file.path)} (WebP 更大，保留原图)`);
    return null;
  }

  const saving = file.size - webpSize;
  const ratio = Math.round((1 - webpSize / file.size) * 100);

  let mobileSaved = 0;

  // 生成移动端版本
  if (meta.width && meta.width > MOBILE_THRESHOLD) {
    const mobilePath = file.path.replace(/\.(png|jpe?g)$/i, '-mobile.webp');
    let skipMobile = false;
    if (!FORCE) {
      try { await stat(mobilePath); skipMobile = true; } catch { /* ok */ }
    }
    if (!skipMobile) {
      await sharp(file.path)
        .resize({ width: MOBILE_WIDTH, withoutEnlargement: true })
        .webp({ quality })
        .toFile(mobilePath);
      const { size: ms } = await stat(mobilePath);
      mobileSaved = file.size - ms;
    }
  }

  return { originalSize: file.size, webpSize, saving, ratio, mobileSaved };
}

async function main() {
  console.log('🔍 扫描图片中…\n');
  const images = await findImages(PUBLIC_IMAGES);
  console.log(`共找到 ${images.length} 张待转换图片\n`);

  let totalOriginal = 0, totalWebP = 0, totalMobileSaved = 0;

  for (const file of images) {
    process.stdout.write(`  ${basename(file.path).padEnd(40)}`);
    try {
      const r = await convert(file);
      if (!r) continue; // 已跳过
      console.log(`✓  ${(file.size / 1024).toFixed(0).padStart(6)}KB → ${(r.webpSize / 1024).toFixed(0).padStart(5)}KB  (-${r.ratio}%)`);
      totalOriginal += r.originalSize;
      totalWebP += r.webpSize;
      totalMobileSaved += r.mobileSaved;
    } catch (err) {
      console.log(`✗  ${err.message}`);
    }
  }

  const saved = totalOriginal - totalWebP;
  console.log('\n──────────────────────────────────────────');
  console.log(`节省体积：${(saved / 1024 / 1024).toFixed(2)} MB`);
  if (totalMobileSaved > 0) {
    console.log(`移动端版本额外节省：${(totalMobileSaved / 1024 / 1024).toFixed(2)} MB`);
  }
  console.log('完成 ✓');
}

main().catch(console.error);
