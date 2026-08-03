import { Category, type Project } from './types';


export const PROJECTS: Project[] = [
    // WEB Projects
  {
    id: 'rompamos-el-tabu-web',
    title: 'Rompamos el Tabú',
    category: Category.WEB,
    image: '/projectsWeb/PW_Rompamostabu.webp',
    tags: ['Campaña', 'Web'],
    description:
      'Web dedicada a la educación y concienciación sobre la salud y prevención de enfermedades de transmisión sexual (ETS) en jóvenes.',
    status: 'En Vivo',
    tech: 'Joomla / JS',
    url: 'https://rompamoseltabu.com/',
  },

  {
    id: 'space-dev',
    title: 'Mizarium',
    category: Category.WEB,
    image: '/projectsWeb/PW_Spacedev.webp',
    tags: ['Estudio Creativo', 'Web'],
    description:
      'Nuestro propio sitio: la marca y el estudio dentro de una experiencia web fluida, accesible y cósmica.',
    status: 'En Vivo',
    tech: 'Astro / React / TailwindCSS / TS',
    url: '#inicio',
  },

    // GAMING Projects
  {
    id: 'trazando-pasos',
    title: 'Trazando Pasos',
    category: Category.GAMING,
    image: '/projectsVideogames/PV_TrazandoPasos.webp',
    tags: ['GameJam', 'PC', 'Gaming'],
    description:
      'Videojuego en realidad virtual, una experiencia que explora los desafíos de la migración. Juego ganador del GameJam VRDay Latam 2022.',
    status: 'Completado',
    tech: 'Unreal',
    url: 'https://www.behance.net/gallery/166470549/Trazando-Pasos-(videojuego-VR)-(2023)',
  },

  {
    id: 'plantain-feast',
    title: 'Plantain Feast',
    category: Category.GAMING,
    image: '/projectsVideogames/PV_PlantainFeast.webp',
    tags: ['Cultura', 'Móvil', 'Gaming'],
    description:
      'Videojuego de cocina en 2D para móviles sobre gastronomía ecuatoriana, recetas tradicionales con el plátano como ingrediente principal.',
    status: 'Completado',
    tech: 'Unreal',
    url: 'https://www.behance.net/gallery/166078851/Plantain-Feast',
  },


    // APPS Projects
  {
    id: 'pets',
    title: 'Pets',
    category: Category.APPS,
    image: '/projectsApps/PA_Pets.webp',
    tags: ['Mascotas', 'Apps'],
    description:
      'Aplicación móvil para el cuidado y seguimiento de mascotas, con recordatorios de vacunas, citas veterinarias y alimentación.',
    status: 'Prototipo',
    tech: 'Flutter / Supabase',
    url: '',
  },

    // VR_AR Projects
  {
    id: 'alerta-ar',
    title: 'ALERTA!',
    category: Category.VR_AR,
    image: '/projectsXR/PX_Alerta.webp',
    tags: ['Galería Viva', 'AR'],
    description:
      'Realidad aumentada para Alerta! Reflexiones gráficas en torno a la salud mental, combinando arte, animaciones y tecnología.',
    status: 'En Vivo',
    tech: 'Lens Studio / JS',
    url: 'https://www.expreso.ec/guayaquil/arte-interactivo-busca-sensibilizar-enos-salud-mental-213527.html',
  },


  {
    id: 'simulacion-de-soldadura-vr',
    title: 'Simulación de Soldadura VR',
    category: Category.VR_AR,
    image: '/projectsXR/PX_SimulacionSoldadura.webp',
    tags: ['Capacitación', 'VR'],
    description:
      'Simulación de soldadura en realidad virtual para Meta Quest 2, que guía a los usuarios a través de cada paso del proceso de soldadura.',
    status: 'Completado',
    tech: 'Unity / C# / Meta Quest 2',
    url: 'https://www.canva.com/design/DAGQfhKZAcg/fuZ0j9mHAswxeGnv_saAdw/edit?utm_content=DAGQfhKZAcg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
  },

  
];
