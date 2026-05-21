import type { Config } from 'tailwindcss'

/**
 * 品牌色與語意 Token — 對齊 website-planning.md §5.5
 * Nuxt UI v2：`app.config.ts` 的 `ui.primary` 設為 `brand`。
 */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './node_modules/@nuxt/ui/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#edf3f9',
          100: '#dce8f3',
          200: '#b9d1e7',
          300: '#8fb4d4',
          400: '#6a9bc6',
          500: '#5789B6',
          600: '#456FA5',
          700: '#3D5F94',
          800: '#355a86',
          900: '#2F4778',
          950: '#1e304d'
        },
        ink: '#393934',
        'accent-soft': '#89B1C5',
        'accent-teal': '#57ACAC',
        'neutral-sage': '#939D98',
        'neutral-taupe': '#898984',
        'navy-deep': '#2F4778',
        surface: '#FFFFFF',
        'surface-muted': '#F5F6F4'
      }
    }
  }
} satisfies Config
