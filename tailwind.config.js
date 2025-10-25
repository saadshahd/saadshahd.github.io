/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D97706', // amber-600 - Pyramid gold
          light: '#F59E0B',   // amber-500
          dark: '#B45309',    // amber-700
        },
        secondary: {
          DEFAULT: '#2563EB', // blue-600 - Sea blue
          light: '#3B82F6',   // blue-500
          dark: '#1E40AF',    // blue-700
        },
        accent: {
          DEFAULT: '#22D3EE', // cyan-400 - Sky cyan
          light: '#67E8F9',   // cyan-300
          dark: '#06B6D4',    // cyan-500
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.slate.700'),
            '--tw-prose-headings': theme('colors.slate.900'),
            '--tw-prose-links': theme('colors.secondary.DEFAULT'),
            '--tw-prose-bold': theme('colors.slate.900'),
            '--tw-prose-code': theme('colors.primary.dark'),
            '--tw-prose-pre-bg': theme('colors.slate.50'),
            '--tw-prose-quotes': theme('colors.slate.700'),
            'max-width': 'none',
            a: {
              fontWeight: '500',
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.secondary.light')}`,
              '&:hover': {
                color: theme('colors.accent.DEFAULT'),
                borderColor: theme('colors.accent.DEFAULT'),
              },
            },
            code: {
              color: theme('colors.primary.dark'),
              backgroundColor: theme('colors.amber.50'),
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
