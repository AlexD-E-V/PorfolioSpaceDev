/* Datos del sitio que se repiten en varios sitios. */

/* TODO (fase 4): cambiar al correo del dominio propio cuando esté dado de
   alta en Hostinger. Ojo: también hay que cambiarlo en public/contacto.php. */
export const CONTACT_EMAIL = 'spacedev.me@gmail.com';

/* Receptor del formulario. Es un archivo PHP en public/, así que Astro lo
   copia tal cual a dist/ y Hostinger lo ejecuta. Sustituye a las Astro
   Actions, que exigían servidor Node. Ver public/contacto.php. */
export const CONTACT_ENDPOINT = '/contacto.php';
