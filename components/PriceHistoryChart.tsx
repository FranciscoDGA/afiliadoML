"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Seg", value: 230 },
  { name: "Ter", value: 310 },
  { name: "Qua", value: 260 },
  { name: "Qui", value: 420 },
  { name: "Sex", value: 390 }
];

export function PriceHistoryChart() {
  return (
    <div className="h-72 w-full rounded-3xl bg-white p-4 shadow-soft">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#3483FA" fill="#3483FA" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
