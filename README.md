# Mizarium — Sitio web oficial

Estudio digital multidisciplinar. Diseñamos y programamos páginas web, y desde
ahí apps, videojuegos y experiencias inmersivas. Ambato, Ecuador.

> Este proyecto era **Space DEV**. El último estado con esa marca está en el
> tag `v2.0.0`, por si hace falta volver o recuperar un recurso retirado.

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

**No hay backend Node.** El sitio se compila a HTML plano y lo único dinámico es
el receptor del formulario, que es PHP corriendo en el propio Hostinger. No hace
falta ninguna variable de entorno.

---

## Puesta en marcha

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

La build queda en `dist/`.

> **Verifica siempre con `npm run preview`, no con `npm run dev`.** En
> desarrollo el CSS entra progresivamente por HMR y la maquetación se mueve
> después de saltar a un ancla, así que `/#seccion` aterriza fuera de sitio. En
> la build real cae donde debe.

---

## Estructura

```text
public/
  contacto.php          receptor del formulario (se ejecuta en Hostinger)
  .htaccess             página 404, compresión, caché y cabeceras
  favicon.svg og.png …  generados por scripts/gen-brand-assets.cjs
  robots.txt
src/
  assets/logos/         6 variantes del logo en SVG
  components/
    Hero · Servicios · Proyectos · Nosotros · Contacto
    ui/                 Icon (Astro y React) · Logo
    team/               MemberCard · MemberPortrait · SocialLink
    effects/            Starfield
  data/                 services · projects · method · team · faq · nav · site
  layouts/              Layout.astro
  pages/                index.astro · 404.astro
  styles/               tokens.css · type.css · globals.css · effects.css
scripts/
  gen-icons.cjs         regenera src/data/icons.ts
  gen-brand-assets.cjs  regenera favicon, iconos y og.png
```

### Las dos reglas que sostienen el proyecto

**Todo el contenido vive en `src/data/`.** Añadir un servicio, un proyecto o una
persona al equipo es editar un objeto, nunca tocar markup. Esto no es
sensibilidad estética: el servicio de videojuegos saldrá de Mizarium cuando
nazca el estudio independiente, y al vivir en `data/services.ts` retirarlo será
borrar un objeto.

**Todo el color sale de `src/styles/tokens.css`.** No hay ni un hex en los
componentes. El reparto de papeles es la regla de diseño de la marca:

| Token | Papel |
|---|---|
| `--brand` (oro) | Marca y acción: CTAs, foco, acentos. Escaso a propósito |
| `--atmos` (cian) | Atmósfera: nebulosa, estrellas, degradados de titular |
| `--accent` (violeta) | Solo relleno y degradado — nunca texto (3.1:1) |
| `--ink-*` | Superficie, ~88% de la página |

Cambiar la paleta entera es cambiar los alias de ese archivo.

---

## Página

Cinco secciones: **Hero · Servicios · Proyectos · Nosotros · Contacto**.

El recorrido va de qué se vende a la prueba de que se ha hecho, de ahí a quién lo
hace y bajo qué reglas, y termina en la decisión.

**Nosotros** reúne tres bloques en este orden: el equipo, el método en cuatro
fases y los formatos de contratación. Los tres responden a la misma pregunta
—*quiénes sois y cómo se trabaja con vosotros*—, así que van juntos. Antes
estaban repartidos: Método era sección propia, el equipo colgaba de Proyectos y
los formatos cerraban Servicios.

La FAQ sí sigue absorbida dentro de Contacto, porque las objeciones se responden
donde se decide.

---

## Despliegue en Hostinger

1. `npm run build`
2. Subir el **contenido** de `dist/` a `public_html/` por FTP o desde el
   Administrador de archivos.
3. Comprobar que llegaron `contacto.php` y **`.htaccess`** — muchos clientes FTP
   ocultan los archivos que empiezan por punto. Sin el `.htaccess`, Apache
   muestra su propia página de error en vez de la 404 de la marca, y se pierden
   la compresión y la caché.

Antes del primer despliegue hay que editar tres valores al principio de
`public/contacto.php`:

| | |
|---|---|
| `$DESTINO` | A dónde llegan los mensajes |
| `$REMITENTE` | Tiene que ser una dirección `@mizarium.com`: Hostinger rechaza los correos cuyo remitente no sea del propio dominio |
| `$ORIGENES` | Dominios desde los que se aceptan envíos. Si se prueba en el dominio temporal de Hostinger, añadirlo o el envío dará 403 |

Si el dominio final no fuera `mizarium.com`, se cambia en `astro.config.mjs`
(`site`) y se propaga a canonical, Open Graph y sitemap.

> `astro dev` no ejecuta PHP: en local el formulario mostrará el estado de
> error, que es lo esperado. Para probarlo de verdad, súbelo o levanta PHP con
> `php -S localhost:8080 -t dist`.

---

## Scripts propios

```bash
node scripts/gen-icons.cjs
```

Regenera `src/data/icons.ts` extrayendo de `@material-symbols/svg-400` solo los
iconos que el sitio usa. Sustituye a la fuente de iconos completa, que metía
12,4 MB en el build para dibujar estos mismos glifos. Se ejecuta al añadir un
icono nuevo a la lista del script.

```bash
node scripts/gen-brand-assets.cjs
```

Regenera `favicon.svg`, `apple-touch-icon.png`, `icon-512.png` y `og.png` a
partir de los SVG de `src/assets/logos/`. Se ejecuta al cambiar el logo o la
paleta.

---

## Autoría

Mizarium — Ambato, Ecuador. Más allá de las estrellas.
