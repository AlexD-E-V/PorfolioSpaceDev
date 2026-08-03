import { useState } from "react";
import { Icon } from './ui/Icon';
import { CONTACT_EMAIL } from '../data/site';

const EMAIL = CONTACT_EMAIL;

export default function DirectLink() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("No se pudo copiar el email", error);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-xl border border-white/5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Icon name="sensors" className="text-primary text-sm" />
        <h5 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
          Enlace Directo
        </h5>
      </div>

      {/* Content */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-light text-white/70 mb-1">
            {EMAIL}
          </p>
          <p className="text-[9px] uppercase tracking-widest text-white/55">
            Canal de transmisión principal
          </p>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar email"
          className="group size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all"
        >
          <Icon name="content_copy" className="text-sm text-white/60 group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Feedback */}
      <p
        className={`mt-3 text-[9px] uppercase tracking-widest text-primary transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Transmisión copiada
      </p>
    </div>
  );
}
