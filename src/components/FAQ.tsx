import React, { useState } from 'react';
import { Icon } from './ui/Icon';

interface FAQItem {
  question: string;
  answer: string;
  id: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Cómo iniciamos un proyecto en Space DEV?',
    answer:
      'El proceso comienza con una reunión inicial donde analizamos tus objetivos, necesidades y alcance del proyecto. A partir de ahí definimos una propuesta clara y, una vez aprobada, iniciamos el desarrollo con un primer entregable funcional en poco tiempo.'
  },
  {
    id: 'faq-2',
    question: '¿Qué tecnologías utilizan para desarrollar los proyectos?',
    answer:
      'Trabajamos con tecnologías modernas y estables como Unity, React, Flutter, Astro, Wordpress, etc. Elegimos cada herramienta según lo que tu proyecto realmente necesita, priorizando rendimiento, escalabilidad y facilidad de mantenimiento.'
  },
  {
    id: 'faq-3',
    question: '¿Cuánto tiempo toma desarrollar un proyecto?',
    answer:
      'El tiempo depende de la complejidad y el alcance. Proyectos pequeños pueden completarse en pocas semanas, mientras que desarrollos más grandes se organizan por fases con entregas progresivas y tiempos definidos desde el inicio.'
  },
  {
    id: 'faq-4',
    question: '¿Ofrecen soporte después de lanzar el proyecto?',
    answer:
      'Sí. Incluimos un periodo de soporte posterior al lanzamiento para asegurar que todo funcione correctamente. También ofrecemos planes de mantenimiento y evolución para acompañar el crecimiento de tu proyecto.'
  },
  {
    id: 'faq-5',
    question: '¿Cómo se define el costo de un proyecto?',
    answer:
      'El presupuesto se calcula según el alcance, la complejidad y el tiempo estimado de desarrollo. Trabajamos con propuestas claras y modulares para que tengas control total sobre la inversión y puedas escalar el proyecto cuando lo necesites.'
  }
];

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto space-y-14">

        {/* Header */}
        <div className="text-center">
          <span className="text-primary text-xs font-bold tracking-[0.4em] opacity-80 block mb-6">
            CENTRO DE COMANDO
          </span>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            CONSULTAS DE <span className="text-cosmic">SOPORTE</span>
          </h2>

          <div className="hud-line h-px w-32 mx-auto my-5"></div>

          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Resolviendo las incógnitas más frecuentes antes del despegue.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
                key={faq.id}
                className={`glass-panel rounded-2xl overflow-hidden transition-all duration-500
                    group
                    ${
                    openId === faq.id
                        ? 'border-primary/50 shadow-glow-card'
                        : 'border-white/10 hover:border-primary/30 hover:-translate-y-[2px]'
                    }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors duration-300 group-hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-6">
                    <span
                        className={`text-primary text-xs font-mono transition-all duration-300
                            ${
                            openId === faq.id
                                ? 'opacity-100'
                                : 'opacity-50 group-hover:opacity-80'
                            }`}
                        >
                        SYS-{String(index + 1).padStart(2, '0')}
                    </span>

                  <h3 className="text-lg md:text-xl font-bold tracking-tight">
                    {faq.question}
                  </h3>
                </div>

                <Icon
                  name="expand_more"
                  className={`
                    transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${
                    openId === faq.id
                        ? 'rotate-180 text-primary'
                        : 'text-white/60 group-hover:text-primary/70'
                    }`}
                />

              </button>

              <div
                className={`transition-all duration-500 ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-8 flex gap-6">
                  <div className="w-px bg-gradient-to-b from-primary/80 to-transparent shrink-0"></div>

                  <p className="text-white/80 text-base leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="pt-12 text-center">
            <p className="text-[11px] text-white/60 tracking-[0.3em] uppercase mb-3">
                ¿Listo para dar el siguiente paso?
            </p>

            <a
                href="#contacto"
                className="inline-flex items-center gap-3 text-primary text-sm font-bold tracking-[0.2em] uppercase group transition-all
"
            >
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white
">
                Establecer conexión
                </span>

                <Icon name="arrow_forward" className="transition-transform duration-300 group-hover:translate-x-2" />
            </a>
        </div>

      </div>
    </section>
  );
};
