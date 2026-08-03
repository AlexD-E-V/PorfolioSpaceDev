/* Sustituye a constants.tsx.

   Criterio de selección: NO "los proyectos más impresionantes" sino los que
   hizo de verdad el equipo de Mizarium (Alex + Ane Marie). ALERTA!, la
   simulación de soldadura y los game jams se quedan fuera: son de la rama que
   se marcha al estudio de videojuegos. Ver docs/MIZARIUM.md §9bis.

   Pets y Ponte en sus Patitas son el mismo producto — la app y su campaña de
   prelanzamiento — así que van como un solo caso en dos piezas. Contarlos
   juntos demuestra recorrido completo: marca, campaña y producto. */

export interface Project {
  id: string;
  title: string;
  /** Qué se hizo, en una línea. Va debajo del título. */
  role: string;
  year: string;
  image: string;
  tags: string[];
  description: string;
  /** Lo que consiguió el cliente. Es lo que de verdad compra el que lee. */
  result: string;
  tech: string;
  url: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'rompamos-el-tabu',
    title: 'Rompamos el Tabú',
    role: 'Web de campaña',
    year: '2024',
    image: '/projectsWeb/PW_Rompamostabu.webp',
    tags: ['Campaña', 'Salud', 'Web'],
    description:
      'Sitio de educación y prevención sobre enfermedades de transmisión sexual en jóvenes, con contenido que había que hacer accesible sin perder el tono.',
    result: 'Campaña en vivo con contenido consultable de forma abierta.',
    tech: 'Joomla · JavaScript',
    url: 'https://rompamoseltabu.com/',
  },
  {
    id: 'pets',
    title: 'Pets · Ponte en sus Patitas',
    role: 'App y campaña de prelanzamiento',
    year: '2025',
    image: '/projectsApps/PA_Pets.webp',
    tags: ['Producto', 'Campaña', 'App'],
    description:
      'Una app de cuidado y seguimiento de mascotas, y la campaña que le construyó marca, comunidad y expectativa antes de que existiera el producto.',
    result:
      'Base de interesados y una identidad de marca consolidada antes del lanzamiento.',
    tech: 'Flutter · Supabase · Joomla',
    url: '',
  },
];

/* El portafolio personal de Alex tiene el resto del trabajo. Enlazarlo deja
   esta página magra y comercial sin perder a quien quiere profundidad, y
   evita que las dos compitan. */
export const PORTFOLIO_URL = 'https://alex-d-e-v.vercel.app/';
