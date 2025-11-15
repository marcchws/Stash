/**
 * Design System Configuration
 *
 * Este arquivo centraliza todos os tokens de design do projeto.
 * Gerado automaticamente pelo comando /design:init
 *
 * Projeto: Stash
 * Paleta: Blue (confiável)
 * Tipografia: Poppins
 * Estilo: Bold & Vibrant
 */

export const theme = {
  colors: {
    primary: {
      main: '#2563eb',      // Blue 600
      light: '#60a5fa',     // Blue 400
      dark: '#1e40af',      // Blue 700
    },
    secondary: {
      main: '#64748b',      // Slate 500
      light: '#94a3b8',     // Slate 400
      dark: '#475569',      // Slate 600
    },
    accent: {
      main: '#0ea5e9',      // Sky 500
      light: '#38bdf8',     // Sky 400
      dark: '#0284c7',      // Sky 600
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    semantic: {
      success: '#10b981',   // Green 500
      warning: '#f59e0b',   // Amber 500
      error: '#ef4444',     // Red 500
      info: '#3b82f6',      // Blue 500
    },
  },
  typography: {
    fontFamily: {
      primary: 'Poppins, sans-serif',
      mono: 'Fira Code, Consolas, Monaco, monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  maxWidth: {
    // Containers de conteúdo
    prose: '65ch',        // ~65 caracteres (ideal para leitura)
    '2xl': '42rem',       // 672px (formulários, textos médios)
    '3xl': '48rem',       // 768px
    '4xl': '56rem',       // 896px (páginas de detalhe)
    '5xl': '64rem',       // 1024px
    '6xl': '72rem',       // 1152px
    '7xl': '80rem',       // 1280px (layout geral)
  },
  borderRadius: {
    none: '0',
    sm: '0.375rem',    // 6px - Bold & Vibrant
    md: '0.5rem',      // 8px - Bold & Vibrant
    lg: '0.75rem',     // 12px - Bold & Vibrant
    full: '9999px',
  },
  shadows: {
    // Two-Layer Shadows System (v2.0.0)
    sm: {
      outer: '0 2px 4px rgba(0,0,0,0.1)',
      inner: 'inset 0 1px 0 rgba(255,255,255,0.1)',
      combined: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.1)'
    },
    md: {
      outer: '0 8px 12px rgba(0,0,0,0.15)',
      inner: 'inset 0 1px 0 rgba(255,255,255,0.15)',
      combined: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 12px rgba(0,0,0,0.15)'
    },
    lg: {
      outer: '0 16px 24px rgba(0,0,0,0.2)',
      inner: 'inset 0 2px 0 rgba(255,255,255,0.2)',
      combined: 'inset 0 2px 0 rgba(255,255,255,0.2), 0 16px 24px rgba(0,0,0,0.2)'
    },
    xl: {
      outer: '0 24px 32px rgba(0,0,0,0.25)',
      inner: 'inset 0 2px 0 rgba(255,255,255,0.25)',
      combined: 'inset 0 2px 0 rgba(255,255,255,0.25), 0 24px 32px rgba(0,0,0,0.25)'
    },
  },
  transitions: {
    // Micro-interactions System (v2.0.0)
    fast: {
      duration: '150ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    base: {
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    slow: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
  },
} as const;

export type Theme = typeof theme;
