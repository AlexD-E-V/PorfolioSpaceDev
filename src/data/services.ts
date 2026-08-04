import type { IconName } from './icons';

/* La web manda. El resto existe como extensión de la web, no como cuatro
   servicios iguales — es lo que de verdad se vende y lo que el equipo hace
   mejor. Ver docs/MIZARIUM.md §5.

   ⚠️ VIDEOJUEGOS TIENE FECHA DE CADUCIDAD. Más adelante nace un estudio
   independiente solo de videojuegos y este servicio sale de Mizarium. Por eso
   todo esto vive en datos: retirarlo será borrar un objeto de SECONDARY, no
   operar el markup. Ver docs/MIZARIUM.md §10. */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface PrimaryService extends Service {
  badge: string;
  deliverables: string[];
  cta: string;
}

export const PRIMARY_SERVICE: PrimaryService = {
  id: 'web',
  badge: 'Servicio principal',
  title: 'Páginas web y e-commerce',
  description:
    'Sitios corporativos, landings de campaña, tiendas y plataformas con panel propio. Diseño a medida, no plantillas: rápido, medible y fácil de actualizar por ti.',
  icon: 'language',
  deliverables: [
    'Identidad y sistema visual',
    'Copy y estructura de venta',
    'Desarrollo a medida o CMS',
    'SEO técnico y analítica',
    'Animación e interacción',
    'Mantenimiento y mejoras',
  ],
  cta: 'Cotizar mi sitio',
};

export const SECONDARY_SERVICES: Service[] = [
  {
    id: 'apps',
    title: 'Apps móviles y web',
    description:
      'De un MVP para validar la idea a un producto publicado en tiendas, con su panel de gestión detrás.',
    icon: 'phone_iphone',
  },
  {
    id: 'xr',
    title: 'VR / AR y 3D en tiempo real',
    description:
      'Simuladores, configuradores y experiencias inmersivas para formación, ferias y museos.',
    icon: 'view_in_ar',
  },
  {
    id: 'games',
    title: 'Videojuegos',
    description:
      'Prototipos jugables y experiencias interactivas en Unity y Unreal, con sus mecánicas y su narrativa.',
    icon: 'sports_esports',
  },
  {
    id: 'software',
    title: 'Software a medida',
    description:
      'Automatizaciones, paneles internos e integraciones que conectan las herramientas que ya usas.',
    icon: 'account_tree',
  },
];

/* Responde a "¿cómo se contrata esto?", que es de las tres primeras preguntas
   de cualquiera que llega buscando un estudio.

   Vive aquí, junto a los servicios, porque es la otra cara del mismo dato —
   qué se compra y bajo qué acuerdo—, pero se pinta en `Nosotros.astro`, al
   final del recorrido: preguntar por el formato es lo último que se hace. */
export interface Format {
  id: string;
  title: string;
  description: string;
  featured?: boolean;
}

export const FORMATS: Format[] = [
  {
    id: 'cerrado',
    title: 'Proyecto cerrado',
    description:
      'Un alcance, un precio y una fecha. Para un sitio nuevo o un rediseño completo.',
  },
  {
    id: 'demanda',
    title: 'Estudio a demanda',
    description:
      'Horas de diseño y desarrollo cada mes para hacer crecer el producto sin volver a negociar.',
    featured: true,
  },
  {
    id: 'producto',
    title: 'Acompañamiento',
    description:
      'Nos metemos a fondo en tu producto durante una etapa larga, con plan y prioridades acordadas.',
  },
];
