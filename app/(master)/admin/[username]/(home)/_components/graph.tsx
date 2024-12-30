"use client"

import React from "react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

type ApprovalStatsProps = {
  name: string;
  value: number;
};

const Graph = ({ approvalStats }: { approvalStats: ApprovalStatsProps[] }) => {
  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={approvalStats}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {approvalStats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-4">
        {approvalStats.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graph;
