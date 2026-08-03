import { ICON_PATHS, ICON_VIEWBOX, type IconName } from '../../data/icons';

/* Versión React de Icon.astro. Misma API, mismo tamaño 1em, mismo
   fill-current. Ver el comentario de Icon.astro. */

interface IconProps {
  name: IconName;
  className?: string;
  label?: string;
}

export function Icon({ name, className = '', label }: IconProps) {
  return (
    <svg
      className={`inline-block h-[1em] w-[1em] shrink-0 fill-current ${className}`}
      viewBox={ICON_VIEWBOX}
      style={{ verticalAlign: '-0.125em' }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {ICON_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export default Icon;
