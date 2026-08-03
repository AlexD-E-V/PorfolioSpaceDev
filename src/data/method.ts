import type { IconName } from './icons';

/* Las cuatro fases responden a la objeción principal para contratar un
   estudio pequeño: "no sé qué va a pasar ni cuánto va a costar". */

export interface Phase {
  step: string;
  when: string;
  title: string;
  description: string;
}

export const PHASES: Phase[] = [
  {
    step: '01',
    when: 'Semana 1',
    title: 'La conversación',
    description:
      'Una llamada. Qué quieres vender, a quién, y qué te está frenando ahora mismo.',
  },
  {
    step: '02',
    when: 'La traza',
    title: 'La constelación',
    description:
      'Alcance, estructura y presupuesto cerrado por escrito. Sin sorpresas después.',
  },
  {
    step: '03',
    when: 'El taller',
    title: 'La materia',
    description:
      'Diseño y código con avances visibles cada semana. Lo ves crecer y opinas a tiempo.',
  },
  {
    step: '04',
    when: 'Y después',
    title: 'El lanzamiento',
    description:
      'Publicamos, medimos y seguimos afinando. La entrega no es el final.',
  },
];

/* El "cuatro" son disciplinas, no personas. Es verdad hoy, con dos, y sigue
   siéndolo cuando sean cuatro. Ver docs/MIZARIUM.md §10. */
export interface Discipline {
  n: string;
  title: string;
  icon: IconName;
}

export const DISCIPLINES: Discipline[] = [
  { n: '01', title: 'Diseño de marca e interfaz', icon: 'lightbulb' },
  { n: '02', title: 'Ingeniería full-stack', icon: 'code' },
  { n: '03', title: 'Motion, 3D y tiempo real', icon: 'view_in_ar' },
  { n: '04', title: 'Producto y crecimiento', icon: 'trending_up' },
];
