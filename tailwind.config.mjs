import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E4C3A',
          dark: '#082C22',
        },
        accent: {
          DEFAULT: '#C5873C',
          light: '#E5B77A',
        },
        cream: '#F7EFDE',
        light: {
          DEFAULT: '#EAF3EE',
          tint: '#F4F9F6',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          soft: '#3A3A3A',
        },
        grey: '#6C6C6C',
        rule: '#E5E5E5',
      },
      fontFamily: {
        serif: ['Fraunces Variable', 'Georgia', 'serif'],
        sans: ['Manrope Variable', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '780px',
        'prose-wide': '880px',
        content: '1240px',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.DEFAULT'),
            '--tw-prose-headings': theme('colors.primary.DEFAULT'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.ink.DEFAULT'),
            '--tw-prose-counters': theme('colors.accent.DEFAULT'),
            '--tw-prose-bullets': theme('colors.accent.DEFAULT'),
            '--tw-prose-hr': theme('colors.rule'),
            '--tw-prose-quotes': theme('colors.ink.soft'),
            '--tw-prose-quote-borders': theme('colors.accent.DEFAULT'),
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: '1rem',
            lineHeight: '1.7',
          },
        },
      }),
    },
  },
  plugins: [typographyPlugin],
};
