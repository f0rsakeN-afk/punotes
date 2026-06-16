"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartsProps {
  data: Array<{
    date: string;
    messages: number;
    visits: number;
    newUsers: number;
    activeUsers: number;
  }>;
}

export function LineChartComponent({ data }: ChartsProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="visits" stroke="#8b5cf6" name="Visits" strokeWidth={2} />
        <Line type="monotone" dataKey="messages" stroke="#10b981" name="Messages" strokeWidth={2} />
        <Line type="monotone" dataKey="activeUsers" stroke="#f59e0b" name="Active Users" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarChartComponent({ data }: ChartsProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="activeUsers" fill="#10b981" name="Active Users" />
        <Bar dataKey="newUsers" fill="#f59e0b" name="New Users" />
      </BarChart>
    </ResponsiveContainer>
  );
}