'use client';

import * as React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
  { name: 'Outros', value: 100 },
];

// Cores kodda
const COLORS = [
  'oklch(0.59 0.2 277)',   // Kodda Blue
  'oklch(0.72 0.19 142)',  // Success Green
  'oklch(0.75 0.18 85)',   // Warning Yellow
  'oklch(0.7 0.15 250)',   // Info Blue
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  return (
    <div className="rounded-lg border bg-background p-2.5 text-xs shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.payload.fill }}
          />
          <span className="text-muted-foreground">{item.name}</span>
        </div>
        <span className="font-mono font-medium tabular-nums">
          {item.value.toLocaleString('pt-BR')}
        </span>
      </div>
    </div>
  );
}

function CustomLegend({ payload }: any) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="h-2 w-2 shrink-0 rounded-[2px]"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ChartPieDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Pie Chart - Distribuição</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart accessibilityLayer>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={2}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
