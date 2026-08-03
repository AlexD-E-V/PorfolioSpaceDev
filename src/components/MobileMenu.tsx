import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { id: "manifiesto", label: "Manifiesto" },
    { id: "servicios", label: "Servicios" },
    { id: "archivos", label: "Archivos" },
    { id: "tripulacion", label: "Tripulación" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      {/* BOTÓN */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-[70] group"
        aria-label="Abrir menú"
      >
        <div
          className={`relative flex items-center justify-center w-10 h-10 
          rounded-full transition-all duration-300
          ${isOpen ? "ring-4 ring-primary/40" : "hover:ring-4 hover:ring-primary/20"}
          `}
        >
          <div
            className={`flex flex-col justify-around items-center w-5 h-5 transform
            transition-all duration-300 origin-center overflow-hidden
            ${isOpen ? "-translate-x-0.5 rotate-180" : ""}
            `}
          >
            {/* Línea 1 */}
            <span
              className={`h-[2px] w-5 bg-white transform transition-all duration-300 origin-left
              ${isOpen ? "rotate-45 w-10/12" : ""}
              `}
            />

            {/* Línea 2 */}
            <span
              className={`h-[2px] w-5 bg-white transform transition-all duration-300
              ${isOpen ? "translate-x-10 opacity-0" : ""}
              `}
            />

            {/* Línea 3 */}
            <span
              className={`h-[2px] w-5 bg-white transform transition-all duration-300 origin-left
              ${isOpen ? "-rotate-45 w-10/12" : ""}
              `}
            />
          </div>
        </div>
      </button>

      {/* PORTAL REAL AL BODY */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[999] transition-opacity duration-300 ${
              isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* OVERLAY */}
            <div
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />

            {/* SIDEBAR */}
            <aside
              className={`fixed top-0 right-0 bottom-0 w-64
              bg-background-dark/95
              border-l border-primary/20
              shadow-glow-panel
              transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isOpen ? "translate-x-0" : "translate-x-full"}
              `}
            >
              <nav className="flex flex-col h-full p-5 text-lg font-medium">
                <div className="mt-20 flex flex-col gap-3">

                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={() => {
                        setActive(link.id);
                        setIsOpen(false);
                      }}
                      className={`
                        relative px-4 py-3 rounded-lg
                        transition-all duration-300
                        ${
                          active === link.id
                            ? "bg-primary/15 text-primary shadow-glow-md"
                            : "hover:bg-white/5 hover:text-primary"
                        }
                      `}
                    >
                      {link.label}
                    </a>
                  ))}

                  {/* CTA */}
                  <a
                    href="#contacto"
                    onClick={() => {
                      setActive("contacto");
                      setIsOpen(false);
                    }}
                    className="mt-4 bg-primary text-background-dark px-0 py-3 rounded-lg font-bold text-center hover:scale-[1.02] transition-all duration-300"
                  >
                    Contáctanos
                  </a>

                </div>
              </nav>
            </aside>

            {/* BOTÓN SOBRE EL SIDEBAR */}
            <button
              onClick={toggleMenu}
              className={`md:hidden fixed top-6 transition-all duration-300 z-[1000] group
                ${isOpen ? "right-[19rem]" : "right-6"}
                `}
              aria-label="Abrir menú"
            >
              <div
                className={`relative flex items-center justify-center w-10 h-10 
                rounded-full transition-all duration-300
                ${isOpen ? "ring-4 ring-primary/40" : "hover:ring-4 hover:ring-primary/20"}
                `}
              >
                <div
                  className={`flex flex-col justify-around items-center w-5 h-5 transform
                  transition-all duration-300 origin-center overflow-hidden
                  ${isOpen ? "-translate-x-0.5 rotate-180" : ""}
                  `}
                >
                  {/* Línea 1 */}
                  <span
                    className={`h-[2px] w-5 bg-white transform transition-all duration-300 origin-left
                    ${isOpen ? "rotate-45 w-10/12" : ""}
                    `}
                  />

                  {/* Línea 2 */}
                  <span
                    className={`h-[2px] w-5 bg-white transform transition-all duration-300
                    ${isOpen ? "translate-x-10 opacity-0" : ""}
                    `}
                  />

                  {/* Línea 3 */}
                  <span
                    className={`h-[2px] w-5 bg-white transform transition-all duration-300 origin-left
                    ${isOpen ? "-rotate-45 w-10/12" : ""}
                    `}
                  />
                </div>
              </div>
            </button>

          </div>,
          document.body
        )}
    </>
  );
}

