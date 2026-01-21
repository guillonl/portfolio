import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'selector',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['0.875rem', { lineHeight: '1.6' }],
        sm: ['0.8125rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        container: '550px',
      },
      colors: {
        background: 'var(--color-bg)',
        foreground: 'var(--color-text)',
        muted: 'var(--color-text-secondary)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        ui: 'var(--color-ui)',
        ux: 'var(--color-ux)',
        code: 'var(--color-code)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-text)',
            '--tw-prose-headings': 'var(--color-text)',
            '--tw-prose-links': 'var(--color-accent)',
            fontSize: '0.875rem',
            lineHeight: '1.6',
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
