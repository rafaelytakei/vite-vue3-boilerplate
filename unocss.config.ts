import { defineConfig, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#119975',
      hoverprimary: '#0e3ba5',
      dark: '#02355e',
      light: '#c1e3ff',
      secondary: '#82c7ff',
    },
    breakpoints: {
      sm: '639px',
      md: '767px',
      lg: '1023px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  safelist: ['hidden'],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'Roboto',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
