# Mizarium — Sitio web oficial

Estudio digital multidisciplinar. Diseñamos y programamos páginas web, y desde
ahí apps, videojuegos y experiencias inmersivas.

> Este proyecto era **Space DEV**. El último estado con esa marca está en el
> tag [`v2.0.0`](../../releases/tag/v2.0.0).

---

## Stack

| | |
|---|---|
| **Astro 5** | Sitio estático, sin adaptador ni servidor |
| **React 19** | Solo en las tres islas que necesitan interacción |
| **TailwindCSS 3** | Sobre variables CSS propias (`src/styles/tokens.css`) |
| **TypeScript** | `astro check` limpio |
| **PHP** | Un único archivo para el formulario (`public/contacto.php`) |
| **Hostinger** | Alojamiento estático + dominio |

**No hay backend Node.** El sitio se compila a HTML plano y lo único dinámico
es el receptor del formulario, que es PHP corriendo en el propio Hostinger.

---

## Puesta en marcha

```bash
npm install
npm run dev
```

```bash
npm run build
```

La build queda en `dist/`. No hace falta ninguna variable de entorno: el
correo de destino se configura dentro de `public/contacto.php`.

---

## Estructura

```text
public/
  contacto.php          receptor del formulario (se ejecuta en Hostinger)
  favicon.svg og.png …  generados por scripts/gen-brand-assets.cjs
src/
  assets/logos/         SVG originales del logo (6 variantes)
  components/           secciones + ui/ (Icon, Logo) + team/
  data/                 servicios, proyectos, método, equipo, FAQ, iconos, nav
  layouts/              Layout.astro
  pages/                index.astro
  styles/               tokens.css · type.css · globals.css · effects.css
scripts/
  gen-icons.cjs         extrae los SVG de los iconos que se usan
  gen-brand-assets.cjs  genera favicon, apple-touch-icon y la imagen social
docs/                   documentación de marca y plan (local, no versionada)
```

**Todo el contenido vive en `src/data/`.** Añadir un servicio, un proyecto o
una persona al equipo es editar un objeto, no tocar markup.

**Todo el color sale de `src/styles/tokens.css`.** No hay hex en los
componentes: `--brand` es la marca (oro), `--atmos` la atmósfera (cian) y
`--ink-*` la superficie.

---

## Despliegue en Hostinger

1. `npm run build`
2. Subir el **contenido** de `dist/` a `public_html/` por FTP o desde el
   Administrador de archivos.
3. Comprobar que `contacto.php` quedó en la raíz y abrir la web.

Antes del primer despliegue hay que editar tres valores al principio de
`public/contacto.php`: el correo de destino, el remitente (tiene que ser una
dirección `@mizarium.com` o Hostinger rechaza el envío) y los orígenes
permitidos.

> `astro dev` no ejecuta PHP, así que en local el formulario mostrará el
> estado de error. Para probarlo de verdad: `php -S localhost:8080 -t dist`.

---

## Scripts propios

```bash
node scripts/gen-icons.cjs          # regenera src/data/icons.ts
node scripts/gen-brand-assets.cjs   # regenera favicon, iconos y og.png
```

El primero solo hace falta al añadir un icono nuevo; el segundo, al cambiar
el logo o la paleta.

---

## Autoría

Mizarium — Quito, Ecuador. Latitud 0°.
