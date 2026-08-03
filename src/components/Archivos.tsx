import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import { Category, SIGNAL_MAP, type ArchiveFilter } from '../types';
import type { Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './ui/Icon';
import type { IconName } from '../data/icons';

const Archivos: React.FC = () => {
  /* --- estado del filtro --- */
  const [filter, setFilter] = useState<ArchiveFilter>('TODOS');
  const [expanded, setExpanded] = useState(false);

  /* --- filtrado --- */
  const displayProjects = useMemo<Project[]>(() => {
    // Si el filtro es específico → mostrar todos los de esa categoría
    if (filter !== 'TODOS') {
      return PROJECTS.filter(p => p.category === filter);
    }

    // Si es TODOS y está expandido → mostrar todos
    if (expanded) {
      return PROJECTS;
    }

    // TODOS + NO expandido → uno por categoría
    const oneOfEach: Project[] = [];
    const usedCategories = new Set<Category>();

  for (const project of PROJECTS) {
    if (!usedCategories.has(project.category)) {
      usedCategories.add(project.category);
      oneOfEach.push(project);
    }

    // Cortamos cuando ya tenemos 1 por categoría
    if (usedCategories.size === Object.values(Category).length) {
      break;
    }
  }

    return oneOfEach;
  }, [filter, expanded]);

  const handleFilterChange = (newFilter: ArchiveFilter) => {
    setFilter(newFilter);
    setExpanded(false);
  }

  return (
    <section id="archivos" className="relative w-full py-32">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">

        {/* =========================
            HEADER DE SECCIÓN
        ========================= */}
        <div className="items-end gap-6 mb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-3">
              <span className="h-[1px] w-8 bg-primary"></span>
              <span className="text-xs font-bold tracking-[0.3em] uppercase">
                Acceso al archivo concedido
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase mb-6">
              {' '}
              <span className="text-cosmic">
                Archivos
              </span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed font-light max-w-3xl text-pretty">
              Registros de proyectos desarrollados por nuestro estudio creativo
              que documentan nuestro recorrido, transformando ideas en productos digitales funcionales y memorables.
            </p>
          </div>
        </div>

        {/* =========================
            FILTROS (misma UI, con lógica)
        ========================= */}
        <div className="flex gap-3 lg:mb-16 md:mb-16 mb-10 overflow-x-auto pb-4 no-scrollbar">
          <FilterButton
            active={filter === 'TODOS'}
            icon="grid_view"
            label="TODOS"
            onClick={() => handleFilterChange('TODOS')}
          />

          <FilterButton
            active={filter === Category.WEB}
            icon="language"
            label="WEB"
            onClick={() => handleFilterChange(Category.WEB)}
          />

          <FilterButton
            active={filter === Category.GAMING}
            icon="gamepad_left"
            label="GAMING"
            onClick={() => handleFilterChange(Category.GAMING)}
          />

          <FilterButton
            active={filter === Category.APPS}
            icon="mobile_code"
            label="APPS"
            onClick={() => handleFilterChange(Category.APPS)}
          />

          <FilterButton
            active={filter === Category.VR_AR}
            icon="head_mounted_device"
            label="VR/AR"
            onClick={() => handleFilterChange(Category.VR_AR)}
          />
        </div>

        {/* =========================
            LEYENDA ESTADOS (SOLO MÓVIL)
        ========================= */}
        <div className="flex md:hidden items-center gap-5 mb-8 text-[11px] uppercase tracking-wide opacity-70">
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            <span>En Vivo</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
            <span>Completado</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Prototipo</span>
          </div>

        </div>

        {/* =========================
            CABECERA SEÑAL (UNA SOLA VEZ)
        ========================= */}
        <div className="flex items-center gap-2 mb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={filter}
              initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: ['blur(2px)', 'blur(0px)', 'blur(1px)', 'blur(0px)'], }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded"
            >
              SEÑAL {SIGNAL_MAP[filter]}
            </motion.span>
          </AnimatePresence>

          <motion.span
            key={`status-${filter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.15, duration: 0.2 }}
            className="text-[10px] font-bold uppercase tracking-widest"
          >
            Recibida
          </motion.span>
        </div>


        {/* =========================
            GRID DE ARCHIVOS
        ========================= */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {displayProjects.map(project => {
                const isPrototype = project.status === 'Prototipo' || !project.url;
                const isInternalLink = project.url?.startsWith('#');
                return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-4"
                >

                <div className="relative group aspect-[16/10] rounded-2xl overflow-hidden glass-card">

                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>

                  <div className="scanline"></div>

                  <div className="absolute inset-0 mission-overlay flex flex-col justify-end lg:p-8 p-5">
                    <div className="mb-0 sm:mb-0 md:mb-0 lg:mb-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                      <h3 className="text-2xl font-bold uppercase tracking-tight mb-1">
                        {project.title}
                      </h3>

                      <div
                        className="
                          flex gap-2
                          overflow-hidden

                          /* Transición */
                          transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

                          /* Estado base móvil */
                          max-h-20 opacity-100 mb-4

                          /* Hover SOLO móvil */
                          group-hover:max-h-0
                          group-hover:opacity-0
                          group-hover:mb-0

                          /* Desktop reset completo */
                          md:max-h-none
                          md:opacity-100
                          md:mb-4
                          md:group-hover:max-h-none
                          md:group-hover:opacity-100
                          md:group-hover:mb-4
                        "
                      >

                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] border border-white/20 px-2 py-0.5 rounded uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-slate-300 line-clamp-3 max-w-sm mb-6 text-pretty">
                        {project.description}
                      </p>
                    </div>

                    <div
                      className="
                        flex items-center justify-between
                        shrink-0

                        /* Base móvil: colapsado real */
                        max-h-0 opacity-0 translate-y-6 overflow-hidden

                        /* Animación */
                        transition-[max-height,opacity,transform] duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]

                        /* Hover móvil */
                        group-hover:max-h-48
                        group-hover:opacity-100
                        group-hover:-translate-y-0

                        /* Desktop reset */
                        md:max-h-none
                        md:opacity-0
                        md:translate-y-6
                        md:overflow-visible

                        md:group-hover:max-h-none
                        md:group-hover:opacity-100
                        md:group-hover:translate-y-0
                      "
                    >

                      <div className="flex gap-4">
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase tracking-tighter opacity-80">
                            Estado
                          </span>
                          <div className="flex items-center lg:mt-0 md:mt-0 mt-1">
                            {/* Punto móvil */}
                            <span
                              className={`
                                block md:hidden
                                w-2.5 h-2.5 rounded-full
                                ${
                                  project.status === 'En Vivo'
                                    ? 'bg-green-400'
                                    : project.status === 'Completado'
                                    ? 'bg-blue-400'
                                    : 'bg-amber-400'
                                }
                              `}
                            ></span>

                            {/* Texto desktop */}
                            <span
                              className={`
                                hidden md:block
                                text-xs font-bold uppercase
                                ${
                                  project.status === 'En Vivo'
                                    ? 'text-green-400'
                                    : project.status === 'Completado'
                                    ? 'text-blue-400'
                                    : 'text-amber-400'
                                }
                              `}
                            >
                              {project.status}
                            </span>
                          </div>

                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase tracking-tighter opacity-90">
                            Tecnología
                          </span>
                          <span className="text-xs font-bold">
                            {project.tech}
                          </span>
                        </div>
                      </div>

                      {isPrototype ? (
                        <div
                          className="
                            h-12 w-12 rounded-lg
                            flex items-center justify-center
                            bg-white/5 border border-white/10
                            text-white/60
                            cursor-default
                            relative
                          "
                          title="Proyecto en fase de prototipo"
                        >
                          <Icon name="hourglass_top" className="text-xl" />
                        </div>
                        ) : isInternalLink ? (
                          <button
                            onClick={() => {
                              const el = document.querySelector(project.url!);
                              el?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          className="
                            bg-primary hover:bg-star-300
                            text-on-primary
                            h-12 w-12 md:w-12
                            rounded-lg
                            flex items-center justify-center
                            transition-all
                            overflow-hidden relative

                            md:group-hover:w-40
                            active:scale-95 md:active:scale-100
                          "
                            title="Volver al inicio"
                          >
                            <Icon name="public" className="text-xl md:absolute md:left-3.5" />
                            <span
                              className="
                                hidden md:block
                                ml-8 opacity-0
                                md:group-hover:opacity-100
                                transition-opacity
                                font-bold uppercase text-xs whitespace-nowrap
                              "
                            >
                              Esta Misión
                            </span>

                          </button>
                        ) : (
                          /* Antes era un <button> dentro de un <a>: HTML
                             inválido y dos controles interactivos anidados
                             para una sola acción. */
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Ver ${project.title} (se abre en una pestaña nueva)`}
                            className="
                              bg-primary hover:bg-star-300
                              text-on-primary
                              h-12 w-12 md:w-12
                              rounded-lg
                              flex items-center justify-center
                              transition-all
                              overflow-hidden relative

                              /* Desktop expansión */
                              md:group-hover:w-40
                              active:scale-95 md:active:scale-100
                            "
                          >
                            <Icon name="travel_explore" className="text-xl md:absolute md:left-3.5" />
                            <span
                              className="
                                hidden md:block
                                ml-8 opacity-0
                                md:group-hover:opacity-100
                                transition-opacity
                                font-bold uppercase text-xs whitespace-nowrap
                              "
                            >
                              Explorar Archivo
                            </span>
                          </a>
                        )}
                    </div>
                  </div>
                </div>
                </motion.div>
              )})}
            </AnimatePresence>
          </motion.div>


        {/* =========================
            BOTÓN MOSTRAR MÁS / MENOS
        ========================= */}
        {filter === 'TODOS' && (
          <div className="flex justify-center pt-12">
            {!expanded && PROJECTS.length > displayProjects.length ? (
             <button
              onClick={() => setExpanded(true)}
              className="
                glow-button glass-card
                group flex items-center gap-4
                px-10 md:px-8 py-4
                rounded-full
                border border-primary/20
                bg-background-dark/40 backdrop-blur-md
                transition-all
                hover:bg-background-dark/60 hover:scale-[1.02]"
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                Mostrar más archivos
              </span>

              <div className="
                flex items-center justify-center
                w-6 h-6
                rounded-full
                border border-primary/30
                group-hover:border-primary
                transition-colors
              ">
                <Icon name="keyboard_arrow_down" className="text-lg text-primary animate-bounce pt-1" />
              </div>
            </button>

              ) : expanded ? (
            <button
              onClick={() => setExpanded(false)}
              className="
                glow-button glass-card
                group flex items-center gap-4
                px-10 md:px-8 py-4
                rounded-full
                border border-primary/20
                bg-background-dark/40 backdrop-blur-md
                transition-all
                hover:bg-background-dark/60 hover:scale-[1.02]"
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                Mostrar menos archivos
              </span>

              <div className="
                flex items-center justify-center
                w-6 h-6
                rounded-full
                border border-primary/30
                group-hover:border-primary
                transition-colors
              ">
                <Icon name="keyboard_arrow_up" className="text-lg text-primary animate-bounce pt-1" />
              </div>
            </button>
            ) : null}
          </div>
        )}

      </div>
    </section>
  );
};

/* =========================
   Botón reutilizable filtro
========================= */

const FilterButton = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: IconName;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 cursor-pointer transition-colors
      ${
        active
          ? 'bg-primary text-on-primary'
          : 'border border-white/10 hover:border-primary/50'
      }
    `}
  >
    <Icon name={icon} className="text-lg" />
    <p
      className={`text-sm uppercase tracking-tight ${
        active ? 'font-bold' : 'font-medium opacity-70'
      }`}
    >
      {label}
    </p>
  </div>
);

export default Archivos;
