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

/* Aquí vivía `DISCIPLINES`, las cuatro disciplinas del bloque "Sistema
   Mizar". Se retiró junto con el bloque. */
