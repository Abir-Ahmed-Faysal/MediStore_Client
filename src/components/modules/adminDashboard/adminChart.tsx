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
} from "recharts";


/* =======================
   Props
======================= */
interface Props {
  data: AdminStatisticsData |null;
  error?: {message:string}|null
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
const AdminChart: React.FC<Props> = ({ data,error }) => {
  if (!data||error) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
        No statistics available
      </div>
    );
  }

  /* ---------- Chart Data for Top Categories ---------- */
  const chartData = useMemo(
    () =>
      data.topCategories.map((cat) => ({
        name: cat.category_name,
        value: cat._count.medicines,
        color: generateColorFromId(cat.id),
      })),
    [data.topCategories]
  );

  return (
    <div className="space-y-6">
      {/* ================= Header ================= */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Admin Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Overview of orders, customers, revenue & top categories
        </p>
      </div>

      {/* ================= Top Stats ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Orders" value={data.totalOrders} />
        <StatCard title="Pending Orders" value={data.pendingOrders} />
        <StatCard title="Completed Orders" value={data.completedOrders} />
        <StatCard title="Total Customers" value={data.totalCustomers} />
        <StatCard title="Total Sellers" value={data.totalSellers} />
        <StatCard title="Total Medicines" value={data.totalMedicines} />
        <StatCard title="Total Revenue" value={data.totalRevenue} />
        <StatCard title="This Month Revenue" value={data.thisMonthRevenue} />
      </div>

      {/* ================= Charts ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* -------- Pie Chart: Top Categories -------- */}
        <div className="rounded-xl border bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Top Categories by Medicines
          </h3>

          {chartData.length === 0 ? (
            <p className="text-sm text-gray-500">No category data found</p>
          ) : (
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) =>
                      `${name} ${(percent as any * 100).toFixed(0)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* -------- Bar Chart: Top Categories Comparison -------- */}
        <div className="rounded-xl border bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Top Categories Comparison
          </h3>

          {chartData.length === 0 ? (
            <p className="text-sm text-gray-500">No category data found</p>
          ) : (
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChart;

/* =======================
   Stat Card Component
======================= */
const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
};
