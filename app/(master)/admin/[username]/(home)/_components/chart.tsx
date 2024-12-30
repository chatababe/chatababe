"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type StreamGrowthProps = {
   date: string; streams: number; users: number 
};

const Chart = ({ streamGrowth }: { streamGrowth: StreamGrowthProps[] }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={streamGrowth}>
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="streams"
            stroke="#8884d8"
            name="Streams"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="users"
            stroke="#82ca9d"
            name="Users"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
