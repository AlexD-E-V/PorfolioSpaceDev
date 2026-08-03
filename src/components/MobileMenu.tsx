import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { NAV_LINKS, CTA_HREF } from "../data/nav";
import { Icon } from "./ui/Icon";

/* Reescrito. El anterior tenía cuatro problemas:
     · dos botones hamburguesa idénticos renderizados a la vez, ambos con
       aria-label "Abrir menú" incluso con el menú abierto
     · sin aria-expanded ni aria-controls
     · no cerraba con Escape
     · el panel cerrado seguía en el DOM sin `inert`, así que se podía tabular
       hasta sus enlaces invisibles

   Ahora son dos botones con papeles distintos —abrir en la barra, cerrar
   dentro del panel—, que es lo correcto, y no dos copias del mismo. */

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (!isOpen) return;

    /* Al abrir, el foco entra al panel. */
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  /* Al cerrar, el foco vuelve al botón que lo abrió. */
  const close = () => {
    setIsOpen(false);
    openerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex size-10 items-center justify-center rounded-full transition-all duration-300 hover:ring-4 hover:ring-primary/20 md:hidden"
        aria-label="Abrir menú"
        aria-expanded={isOpen}
        aria-controls="menu-movil"
      >
        <span className="flex h-4 w-5 flex-col justify-between" aria-hidden="true">
          <span className="h-[2px] w-full bg-current" />
          <span className="h-[2px] w-full bg-current" />
          <span className="h-[2px] w-full bg-current" />
        </span>
      </button>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[999] transition-opacity duration-300 md:hidden ${
              isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              onClick={close}
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              aria-hidden="true"
            />

            <aside
              id="menu-movil"
              ref={panelRef}
              inert={!isOpen}
              aria-label="Menú"
              className={`fixed bottom-0 right-0 top-0 flex w-72 flex-col border-l border-primary/20 bg-ink-950/95 shadow-glow-panel transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-end p-5">
                <button
                  type="button"
                  onClick={close}
                  className="flex size-10 items-center justify-center rounded-full text-ink-200 transition-colors hover:text-primary"
                  aria-label="Cerrar menú"
                >
                  <Icon name="expand_more" className="rotate-90 text-2xl" />
                </button>
              </div>

              <nav className="flex flex-col gap-2 px-5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={close}
                    className="rounded-lg px-4 py-3 text-lg font-medium transition-all duration-300 hover:bg-white/5 hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href={CTA_HREF}
                  onClick={close}
                  className="mt-4 rounded-full bg-primary px-4 py-3 text-center font-bold text-on-primary transition-all duration-300 hover:bg-star-300"
                >
                  Empezar un proyecto
                </a>
              </nav>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
}
