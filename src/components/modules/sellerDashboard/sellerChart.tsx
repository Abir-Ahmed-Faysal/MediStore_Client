"use client";

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
} from "recharts";
import { Package, Inbox, TrendingUp, CheckCircle } from "lucide-react";

/* =======================
   Types (Backend Match)
======================= */
type StockByCategory = {
  categoryId: string;
  totalStock: number;
};

type TotalPerCategory = {
  categoryId: string;
  categoryName: string;
  totalMedicine: number;
};

type SellerStaticsData = {
  totalMedicine: number;
  totalStock: number;
  stockByCategory: StockByCategory[];
  totalPerCategory: TotalPerCategory[];
  pendingOrder: number;
  deliveredOrder: number;
};

interface Props {
  data: SellerStaticsData | null;
  error?: boolean;
}

/* =======================
   Utils – Stable Color
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
const SellerStatics: React.FC<Props> = ({ data, error }) => {
  if (!data || error) {
    return (
      <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No statistics available</p>
      </div>
    );
  }

  /* ---------- categoryId → categoryName map ---------- */
  const categoryNameMap = useMemo(() => {
    const map = new Map<string, string>();
    data.totalPerCategory.forEach((item) => {
      map.set(item.categoryId, item.categoryName);
    });
    return map;
  }, [data.totalPerCategory]);

  /* ---------- Chart Data ---------- */
  const chartData = useMemo(
    () =>
      data.stockByCategory.map((item) => ({
        name: categoryNameMap.get(item.categoryId)?.substring(0, 10) ?? "Unknown",
        value: item.totalStock,
        color: generateColorFromId(item.categoryId),
      })),
    [data.stockByCategory, categoryNameMap]
  );

  const stats = [
    { title: "Total Medicines", value: data.totalMedicine, icon: Package, color: "emerald" },
    { title: "Total Stock", value: data.totalStock, icon: Inbox, color: "blue" },
    { title: "Pending Orders", value: data.pendingOrder, icon: TrendingUp, color: "amber" },
    { title: "Delivered Orders", value: data.deliveredOrder, icon: CheckCircle, color: "green" },
  ];

  return (
    <div className="space-y-8">
      {/* ================= Header ================= */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Seller Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Overview of medicines, stock, and orders
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
        {/* -------- Pie Chart -------- */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
            Stock Distribution by Category
          </h3>
          {chartData.length === 0 ? (
            <div className="h-[280px] flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">No category stock data found</p>
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
                      `${name} ${((percent as number) * 100).toFixed(0)}%`
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

        {/* -------- Bar Chart -------- */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
            Stock by Category (Comparison)
          </h3>
          {chartData.length === 0 ? (
            <div className="h-[280px] flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">No category stock data found</p>
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

      {/* ================= Business Metrics ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Product Performance */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">Product Performance</h3>
          <div className="space-y-4">
            <MetricRow label="Average Stock per Medicine" value={`${(data.totalStock / (data.totalMedicine || 1)).toFixed(0)} units`} />
            <MetricRow label="Total Medicines Listed" value={data.totalMedicine.toString()} />
            <MetricRow label="Stock Utilization" value={`${((data.totalStock / (data.totalStock + 100)) * 100).toFixed(1)}%`} />
            <MetricRow label="Categories" value={data.totalPerCategory.length.toString()} />
          </div>
        </div>

        {/* Order Performance */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">Order Performance</h3>
          <div className="space-y-4">
            <MetricRow label="Total Orders" value={(data.pendingOrder + data.deliveredOrder).toString()} />
            <MetricRow label="Pending Orders" value={data.pendingOrder.toString()} />
            <MetricRow label="Delivered Orders" value={data.deliveredOrder.toString()} />
            <MetricRow
              label="Completion Rate"
              value={`${((data.deliveredOrder / ((data.pendingOrder + data.deliveredOrder) || 1)) * 100).toFixed(1)}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerStatics;

/* =======================
   Stat Card
======================= */
interface StatData {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const StatCard = ({ stat }: { stat: StatData }) => {
  const Icon = stat.icon;

  const colorStyles: { [key: string]: string } = {
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
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
