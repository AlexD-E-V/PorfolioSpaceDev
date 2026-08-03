import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  /* Necesario para las URL canónicas y las etiquetas Open Graph, y más
     adelante para el sitemap. Si el dominio final no es este, se cambia
     aquí y se propaga solo. */
  site: 'https://mizarium.com',

  /* Sitio 100% estático y SIN adaptador.

     Antes esto era output:'server' con el adaptador de Vercel, y el único
     motivo era que las Astro Actions del formulario necesitaban un servidor
     Node. Al pasar el formulario a un PHP propio (public/contacto.php) ese
     motivo desaparece: `astro build` produce HTML plano en dist/ y se sube
     por FTP a Hostinger, donde ya está el dominio.

     Ver docs/MIZARIUM.md §9ter. */
  output: 'static',

  integrations: [tailwind(), react()],
});
