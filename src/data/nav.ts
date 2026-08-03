/* Una sola fuente para el menú de escritorio y el de móvil: antes cada uno
   tenía su propia lista y se desincronizaban.

   Etiquetas en español llano a propósito. Los nombres de marca viven en los
   títulos de sección, donde suman; en el menú restan orientación — un
   visitante nuevo no sabe qué hay detrás de "Observatorio" o "Constelaciones".
   Ver docs/MIZARIUM.md §4.

   ⚠️ LOS `href` LLEVAN LA BARRA A PROPÓSITO: `/#servicios`, no `#servicios`.

   El header sale en TODAS las páginas, también en la 404. Con un ancla suelta,
   pulsar "Servicios" desde /404 solo añadía el fragmento a la URL (/404#servicios)
   y no pasaba nada, porque esa sección no existe ahí: el menú quedaba muerto
   fuera de la home.

   Con la barra delante funciona en los dos casos. Desde la home el navegador
   lo trata como salto de fragmento en el mismo documento (no recarga, porque
   solo cambia el hash); desde cualquier otra página navega a la home y salta
   a la sección. */

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: 'servicios', label: 'Servicios', href: '/#servicios' },
  { id: 'metodo', label: 'Método', href: '/#metodo' },
  { id: 'trabajo', label: 'Trabajo', href: '/#trabajo' },
  { id: 'contacto', label: 'Contacto', href: '/#contacto' },
];

/** Destino del CTA y del logotipo, por el mismo motivo. */
export const CTA_HREF = '/#contacto';
export const HOME_HREF = '/#inicio';
