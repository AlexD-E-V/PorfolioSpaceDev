import { useState, useEffect, useMemo } from "react";
import { Icon } from "./ui/Icon";
import { CONTACT_EMAIL, CONTACT_ENDPOINT } from "../data/site";

/* El compositor es la mejor idea del HTML de referencia: el visitante arma su
   propia frase con dos filas de chips y de paso queda calificado antes de
   escribir nada. Sustituye a la rejilla de "Selección de Tipo de Misión".

   La narrativa de la estrella vive aquí como MECÁNICA, no como etiqueta: se
   pide algo y se construye, sin que la página tenga que decir la palabra.
   Ver docs/MIZARIUM.md §4. */

type MissionType = "web" | "gaming" | "apps" | "arvr" | "other";

const KINDS: { id: string; label: string; phrase: string; mission: MissionType }[] = [
  { id: "web", label: "una página web", phrase: "una página web", mission: "web" },
  { id: "shop", label: "una tienda online", phrase: "una tienda online", mission: "web" },
  { id: "app", label: "una app", phrase: "una app", mission: "apps" },
  { id: "game", label: "un videojuego", phrase: "un videojuego", mission: "gaming" },
  { id: "xr", label: "algo en VR/AR", phrase: "una experiencia en VR/AR", mission: "arvr" },
  { id: "other", label: "otra cosa", phrase: "algo que aún no tiene nombre", mission: "other" },
];

const GOALS = [
  { id: "vender", label: "vender más", phrase: "vender más" },
  { id: "lanzar", label: "lanzar pronto", phrase: "lanzarlo cuanto antes" },
  { id: "renovar", label: "renovar mi marca", phrase: "renovar mi marca" },
];

export default function ContactForm() {
  const [kind, setKind] = useState(KINDS[0]);
  const [goal, setGoal] = useState(GOALS[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showForm, setShowForm] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const sentence = useMemo(() => `Quiero ${kind.phrase} para ${goal.phrase}.`, [kind, goal]);

  useEffect(() => {
    if (status !== "sent") return;
    const timer = setTimeout(() => setShowForm(false), 500);
    return () => clearTimeout(timer);
  }, [status]);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const newErrors: typeof errors = {};
    if (name.length < 2) newErrors.name = "Escribe al menos 2 caracteres";
    if (!email.includes("@")) newErrors.email = "Revisa el email";
    if (message.length < 10) newErrors.message = "Cuéntanos un poco más (mínimo 10 caracteres)";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch(CONTACT_ENDPOINT, { method: "POST", body: formData });

      /* Se comprueba el JSON y no solo `res.ok`. En desarrollo `astro dev` no
         ejecuta PHP: sirve el archivo como texto plano y devolvería un 200
         con el código fuente dentro. Exigir `ok === true` hace que ese caso
         caiga en el estado de error, que es lo correcto. */
      const data = await res.json().catch(() => null);
      if (!res.ok || data?.ok !== true) throw new Error(data?.mensaje ?? "Error");

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2.5 text-sm transition-all duration-200 ${
      active
        ? "border-primary bg-primary/15 font-bold text-star-300"
        : "border-ink-600 bg-white/[0.03] font-medium text-slate-400 hover:border-ink-400 hover:text-ink-50"
    }`;

  return (
    <div className="relative">
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className={`transition-all duration-500 ease-out ${
            status === "sent"
              ? "pointer-events-none scale-[0.98] opacity-0 blur-sm"
              : "scale-100 opacity-100 blur-0"
          }`}
        >
          {/* Honeypot anti-spam */}
          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
          >
            <label>
              No completar este campo
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <input type="hidden" name="mission_type" value={kind.mission} />
          <input type="hidden" name="goal" value={goal.phrase} />

          <div className="glass-panel relative overflow-hidden rounded-2xl">
            <div className="scanline"></div>

            <div className="space-y-12 p-7 md:p-10">

              {/* ── Compositor ────────────────────────────────────── */}
              <section className="text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Quiero…
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                  {KINDS.map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => setKind(k)}
                      aria-pressed={kind.id === k.id}
                      className={chip(kind.id === k.id)}
                    >
                      {k.label}
                    </button>
                  ))}
                </div>

                <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  …para
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGoal(g)}
                      aria-pressed={goal.id === g.id}
                      className={chip(goal.id === g.id)}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>

                <p
                  className="mx-auto mt-9 max-w-[26ch] text-2xl italic leading-tight text-star-300 md:text-3xl"
                  aria-live="polite"
                >
                  «{sentence}»
                </p>
              </section>

              {/* ── Quién eres ────────────────────────────────────── */}
              <section>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-[9px] text-primary">
                    01
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                    Quién eres
                  </h3>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-xs uppercase tracking-widest text-white/60 group-focus-within:text-primary"
                    >
                      Tu nombre
                    </label>
                    <div className="glow-input flex items-center rounded-lg bg-white/5 px-4">
                      <Icon name="person" className="mr-3 text-xs text-white/40" />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        placeholder="Nombre y apellido"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        onChange={() => errors.name && setErrors((e) => ({ ...e, name: undefined }))}
                        className="w-full border-none bg-transparent px-0 py-3 font-light text-white outline-none ring-0 placeholder:text-white/55 focus:outline-none focus:ring-0"
                      />
                    </div>
                    {errors.name && (
                      <p
                        id="err-name"
                        role="alert"
                        className="mt-2 flex items-center gap-1 text-[11px] uppercase tracking-widest text-red-400"
                      >
                        <Icon name="error" className="text-xs" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-xs uppercase tracking-widest text-white/60 group-focus-within:text-primary"
                    >
                      Tu email
                    </label>
                    <div className="glow-input flex items-center rounded-lg bg-white/5 px-4">
                      <Icon name="alternate_email" className="mr-3 text-xs text-white/40" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder="nombre@empresa.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "err-email" : undefined}
                        onChange={() => errors.email && setErrors((e) => ({ ...e, email: undefined }))}
                        className="w-full border-none bg-transparent px-0 py-3 font-light text-white outline-none ring-0 placeholder:text-white/55 focus:outline-none focus:ring-0"
                      />
                    </div>
                    {errors.email && (
                      <p
                        id="err-email"
                        role="alert"
                        className="mt-2 flex items-center gap-1 text-[11px] uppercase tracking-widest text-red-400"
                      >
                        <Icon name="error" className="text-xs" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* ── El proyecto ───────────────────────────────────── */}
              <section>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-[9px] text-primary">
                    02
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                    Cuéntanos
                  </h3>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>

                <label htmlFor="message" className="sr-only">
                  Detalles del proyecto
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="¿Qué necesitas? Si tienes plazo, presupuesto aproximado o referencias que te gusten, cuéntanoslo aquí."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-message" : undefined}
                  onChange={() => errors.message && setErrors((e) => ({ ...e, message: undefined }))}
                  className="glow-border-primary h-32 w-full rounded-xl bg-white/5 p-5 font-light leading-relaxed text-white placeholder:text-white/55"
                />
                {errors.message && (
                  <p
                    id="err-message"
                    role="alert"
                    className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-widest text-red-400"
                  >
                    <Icon name="report" className="text-sm" />
                    {errors.message}
                  </p>
                )}
              </section>

              {/* ── Envío ─────────────────────────────────────────── */}
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`group flex flex-col items-center gap-3 transition-transform ${
                    status === "sending" ? "animate-pulse opacity-70" : "hover:scale-[1.03]"
                  }`}
                >
                  <span className="glow-cyan flex h-14 items-center justify-center gap-2.5 rounded-full bg-primary px-10 text-base font-black uppercase tracking-[0.2em] text-on-primary transition-colors group-hover:bg-star-300">
                    {status === "sending" ? "Enviando…" : "Enviar"}
                    <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                    Respondemos en menos de 24 h
                  </span>
                </button>

                {/* Antes, si el envío fallaba se ponía status="error" y no se
                    pintaba nada: el visitante creía que se había enviado. */}
                {status === "error" && (
                  <div
                    role="alert"
                    className="animate-fade-in mt-6 w-full max-w-md rounded-xl border border-red-400/40 bg-red-400/5 p-4 text-center"
                  >
                    <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-red-400">
                      <Icon name="report" className="text-sm" />
                      No se pudo enviar
                    </p>
                    <p className="mt-2 text-sm font-light leading-relaxed text-white/70">
                      Inténtalo de nuevo en un momento, o escríbenos directamente a{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
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

      {status === "sent" && (
        <div className="glass-panel relative overflow-hidden rounded-2xl">
          <div className="scanline opacity-60"></div>
          <div className="space-y-4 p-14 text-center">
            <Icon
              name="check_circle"
              className="animate-[pulse_3s_ease-in-out_infinite] text-[4.5rem] text-primary drop-shadow-glow-lg"
            />
            <h3 className="text-lg font-bold uppercase tracking-[0.28em] text-primary">
              Mensaje recibido
            </h3>
            <p className="text-base text-white/70">
              Ya lo estamos mirando. Te respondemos en menos de 24 h.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
