export type SocialNetwork =
  | 'github'
  | 'instagram'
  | 'website'
  | 'artstation'
  | 'behance';

export interface TeamMember {
  id: string;
  name: string;
  /** Ruta en /public. `null` = todavía no hay foto propia (se pinta la inicial). */
  photo: string | null;
  /** Badge principal, resaltado en color de marca. */
  role: string;
  /** Badge secundario. Solo en los destacados. */
  secondaryRole?: string;
  /** Línea "Especialidad". Solo en los compactos. */
  specialty?: string;
  /** Frase en cursiva. Solo en los destacados. */
  focus?: string;
  /** Identificador tipo MZR-01. Solo en los destacados. */
  code?: string;
  /** Área de trabajo, junto al código. Solo en los destacados. */
  area?: string;
  /** Ocupa dos columnas y muestra código, área y frase. */
  featured?: boolean;
  /** Marco del retrato. Los destacados alternan círculo y cuadrado girado. */
  frame?: 'circle' | 'square';
  socials: Partial<Record<SocialNetwork, string>>;
}

export const TEAM: TeamMember[] = [
  {
    id: 'alex',
    name: 'ALEX DEV',
    photo: '/perfiles/alexperfil.webp',
    code: 'CMDR-01',
    area: 'Proyecto · Desarrollo',
    role: 'Programador Full-Stack',
    secondaryRole: 'Dirección Técnica',
    focus:
      'Toda idea se puede programar. De problemas complejos a soluciones claras a través de código y estructura.',
    featured: true,
    frame: 'circle',
    socials: {
      github: 'https://github.com/AlexSpaceDev',
    },
  },
  {
    id: 'esteban',
    name: 'ESTEBAN ORTÍZ',
    photo: '/perfiles/estebanperfil.webp',
    role: 'Modelador 3D',
    specialty: 'Assets y entornos 3D',
    socials: {
      instagram:
        'https://www.instagram.com/1_tal_esteban/?igsh=MWV1NjdmY2N4anF0NA%3D%3D',
      website: 'https://sites.google.com/view/estebanortiz/proyectos',
    },
  },
  {
    id: 'colorsbeta',
    name: 'COLORSBETA',
    photo: '/perfiles/danielaperfil.webp',
    role: 'Ilustradora',
    specialty: 'Concept Artist de personajes',
    socials: {
      artstation: 'https://www.artstation.com/colorsbeta',
      instagram: 'https://www.instagram.com/colorsbeta',
      behance: 'https://www.behance.net/danielajamel',
    },
  },
  {
    id: 'betancourt',
    name: 'J. BETANCOURT',
    /* TODO: falta la foto propia. Antes apuntaba a preview.redd.it, un enlace
       externo que no controlamos y que iba a romperse solo. Mientras tanto se
       pinta la inicial. Ver docs/MIZARIUM.md §8. */
    photo: null,
    role: 'Modelador 3D',
    specialty: 'Personajes y criaturas 3D',
    socials: {
      artstation: 'https://www.artstation.com/jbetancourt',
      behance: 'https://www.behance.net/juanb11953633',
    },
  },
  {
    id: 'rabano',
    name: 'ALEJO RÁBANO',
    photo: '/perfiles/rabanoperfil.webp',
    code: 'CMDR-02',
    area: 'Diseño · Experiencia',
    role: 'Solo un diseñador',
    secondaryRole: 'Dirección Visual',
    focus:
      'Diseño experiencias claras y coherentes donde la estética y la usabilidad trabajan juntas.',
    featured: true,
    frame: 'square',
    socials: {},
  },
];

export const AREAS = [
  'Arquitectura & Programación',
  'Diseño UI/UX',
  'Dirección Creativa',
  'Arte & Visuales',
  'Narrativa',
  'Optimización & Escalabilidad',
];
