import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  /* La landing es HTML que no cambia entre visitas: se prerenderiza y la
     sirve el CDN. La action de contacto sigue ejecutándose bajo demanda
     como función, que es lo único que necesita servidor.

     Antes era output:'server' con prerender:false, así que cada visita
     arrancaba una función serverless para devolver siempre lo mismo. */
  output: 'static',

  adapter: vercel({
    webAnalytics: { enabled: false }
  }),

  integrations: [tailwind(), react()],
});
