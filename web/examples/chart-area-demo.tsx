'use client';

import * as React from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { month: 'Jan', usuarios: 2400, sessoes: 4000 },
  { month: 'Fev', usuarios: 1398, sessoes: 3000 },
  { month: 'Mar', usuarios: 3800, sessoes: 5000 },
  { month: 'Abr', usuarios: 3908, sessoes: 4780 },
  { month: 'Mai', usuarios: 4800, sessoes: 5890 },
  { month: 'Jun', usuarios: 3800, sessoes: 4390 },
];

// Cores kodda
const COLORS = {
  primary: 'oklch(0.59 0.2 277)', // Kodda Blue
  info: 'oklch(0.7 0.15 250)',    // Info Blue
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

export default function ChartAreaDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Area Chart - Volume</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart accessibilityLayer data={chartData}>
              <defs>
                <linearGradient id="colorUsuarios" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSessoes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.info} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={COLORS.info} stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="usuarios"
                name="Usuários"
                stroke={COLORS.primary}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsuarios)"
              />
              <Area
                type="monotone"
                dataKey="sessoes"
                name="Sessões"
                stroke={COLORS.info}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSessoes)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
