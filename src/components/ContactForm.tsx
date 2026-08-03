import { useState, useEffect } from "react";
import { actions } from "astro:actions";
import { Icon } from './ui/Icon';
import type { IconName } from '../data/icons';
import { CONTACT_EMAIL } from '../data/site';

const MISSION_TYPES: { id: string; label: string; icon: IconName }[] = [
  { id: "web", label: "Desarrollo Web", icon: "language" },
  { id: "gaming", label: "Gaming", icon: "videogame_asset" },
  { id: "apps", label: "Mobile Apps", icon: "vibration" },
  { id: "arvr", label: "AR / VR", icon: "view_in_ar" },
  { id: "other", label: "Otros", icon: "settings_suggest" },
];


export default function ContactForm() {
  const [missionType, setMissionType] = useState("web");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showForm, setShowForm] = useState(true);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  useEffect(() => {
    if (status !== "sent") return;

    const timer = setTimeout(() => {
      setShowForm(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [status]);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const newErrors: typeof errors = {};

    if (name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!email.includes("@")) {
      newErrors.email = "Frecuencia inválida. Revisa el email";
    }

    if (message.length < 10) {
      newErrors.message = "Describe la misión con al menos 10 caracteres";
    }

    // 🚫 Si hay errores, NO se envía
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Todo OK → seguimos flujo normal
    setErrors({});
    setStatus("sending");

    try {
    const { error } = await actions.submitContact(formData);

    if (error) throw new Error(error.message);

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }


  return (
    <div className="relative">
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className={`
            transition-all duration-500 ease-out
            ${status === "sent"
              ? "opacity-0 scale-[0.98] blur-sm pointer-events-none"
              : "opacity-100 scale-100 blur-0"}
          `}
        >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label>
            No completar este campo
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div className="glass-panel rounded-2xl relative overflow-hidden">
          <div className="scanline"></div>

          <div className="p-8 md:p-10 space-y-16">
            {/* ===================== SECCIÓN 01 ===================== */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="size-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-[9px] opacity-40 border border-primary/20">
                  01
                </span>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">
                  Identidad del Nuevo Comandante
                </h3>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="group relative">
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-4 group-focus-within:text-primary transition-colors">
                    Nombre del Explorador
                  </label>
                  <div className="glow-input bg-white/5 rounded-lg flex items-center px-4">
                    <Icon name="person" className="text-white/20 text-xs mr-3" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Nombre completo"
                      className="w-full bg-transparent border-none py-3 px-0 text-white font-light placeholder:text-white/30 focus:outline-none focus-visible:outline-none
                        outline-none ring-0 focus:ring-0"
                      onChange={() =>
                        errors.name && setErrors((e) => ({ ...e, name: undefined }))
                      }
                    />
                  </div>
                    {errors.name && (
                      <p className="mt-2 text-[10px] uppercase tracking-widest text-red-400 flex items-center gap-1">
                        <Icon name="error" className="text-xs" />
                        {errors.name}
                      </p>
                    )}
                </div>

                {/* Email */}
                <div className="group relative">
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-4 group-focus-within:text-primary transition-colors">
                    Frecuencia de Enlace (Email)
                  </label>
                  <div className="glow-input bg-white/5 rounded-lg flex items-center px-4">
                    <Icon name="alternate_email" className="text-white/20 text-xs mr-3" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="comandante@nave.space"
                      className="w-full bg-transparent border-none py-3 px-0 text-white font-light placeholder:text-white/30 focus:outline-none focus-visible:outline-none
                        outline-none ring-0 focus:ring-0"
                      onChange={() =>
                        errors.email && setErrors((e) => ({ ...e, email: undefined }))
                      }
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-[10px] uppercase tracking-widest text-red-400 flex items-center gap-1">
                      <Icon name="error" className="text-xs" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* ===================== SECCIÓN 02 ===================== */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="size-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-[9px] opacity-40 border border-primary/20">
                  02
                </span>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">
                  Selección de Tipo de Misión
                </h3>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {MISSION_TYPES.map((mission) => (
                  <label key={mission.id} className="cursor-pointer group">
                    <input
                      type="radio"
                      name="mission_type"
                      value={mission.id}
                      checked={missionType === mission.id}
                      onChange={() => setMissionType(mission.id)}
                      required
                      className="hidden"
                    />

                    <div
                      className={`mission-type-card flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all text-center h-full ${
                        missionType === mission.id
                          ? "border-primary bg-primary/10"
                          : "border-white/10 bg-white/5 hover:border-primary/50"
                      }`}
                    >
                      <Icon name={mission.icon} className="text-3xl text-white/40 group-hover:text-primary" />
                      <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                        {mission.label}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* ===================== SECCIÓN 03 ===================== */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="size-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-[9px] opacity-40 border border-primary/20">
                  03
                </span>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">
                  Objetivos de la Misión
                </h3>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  required
                  placeholder="Describe tu proyecto, objetivos y cualquier detalle"
                  className="w-full bg-white/5 glow-border-primary rounded-xl p-5 text-white font-light leading-relaxed placeholder:text-white/30 text-base h-32"
                  onChange={() =>
                    errors.message && setErrors((e) => ({ ...e, message: undefined }))
                  }
                />

                {/* Terminal de Entrada de Datos */}
                <div className="absolute -top-3 right-6 bg-background-dark border border-primary/50 px-3 py-1 rounded-full flex items-center gap-2">
                  <span className="size-1.5 bg-primary animate-pulse rounded-full"></span>
                  <span className="text-[9px] uppercase tracking-widest text-primary font-bold">
                    Terminal de Entrada de Datos
                  </span>
                </div>

                {errors.message && (
                  <p className="mt-3 text-[11px] uppercase tracking-widest text-red-400 flex items-center gap-2 animate-fade-in">
                    <Icon name="report" className="text-sm" />
                    {errors.message}
                  </p>
                )}

              </div>
            </section>

            {/* ===================== ENVÍO ===================== */}
            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className={`
                  group relative flex flex-col items-center gap-3
                  transition-transform
                  ${status === "sending" ? "opacity-70 animate-pulse" : "hover:scale-105"}
                `}
              >
                <div className="relative h-14 flex items-center justify-center overflow-hidden rounded-xl bg-primary text-background-dark font-black uppercase tracking-[0.4em] glow-cyan px-10">
                  <span className="relative z-10 flex items-center gap-1">
                    {status === "sending" ? "Transmitiendo…" : "Lanzar Misión"}
                    <Icon name="rocket_launch" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#a5f3fc] to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Confirmar secuencia de transmisión
                </p>
              </button>

              {/* Antes, si Resend fallaba, se ponía status="error" y no se
                  pintaba nada: el visitante se quedaba mirando el formulario
                  intacto creyendo que se había enviado. */}
              {status === "error" && (
                <div
                  role="alert"
                  className="mt-6 w-full max-w-md animate-fade-in rounded-xl border border-red-400/40 bg-red-400/5 p-4 text-center"
                >
                  <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-red-400">
                    <Icon name="report" className="text-sm" />
                    La transmisión no salió
                  </p>
                  <p className="mt-2 text-sm font-light leading-relaxed text-white/70">
                    No pudimos enviar tu mensaje. Inténtalo de nuevo en un
                    momento o escríbenos directamente a{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-primary underline underline-offset-2"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
      )}

      {/* PANEL DE ÉXITO */}
      {status === "sent" && (
        <div
          className={`
            flex justify-center mt-16
            transition-all duration-500 ease-out
            ${status === "sent"
              ? "opacity-100 scale-100 translate-y-0 delay-150"
              : "opacity-0 scale-[0.95] translate-y-4 pointer-events-none"}
          `}
        >
          <div className="glass-panel rounded-2xl relative overflow-hidden w-full">
            <div className="scanline opacity-60"></div>

            <div className="p-16 text-center space-y-4">
              <Icon
                name="check_circle"
                className={`
                  text-[4.5rem] text-primary
                  drop-shadow-glow-lg
                  transition-all duration-700 ease-out
                  ${status === "sent"
                    ? "scale-100 opacity-100 animate-[pulse_3s_ease-in-out_infinite]"
                    : "scale-0 opacity-0"}
                `}
              />

              <h3 className="text-lg font-bold uppercase tracking-[0.3em] text-primary transition-opacity duration-500 delay-200">
                Misión recibida
              </h3>

              <p className="text-base uppercase tracking-widest text-white/60 transition-opacity duration-500 delay-300">
                La transmisión fue exitosa. Pronto nos pondremos en contacto.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
