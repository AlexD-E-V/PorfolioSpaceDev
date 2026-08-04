/* El portafolio personal de Alex y su enlace "sitio web" son la misma página:
   se importa en vez de repetir la URL, que es como se desincronizan. */
import { PORTFOLIO_URL } from './projects';

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
      github: 'https://github.com/AlexD-E-V',
      website: PORTFOLIO_URL,
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
    /* Escrito en paralelo al de Alex —una afirmación corta y luego el oficio
       concreto—, y sin metáfora cósmica: la versión anterior hablaba de
       "constelaciones visuales coherentes", que suena a marca y no dice qué
       hace. Aquí se nombra el trabajo. */
    focus:
      'Toda marca necesita una forma. Del concepto a la identidad, el color y la tipografía que la vuelven reconocible.',
    /* TODO: pendiente de que la diseñadora pase sus enlaces (Behance /
       Instagram). El icono de GitHub del mockup no encaja con un perfil de
       diseño. */
    socials: {},
  },
];
