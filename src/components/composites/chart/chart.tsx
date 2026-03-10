'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { cn } from '@/lib/utils';
import type { ChartConfig } from './chart-config';

/* ---------------------------------- Context --------------------------------- */

const ChartContext = React.createContext<ChartConfig | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a ChartContainer');
  }
  return context;
}

/* -------------------------------- Container --------------------------------- */

export interface ChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >['children'];
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ config, children, className, ...props }, ref) => {
  const chartId = React.useId();

  return (
    <ChartContext.Provider value={config}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn(
          'flex aspect-video justify-center text-xs',
          /* Estilos para elementos do Recharts */
          '[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground',
          '[&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-border/50',
          '[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border',
          '[&_.recharts-polar-grid_[stroke="#ccc"]]:stroke-border',
          '[&_.recharts-radial-bar-background-sector]:fill-muted',
          '[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted',
          '[&_.recharts-reference-line_[stroke="#ccc"]]:stroke-border',
          '[&_.recharts-sector[stroke="#fff"]]:stroke-transparent',
          '[&_.recharts-sector]:outline-none',
          '[&_.recharts-surface]:outline-none',
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'ChartContainer';

/* ---------------------------------- Style ----------------------------------- */

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([_, cfg]) => cfg.color);

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart="${id}"] {
${colorConfig.map(([key, cfg]) => `  --color-${key}: ${cfg.color};`).join('\n')}
}
`,
      }}
    />
  );
}

/* --------------------------------- Tooltip ---------------------------------- */

export const ChartTooltip = RechartsPrimitive.Tooltip;

export interface ChartTooltipContentProps
  extends React.ComponentProps<typeof RechartsPrimitive.Tooltip> {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: 'line' | 'dot' | 'dashed';
  nameKey?: string;
  labelKey?: string;
  labelFormatter?: (value: string, payload: unknown[]) => React.ReactNode;
  valueFormatter?: (value: number) => string;
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps & { payload?: unknown[]; label?: string }
>(
  (
    {
      payload,
      label,
      hideLabel = false,
      hideIndicator = false,
      indicator = 'dot',
      nameKey,
      labelKey,
      labelFormatter,
      valueFormatter,
    },
    ref,
  ) => {
    const config = useChart();

    if (!payload?.length) return null;

    const formattedLabel = labelFormatter
      ? labelFormatter(label || '', payload)
      : label;

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] gap-1.5 rounded-lg border bg-background p-2.5 text-xs shadow-xl',
        )}
      >
        {!hideLabel && formattedLabel && (
          <div className="font-medium">{formattedLabel}</div>
        )}
        <div className="grid gap-1.5">
          {payload.map((item: any, index: number) => {
            const key = nameKey
              ? item.payload?.[nameKey]
              : item.dataKey || item.name;
            const itemConfig = config[key as keyof typeof config];
            const indicatorColor = item.color || itemConfig?.color;

            const formattedValue = valueFormatter
              ? valueFormatter(item.value)
              : typeof item.value === 'number'
                ? item.value.toLocaleString('pt-BR')
                : item.value;

            return (
              <div
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-1.5">
                  {!hideIndicator && (
                    <div
                      className={cn(
                        'shrink-0 rounded-[2px]',
                        indicator === 'dot' && 'h-2.5 w-2.5 rounded-full',
                        indicator === 'line' && 'h-4 w-1',
                        indicator === 'dashed' &&
                          'h-0 w-4 border-t-2 border-dashed',
                      )}
                      style={{
                        backgroundColor:
                          indicator !== 'dashed' ? indicatorColor : undefined,
                        borderColor:
                          indicator === 'dashed' ? indicatorColor : undefined,
                      }}
                    />
                  )}
                  <span className="text-muted-foreground">
                    {itemConfig?.label || key}
                  </span>
                </div>
                <span className="font-mono font-medium tabular-nums">
                  {formattedValue}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = 'ChartTooltipContent';

/* ---------------------------------- Legend ---------------------------------- */

export const ChartLegend = RechartsPrimitive.Legend;

export interface ChartLegendContentProps
  extends React.ComponentProps<typeof RechartsPrimitive.Legend> {
  nameKey?: string;
}

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps & { payload?: unknown[] }
>(({ payload, nameKey }, ref) => {
  const config = useChart();

  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className="flex flex-wrap items-center justify-center gap-4 pt-3"
    >
      {payload.map((item: any, index: number) => {
        const key = nameKey
          ? item.payload?.[nameKey]
          : item.dataKey || item.value;
        const itemConfig = config[key as keyof typeof config];

        return (
          <div key={index} className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 shrink-0 rounded-[2px]"
              style={{ backgroundColor: item.color || itemConfig?.color }}
            />
            <span className="text-sm text-muted-foreground">
              {itemConfig?.label || key}
            </span>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegendContent';
