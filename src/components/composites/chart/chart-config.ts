import * as React from 'react';

/**
 * Configuração de uma série do chart.
 * Define label, cor e ícone opcional para cada série de dados.
 */
export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: {
      light?: string;
      dark?: string;
    };
  };
};

/**
 * Cores pré-definidas do kodda para charts.
 * Mapeadas às CSS variables definidas em tokens/colors.ts
 */
export const koddaChartColors = {
  primary: 'var(--chart-1)',
  success: 'var(--chart-2)',
  warning: 'var(--chart-3)',
  info: 'var(--chart-4)',
  error: 'var(--chart-5)',
  purple: 'var(--chart-6)',
  teal: 'var(--chart-7)',
  orange: 'var(--chart-8)',
} as const;

export type KoddaChartColor = keyof typeof koddaChartColors;

/**
 * Helper para criar ChartConfig de forma type-safe.
 *
 * @example
 * const config = createChartConfig([
 *   { key: 'vendas', label: 'Vendas', color: 'primary' },
 *   { key: 'custos', label: 'Custos', color: 'error' },
 * ]);
 */
export function createChartConfig<T extends string>(
  series: {
    key: T;
    label: string;
    color?: KoddaChartColor | string;
    icon?: React.ComponentType;
  }[],
): ChartConfig {
  return series.reduce(
    (acc, { key, label, color = 'primary', icon }) => {
      const resolvedColor =
        color in koddaChartColors
          ? koddaChartColors[color as KoddaChartColor]
          : color;

      acc[key] = {
        label,
        color: resolvedColor,
        ...(icon && { icon }),
      };
      return acc;
    },
    {} as ChartConfig,
  );
}

/**
 * Retorna um array com as cores kodda em ordem.
 * Útil para gerar paletas automaticamente.
 */
export function getChartColorPalette(count?: number): string[] {
  const colors = Object.values(koddaChartColors);
  if (count === undefined) return colors;
  return colors.slice(0, count);
}
