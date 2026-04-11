"use client";

import { AdminStatisticsData } from "@/types/adminStatics";
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, Users, Package, ShoppingCart, Pill } from "lucide-react";

/* =======================
   Props
======================= */
interface Props {
  data: AdminStatisticsData | null;
  error?: { message: string } | null;
}

/* =======================
   Utils
======================= */
const generateColorFromId = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 65%, 55%)`;
};

/* =======================
   Component
======================= */
const AdminChart: React.FC<Props> = ({ data, error }) => {
  if (!data || error) {
    return (
      <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No statistics available</p>
      </div>
    );
  }

  /* ---------- Chart Data for Top Categories ---------- */
  const chartData = useMemo(
    () =>
      data.topCategories.map((cat) => ({
        name: cat.category_name.substring(0, 10),
        value: cat._count.medicines,
        color: generateColorFromId(cat.id),
      })),
    [data.topCategories]
  );

  const stats = [
    { title: "Total Orders", value: data.totalOrders, icon: ShoppingCart, color: "emerald" },
    { title: "Pending Orders", value: data.pendingOrders, icon: Package, color: "amber" },
    { title: "Completed Orders", value: data.completedOrders, icon: TrendingUp, color: "blue" },
    { title: "Total Customers", value: data.totalCustomers, icon: Users, color: "purple" },
    { title: "Total Sellers", value: data.totalSellers, icon: Users, color: "pink" },
    { title: "Total Medicines", value: data.totalMedicines, icon: Pill, color: "cyan" },
    { title: "Total Revenue", value: `৳${data.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "green" },
    { title: "This Month Revenue", value: `৳${data.thisMonthRevenue.toLocaleString()}`, icon: TrendingUp, color: "indigo" },
  ];

  return (
    <div className="space-y-8">
      {/* ================= Header ================= */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Overview of orders, customers, revenue & top categories
        </p>
      </div>

      {/* ================= Top Stats ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* ================= Charts ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* -------- Pie Chart: Top Categories -------- */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
            Top Categories
          </h3>

          {chartData.length === 0 ? (
            <div className="h-[280px] flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">No category data found</p>
            </div>
          ) : (
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    label={({ name, percent }) =>
                      `${name} ${((percent as any) * 100).toFixed(0)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "0.5rem",
                      color: "#f3f4f6",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* -------- Bar Chart: Top Categories Comparison -------- */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
            Category Distribution
          </h3>

          {chartData.length === 0 ? (
            <div className="h-[280px] flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">No category data found</p>
            </div>
          ) : (
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "0.5rem",
                      color: "#f3f4f6",
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#10b981">
                    {chartData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* ================= Summary Stats ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Key Metrics */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">Key Metrics</h3>
          <div className="space-y-4">
            <MetricRow label="Order Completion Rate" value={`${((data.completedOrders / (data.totalOrders || 1)) * 100).toFixed(1)}%`} />
            <MetricRow label="Avg Revenue per Order" value={`৳${(data.totalRevenue / (data.totalOrders || 1)).toFixed(0)}`} />
            <MetricRow label="Average Monthly Revenue" value={`৳${data.thisMonthRevenue.toLocaleString()}`} />
            <MetricRow label="Medicines in System" value={data.totalMedicines.toString()} />
          </div>
        </div>

        {/* Platform Health */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">Platform Health</h3>
          <div className="space-y-4">
            <HealthBar label="Active Users" current={data.totalCustomers} total={data.totalCustomers * 1.5} percentage={(data.totalCustomers / (data.totalCustomers * 1.5)) * 100} />
            <HealthBar label="Active Sellers" current={data.totalSellers} total={data.totalSellers * 2} percentage={(data.totalSellers / (data.totalSellers * 2)) * 100} />
            <HealthBar label="Order Processing" current={data.completedOrders} total={data.totalOrders} percentage={(data.completedOrders / (data.totalOrders || 1)) * 100} />
            <HealthBar label="Pending Orders" current={data.pendingOrders} total={data.totalOrders} percentage={(data.pendingOrders / (data.totalOrders || 1)) * 100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChart;

/* =======================
   Stat Card Component
======================= */
interface StatData {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const StatCard = ({ stat }: { stat: StatData }) => {
  const Icon = stat.icon;

  const colorStyles: { [key: string]: string } = {
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    pink: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
    cyan: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  };

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorStyles[stat.color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

/* =======================
   Metric Row Component
======================= */
const MetricRow = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
      <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
      <span className="text-sm font-semibold text-slate-900 dark:text-white">{value}</span>
    </div>
  );
};

/* =======================
   Health Bar Component
======================= */
const HealthBar = ({
  label,
  current,
  total,
  percentage,
}: {
  label: string;
  current: number;
  total: number;
  percentage: number;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-sm font-semibold text-slate-900 dark:text-white">{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};
