/* Sustituye a constants.tsx.

   Criterio de selección: NO "los proyectos más impresionantes" sino los que
   hizo de verdad el equipo de Mizarium (Alex + Ane Marie). ALERTA!, la
   simulación de soldadura y los game jams se quedan fuera: son de la rama que
   se marcha al estudio de videojuegos. Ver docs/MIZARIUM.md §9bis.

   Pets y Ponte en sus Patitas son el mismo producto — la app y su campaña de
   prelanzamiento — así que van como un solo caso en dos piezas.

   REPARTO DE TEXTO
   Lo que se ve siempre es mínimo: etiqueta, título y una línea. El resto
   (papel, año, resultado y stack) aparece sobre la imagen al pasar por
   encima, y en móvil —donde no hay hover— se muestra en una línea compacta.
   Así la sección se lee visual sin perder el dato que de verdad vende. */

export interface Project {
  id: string;
  title: string;
  /** Etiqueta de la píldora sobre la imagen. Dos palabras como mucho. */
  category: string;
  /** La única línea visible bajo el título. Corta. */
  hook: string;
  /** Color de la píldora. Ver ACCENTS en Proyectos.astro. */
  accent: 'gold' | 'cyan' | 'violet';
  /** Descripción de la imagen para lectores de pantalla. */
  alt: string;

  /* --- Solo visible al pasar por encima --- */
  role: string;
  year: string;
  result: string;
  tech: string;

  image: string;
  url: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'rompamos-el-tabu',
    title: 'Rompamos el Tabú',
    category: 'Salud & Social',
    hook: 'Educación sobre salud sexual, sin rodeos y sin estigma.',
    accent: 'gold',
    alt: 'La web de Rompamos el Tabú en portátil y móvil.',
    role: 'Web de campaña',
    year: '2024',
    result: 'Campaña en vivo, con el contenido abierto y consultable.',
    tech: 'Joomla · JavaScript',
    image: '/projectsWeb/PW_Rompamostabu.webp',
    url: 'https://rompamoseltabu.com/',
  },
  {
    id: 'pets',
    title: 'Pets · Ponte en sus Patitas',
    category: 'Producto',
    hook: 'Una marca y una comunidad antes de que existiera la app.',
    accent: 'cyan',
    alt: 'Identidad de la marca Pets sobre fondo claro.',
    role: 'App y campaña de prelanzamiento',
    year: '2025',
    result: 'Base de interesados e identidad consolidada antes del lanzamiento.',
    tech: 'Flutter · Supabase · Joomla',
    image: '/projectsApps/PA_Pets.webp',
    url: '',
  },
];

/* El portafolio personal de Alex tiene el resto del trabajo. Enlazarlo deja
   esta página magra y comercial sin perder a quien quiere profundidad, y
   evita que las dos compitan. */
export const PORTFOLIO_URL = 'https://alex-d-e-v.vercel.app/';
