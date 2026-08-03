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
  code: string;
  area: string;
  role: string;
  secondaryRole?: string;
  focus: string;
  socials: Partial<Record<SocialNetwork, string>>;
}

/* Hoy Mizarium son dos personas. Esteban, Colorsbeta y J. Betancourt salieron
   de la marca: su trabajo va hacia el estudio de videojuegos independiente.
   El objetivo es llegar a cuatro principales — añadir a alguien son doce
   líneas aquí, nada de tocar componentes. Ver docs/MIZARIUM.md §10. */
export const TEAM: TeamMember[] = [
  {
    id: 'alex',
    name: 'ALEX DEV',
    photo: '/perfiles/alexperfil.webp',
    code: 'MZR-01',
    area: 'Producto · Desarrollo',
    role: 'Programador Full-Stack',
    secondaryRole: 'Dirección Técnica',
    focus:
      'Toda idea se puede programar. De problemas complejos a soluciones claras a través de código y estructura.',
    socials: {
      github: 'https://github.com/AlexSpaceDev',
    },
  },
  {
    id: 'ane',
    name: 'ANE MARIE',
    /* TODO: falta la foto propia; mientras tanto se pinta la inicial. */
    photo: null,
    code: 'MZR-02',
    area: 'Diseño · Marca',
    role: 'Diseñadora Gráfica',
    secondaryRole: 'Dirección Creativa',
    focus:
      'Transformo ideas en constelaciones visuales coherentes, cuidando el equilibrio entre el impacto gráfico, la funcionalidad y el detalle creativo.',
    /* TODO: pedir sus enlaces (Behance / Instagram / Dribbble). El icono de
       GitHub del mockup no encaja con un perfil de diseño. */
    socials: {},
  },
];
