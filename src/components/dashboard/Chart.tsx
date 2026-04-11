'use client';

import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  value?: number;
  [key: string]: string | number | undefined;
}

interface BarChartComponentProps {
  data: ChartData[];
  dataKey: string;
  title?: string;
  height?: number;
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  dataKey,
  title,
  height = 300,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill="#3b82f6" name={dataKey} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface LineChartComponentProps {
  data: ChartData[];
  dataKey: string;
  title?: string;
  height?: number;
}

export const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  dataKey,
  title,
  height = 300,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#3b82f6" name={dataKey} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartComponentProps {
  data: PieChartData[];
  title?: string;
  height?: number;
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  title,
  height = 300,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DonutChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  title,
  height = 300,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
