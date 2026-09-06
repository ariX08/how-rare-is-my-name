"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Point {
  year: number;
  score: number;
}

interface PopularityChartProps {
  data: Point[];
  peakYear?: number;
}

export function PopularityChart({ data, peakYear }: PopularityChartProps) {
  return (
    <div className="w-full h-72 sm:h-80 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="popGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              fontSize: "13px",
            }}
            labelStyle={{ color: "var(--foreground)" }}
            formatter={(value: number) => [`${value}`, "Relative popularity"]}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#8b5cf6"
            strokeWidth={2.5}
            fill="url(#popGradient)"
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
