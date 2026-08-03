/** @type {import('tailwindcss').Config} */

/* Todo el color sale de src/styles/tokens.css. No añadir hex aquí. */
const brand = (v) => `rgb(var(${v}) / <alpha-value>)`;
const glow = (blur, alpha) => `0 0 ${blur} rgb(var(--brand) / ${alpha})`;

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			keyframes: {
				scan: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},

				distort: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-2px)' },
				},

				contact: {
					'0%':   { opacity: '0', transform: 'scale(0.8)' },

					/* aparición */
					'10%':  { opacity: '1', transform: 'scale(1.2)' },
					'20%':  { opacity: '0.6', transform: 'scale(1)' },

					/* destello 2 */
					'30%':  { opacity: '1', transform: 'scale(1.3)' },
					'40%':  { opacity: '0.7', transform: 'scale(1)' },

					/* destello 3 */
					'50%':  { opacity: '1', transform: 'scale(1.4)' },
					'60%':  { opacity: '0.8', transform: 'scale(1)' },

					/* desaparición */
					'75%':  { opacity: '0', transform: 'scale(0.6)' },
					'100%': { opacity: '0', transform: 'scale(0.6)' },
				},

				glitch: {
					'0%':   { transform: 'translateY(0)' },
					'50%':  { transform: 'translateY(-6px)' },
					'100%': { transform: 'translateY(0)' },
				},

				'fade-in': {
					from: { opacity: '0', transform: 'translateY(4px)' },
					to:   { opacity: '1', transform: 'none' },
				},
			},

			animation: {
				contact: 'contact 7s ease-in-out infinite',
				glitch: 'glitch 0.35s steps(2) infinite alternate-reverse',
				'fade-in': 'fade-in 0.3s ease-out both',
			},

			colors: {
				primary: brand('--brand'),
				secondary: brand('--accent'),
				'cosmic-violet': brand('--accent'),

				background: {
					light: '#f5f8f8',
					dark: brand('--bg'),
				},

				glass: 'rgb(var(--surface) / 0.6)',
				'deep-navy': brand('--bg-deep'),

				/* Rampa Mizarium — disponible para la fase 2 */
				star: {
					100: brand('--star-100'),
					300: brand('--star-300'),
					500: brand('--star-500'),
					600: brand('--star-600'),
					800: brand('--star-800'),
				},
				cosmic: {
					cyan: brand('--cosmic-cyan'),
					violet: brand('--cosmic-violet'),
				},
				ink: {
					950: brand('--ink-950'),
					900: brand('--ink-900'),
					800: brand('--ink-800'),
					700: brand('--ink-700'),
					600: brand('--ink-600'),
					400: brand('--ink-400'),
					200: brand('--ink-200'),
					50: brand('--ink-50'),
				},
			},

			fontFamily: {
				sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
				mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
			},

			fontSize: {
				/* Usado por la navegación del header. Antes era `text-md`,
				   que no existe en Tailwind y no emitía ninguna regla. */
				md: ['1rem', { lineHeight: '1.5rem' }],
			},

			borderRadius: {
				DEFAULT: '0.5rem',
				lg: '1rem',
				xl: '1.5rem',
				full: '9999px',
			},

			/* Resplandor de marca. Sustituye a los rgba() arbitrarios que
			   estaban repartidos por los componentes. */
			boxShadow: {
				'glow-sm': glow('15px', 0.3),
				'glow-md': glow('20px', 0.15),
				'glow-lg': glow('30px', 0.2),
				'glow-xl': glow('35px', 0.25),
				'glow-card': glow('30px', 0.15),
				'glow-panel': glow('60px', 0.25),
			},

			dropShadow: {
				'glow-xs': glow('2px', 0.3),
				'glow-sm': glow('8px', 0.8),
				'glow-lg': glow('25px', 0.6),
			},

			zIndex: {
				60: '60',
				70: '70',
			},
		},
	},
	plugins: [],
}
