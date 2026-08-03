/* Genera los recursos de marca derivados de los SVG originales.
   Ejecutar: node scripts/gen-brand-assets.cjs

   Salidas en public/:
     favicon.svg          pestaña del navegador (vectorial)
     apple-touch-icon.png 180×180, iOS
     icon-512.png         512×512, Android / PWA
     og.png               1200×630, previsualización al compartir

   Estos tres llevan el color quemado a propósito: un favicon no puede leer
   el CSS de la página, así que aquí no vale currentColor. Si cambia la
   paleta, se vuelve a ejecutar este script. */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = 'src/assets/logos';
const OUT = 'public';

/* Mismos valores que src/styles/tokens.css */
const GOLD = '#FFC24B';
const INK_900 = '#0B0F1A';
const INK_950 = '#070912';
const CYAN = '#00E1FF';
const VIOLET = '#7A0BFF';
const WHITE = '#E8ECF5';

/** Devuelve { viewBox:[w,h], body } de un SVG, sin su relleno original. */
function loadSvg(file) {
  const raw = fs.readFileSync(path.join(SRC, file), 'utf8');
  const vb = raw.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!vb) throw new Error(`${file}: viewBox inesperado`);
  const body = raw
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>[\s\S]*$/, '')
    .replace(/\sfill="(?!none)[^"]*"/g, '');
  return { w: parseFloat(vb[1]), h: parseFloat(vb[2]), body };
}

/** Coloca un logo centrado dentro de un lienzo, ocupando `ratio` del ancho. */
function place(logo, canvasW, canvasH, ratio, fill) {
  const scale = Math.min(
    (canvasW * ratio) / logo.w,
    (canvasH * ratio) / logo.h
  );
  const x = (canvasW - logo.w * scale) / 2;
  const y = (canvasH - logo.h * scale) / 2;
  return `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(4)})" fill="${fill}">${logo.body}</g>`;
}

const iso = loadSvg('iso.svg');
const lockup = loadSvg('lockup.svg');

/* ── favicon.svg ──────────────────────────────────────────────────────
   Baldosa oscura con la estrella dorada. Con fondo se lee igual de bien
   en pestañas claras y oscuras; en transparente el oro se pierde sobre
   blanco. */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<rect width="512" height="512" rx="112" fill="${INK_900}"/>
${place(iso, 512, 512, 0.62, GOLD)}
</svg>`;

fs.writeFileSync(path.join(OUT, 'favicon.svg'), favicon);

/* ── og.png ───────────────────────────────────────────────────────────
   Solo el lockup: ya viene con la tipografía trazada, así que no depende
   de que Space Age esté instalada en la máquina que renderiza. */
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="neb1" cx="78%" cy="18%" r="62%">
      <stop offset="0%" stop-color="${VIOLET}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${VIOLET}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="neb2" cx="12%" cy="88%" r="58%">
      <stop offset="0%" stop-color="${CYAN}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${CYAN}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ember" cx="50%" cy="48%" r="42%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${INK_950}"/>
  <rect width="1200" height="630" fill="url(#neb1)"/>
  <rect width="1200" height="630" fill="url(#neb2)"/>
  <rect width="1200" height="630" fill="url(#ember)"/>
  ${[
    [180, 120, 3], [1010, 190, 2.5], [300, 520, 2], [980, 470, 3],
    [520, 90, 2], [720, 560, 2.5], [90, 340, 2], [1130, 360, 2],
  ]
    .map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 4 === 0 ? GOLD : WHITE}" opacity="0.75"/>`)
    .join('\n  ')}
  ${place(lockup, 1200, 630, 0.58, WHITE)}
  <rect x="0" y="626" width="1200" height="4" fill="${GOLD}" opacity="0.85"/>
</svg>`;

async function main() {
  await sharp(Buffer.from(og)).png().toFile(path.join(OUT, 'og.png'));

  for (const [size, name] of [[180, 'apple-touch-icon.png'], [512, 'icon-512.png']]) {
    await sharp(Buffer.from(favicon))
      .resize(size, size)
      .png()
      .toFile(path.join(OUT, name));
  }

  const list = ['favicon.svg', 'og.png', 'apple-touch-icon.png', 'icon-512.png'];
  for (const f of list) {
    const { size } = fs.statSync(path.join(OUT, f));
    console.log(`${f.padEnd(22)} ${(size / 1024).toFixed(1)} KB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
