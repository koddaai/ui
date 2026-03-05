/**
 * kodda Brand Colors
 *
 * Paleta oficial conforme identidade visual da kodda.
 * O azul principal transmite confiança e modernidade.
 */
export const brandColors = {
  /** Cor primária — CTAs, elementos interativos, acentos */
  blue: '#5B5BD6',
  /** Variante escura da cor primária — hover states */
  blueDark: '#4F4FC4',
  /** Variante clara da cor primária — backgrounds sutis */
  blueLight: '#7C7CE0',
  /** Branco puro para contraste máximo */
  white: '#FFFFFF',
  /** Preto para textos e fundos escuros */
  black: '#0A0A0A',
} as const;

export type BrandColor = keyof typeof brandColors;

/**
 * Cores semânticas mapeadas à paleta da marca.
 */
export const semanticColors = {
  /** Ação principal — kodda Blue */
  primary: brandColors.blue,
  /** Texto sobre primary — branco para contraste */
  primaryForeground: brandColors.white,
  /** Ação secundária / destaque alternativo */
  accent: brandColors.blue,
  /** Texto sobre accent */
  accentForeground: brandColors.white,
  /** Texto principal */
  text: brandColors.black,
  /** Texto invertido (sobre fundo escuro) */
  textInverse: brandColors.white,
  /** Fundo padrão claro */
  background: brandColors.white,
  /** Fundo escuro */
  backgroundDark: brandColors.black,
} as const;

/**
 * Cores de status para feedback ao usuário.
 */
export const statusColors = {
  success: 'var(--color-status-success)',
  warning: 'var(--color-status-warning)',
  error: 'var(--color-status-error)',
  info: 'var(--color-status-info)',
} as const;

export type StatusColor = keyof typeof statusColors;

/**
 * CSS to be added to the consumer project's global styles.
 * Install via: npx @kodda/ui add tokens
 */
export const tokensCss = `@layer base {
  :root {
    /* kodda Brand Colors */
    --kodda-blue: #5B5BD6;
    --kodda-blue-dark: #4F4FC4;
    --kodda-blue-light: #7C7CE0;

    /* Status Colors */
    --color-status-success: oklch(0.72 0.19 142);
    --color-status-warning: oklch(0.75 0.18 85);
    --color-status-error: oklch(0.63 0.24 25);
    --color-status-info: oklch(0.7 0.15 250);

    --color-status-success-bg: oklch(0.72 0.19 142 / 0.1);
    --color-status-warning-bg: oklch(0.75 0.18 85 / 0.1);
    --color-status-error-bg: oklch(0.63 0.24 25 / 0.1);
    --color-status-info-bg: oklch(0.7 0.15 250 / 0.1);
  }

  .dark {
    --color-status-success: oklch(0.78 0.17 142);
    --color-status-warning: oklch(0.8 0.16 85);
    --color-status-error: oklch(0.7 0.22 25);
    --color-status-info: oklch(0.76 0.13 250);

    --color-status-success-bg: oklch(0.78 0.17 142 / 0.15);
    --color-status-warning-bg: oklch(0.8 0.16 85 / 0.15);
    --color-status-error-bg: oklch(0.7 0.22 25 / 0.15);
    --color-status-info-bg: oklch(0.76 0.13 250 / 0.15);
  }
}
`;
