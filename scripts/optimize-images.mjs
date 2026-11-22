#!/usr/bin/env node
/**
 * Optimise les images de public/uploads/ :
 *   - convertit les .png / .jpg / .jpeg en .webp (redimensionnés selon le dossier)
 *   - supprime l'original
 *   - met à jour automatiquement les chemins dans src/
 *
 * Usage : npm run images
 * Les .svg et .webp déjà présents ne sont pas touchés.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const UPLOADS = path.join(ROOT, 'public', 'uploads');
const SRC = path.join(ROOT, 'src');

// Taille maximale (en px, côté le plus long) et qualité selon le dossier
const RULES = {
  teams: { max: 1920, quality: 78 },
  club: { max: 1920, quality: 80 },
  staff: { max: 600, quality: 82 },
  partners: { max: 600, quality: 85 },
  icons: { max: 128, quality: 90 },
  default: { max: 1600, quality: 80 },
};

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const toPosix = (p) => p.split(path.sep).join('/');
const kb = (n) => `${Math.round(n / 1024)} Ko`;

const images = walk(UPLOADS).filter((f) => /\.(png|jpe?g)$/i.test(f));
if (images.length === 0) {
  console.log('Aucune image à convertir dans public/uploads/.');
  process.exit(0);
}

const sourceFiles = walk(SRC).filter((f) => /\.(tsx?|css)$/.test(f));
let before = 0;
let after = 0;

for (const file of images) {
  const folder = toPosix(path.relative(UPLOADS, file)).split('/')[0];
  const { max, quality } = RULES[folder] ?? RULES.default;
  const out = file.replace(/\.(png|jpe?g)$/i, '.webp');

  await sharp(file)
    .rotate() // respecte l'orientation EXIF des photos de téléphone
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(out);

  const oldSize = fs.statSync(file).size;
  const newSize = fs.statSync(out).size;
  before += oldSize;
  after += newSize;
  fs.rmSync(file);

  // Mise à jour des références dans le code
  const oldRef = `/uploads/${toPosix(path.relative(UPLOADS, file))}`;
  const newRef = `/uploads/${toPosix(path.relative(UPLOADS, out))}`;
  for (const src of sourceFiles) {
    const code = fs.readFileSync(src, 'utf8');
    if (code.includes(oldRef)) fs.writeFileSync(src, code.split(oldRef).join(newRef));
  }

  console.log(`${oldRef}  ${kb(oldSize)} → ${kb(newSize)}`);
}

console.log(`\nTotal : ${kb(before)} → ${kb(after)} (${Math.round((1 - after / before) * 100)} % de gain)`);
