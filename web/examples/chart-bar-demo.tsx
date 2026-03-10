'use client';

import * as React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { month: 'Jan', vendas: 186, custos: 80 },
  { month: 'Fev', vendas: 305, custos: 200 },
  { month: 'Mar', vendas: 237, custos: 120 },
  { month: 'Abr', vendas: 73, custos: 190 },
  { month: 'Mai', vendas: 209, custos: 130 },
  { month: 'Jun', vendas: 214, custos: 140 },
];

// Cores kodda
const COLORS = {
  primary: 'oklch(0.59 0.2 277)',  // Kodda Blue
  error: 'oklch(0.63 0.24 25)',    // Error Red
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-background p-2.5 text-xs shadow-xl">
      <div className="mb-1.5 font-medium">{label}</div>
      <div className="grid gap-1.5">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-mono font-medium tabular-nums">
              {item.value.toLocaleString('pt-BR')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChartBarDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Bar Chart - Comparativo</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
              <Bar
                dataKey="vendas"
                name="Vendas"
                fill={COLORS.primary}
                radius={4}
              />
              <Bar
                dataKey="custos"
                name="Custos"
                fill={COLORS.error}
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
