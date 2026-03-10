'use client';

import * as React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { month: 'Jan', receita: 4000, despesas: 2400 },
  { month: 'Fev', receita: 3000, despesas: 1398 },
  { month: 'Mar', receita: 5000, despesas: 2800 },
  { month: 'Abr', receita: 2780, despesas: 3908 },
  { month: 'Mai', receita: 4890, despesas: 2800 },
  { month: 'Jun', receita: 5390, despesas: 3200 },
];

// Cores kodda
const COLORS = {
  success: 'oklch(0.72 0.19 142)', // Success Green
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
              R$ {item.value.toLocaleString('pt-BR')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChartLineDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Line Chart - Tendências</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart accessibilityLayer data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
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
              <Line
                type="monotone"
                dataKey="receita"
                name="Receita"
                stroke={COLORS.success}
                strokeWidth={2}
                dot={{ fill: COLORS.success, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="despesas"
                name="Despesas"
                stroke={COLORS.error}
                strokeWidth={2}
                dot={{ fill: COLORS.error, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
