/* Datos del sitio que se repiten en varios sitios. */

/* TODO: cambiar a una dirección @mizarium.com cuando el dominio esté dado de
   alta en Hostinger. Ojo: también hay que cambiarlo en public/contacto.php
   (`$DESTINO`), que es el otro sitio donde vive este correo. */
export const CONTACT_EMAIL = 'mizariumstudio@gmail.com';

/* Receptor del formulario. Es un archivo PHP en public/, así que Astro lo
   copia tal cual a dist/ y Hostinger lo ejecuta. Sustituye a las Astro
   Actions, que exigían servidor Node. Ver public/contacto.php. */
export const CONTACT_ENDPOINT = '/contacto.php';
