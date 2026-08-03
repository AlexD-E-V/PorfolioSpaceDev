/* Genera src/data/icons.ts con los paths SVG de los iconos que el sitio usa.
   Ejecutar: node scripts/gen-icons.cjs

   Fuente: @material-symbols/svg-400 (devDependency, no llega al cliente).
   Sustituye a `import 'material-symbols'`, que metía 12,4 MB de fuentes en
   el build para dibujar estos mismos glifos. Ver docs/MIZARIUM.md §6. */

const fs = require('fs');
const path = require('path');

const DIR = 'node_modules/@material-symbols/svg-400/outlined/';

/* La clave es el nombre que se usa en el código; el valor, el archivo real
   del paquete cuando difieren. Google renombró varios iconos entre la
   versión de la fuente (0.40) y la de los SVG (0.45). */
const ICONS = {
  account_tree: null,
  alternate_email: null,
  arrow_forward: null,
  check_circle: null,
  code: null,
  content_copy: null,
  error: null,
  expand_more: 'keyboard_arrow_down',   // renombrado en 0.45
  explore: null,                        // reemplaza al inexistente "Atr"
  gamepad_left: null,
  grid_view: null,
  head_mounted_device: null,
  hourglass_top: null,
  hub: null,
  keyboard_arrow_down: null,
  keyboard_arrow_up: null,
  language: null,
  lightbulb: null,
  location_on: null,
  mobile_code: null,
  person: null,
  phone_iphone: 'mobile',               // renombrado en 0.45
  public: null,
  report: null,
  rocket_launch: null,
  schedule: null,
  sensors: null,
  settings_suggest: 'settings',          // retirado en 0.45
  sports_esports: null,
  terminal: null,
  travel_explore: null,
  trending_up: null,
  vibration: 'mobile_vibrate',           // renombrado en 0.45
  videogame_asset: null,
  view_in_ar: null,
};

const out = {};
const missing = [];

for (const [name, file] of Object.entries(ICONS)) {
  const p = path.join(DIR, `${file ?? name}.svg`);
  if (!fs.existsSync(p)) {
    missing.push(`${name} -> ${file ?? name}.svg no existe`);
    continue;
  }
  const svg = fs.readFileSync(p, 'utf8');
  if (!svg.includes('viewBox="0 -960 960 960"')) {
    missing.push(`${name}: viewBox inesperado`);
    continue;
  }
  const ds = [...svg.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1]);
  if (!ds.length) {
    missing.push(`${name}: sin path`);
    continue;
  }
  out[name] = ds;
}

if (missing.length) {
  console.error('FALTAN:\n  ' + missing.join('\n  '));
  process.exit(1);
}

const body = Object.entries(out)
  .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
  .join('\n');

fs.writeFileSync(
  'src/data/icons.ts',
  `/* GENERADO por scripts/gen-icons.cjs — no editar a mano.
   Fuente: @material-symbols/svg-400 (Apache-2.0), variante "outlined".
   Solo los ${Object.keys(out).length} iconos que el sitio usa de verdad. */

export const ICON_PATHS = {
${body}
} as const;

export type IconName = keyof typeof ICON_PATHS;

/* Sistema de coordenadas nativo de Material Symbols. */
export const ICON_VIEWBOX = '0 -960 960 960';
`
);

const bytes = Object.values(out).flat().reduce((n, d) => n + d.length, 0);
console.log(`OK - ${Object.keys(out).length} iconos, ${(bytes / 1024).toFixed(1)} KB de paths`);
