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
const SellerStatics: React.FC<Props> = ({ data:asdfas }) => {
    const data={
  totalMedicine: 3,
  totalStock: 1510,
  stockByCategory: [
    {
      categoryId: "d5bf5ebd-4593-4de1-9068-4c9f0614eb34",
      totalStock: 510,
    },
    {
      categoryId: "8eeb455d-ef15-4cd4-a7ff-02d292cb07ba",
      totalStock: 1000,
    },
  ],
  pendingOrder: 0,
  deliveredOrder: 0,
  totalPerCategory: [
    {
      categoryId: "8eeb455d-ef15-4cd4-a7ff-02d292cb07ba",
      categoryName: "Paracitamol",
      totalMedicine: 2,
    },
    {
      categoryId: "d5bf5ebd-4593-4de1-9068-4c9f0614eb34",
      categoryName: "Respiratory",
      totalMedicine: 1,
    },
  ],
};

  if (!data) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
        No statistics available
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
        name:
          categoryNameMap.get(item.categoryId) ??
          "Unknown Category",
        value: item.totalStock,
        color: generateColorFromId(item.categoryId),
      })),
    [data.stockByCategory, categoryNameMap]
  );

  return (
    <div className="space-y-6">
      {/* ================= Header ================= */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Seller Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Overview of medicines, stock, and orders
        </p>
      </div>

      {/* ================= Top Stats ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Medicines" value={data.totalMedicine} />
        <StatCard title="Total Stock" value={data.totalStock} />
        <StatCard title="Pending Orders" value={data.pendingOrder} />
        <StatCard title="Delivered Orders" value={data.deliveredOrder} />
      </div>

      {/* ================= Charts ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* -------- Pie Chart -------- */}
        <div className="rounded-xl border bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Stock Distribution by Category
          </h3>

          {chartData.length === 0 ? (
            <p className="text-sm text-gray-500">
              No category stock data found
            </p>
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
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* -------- Bar Chart -------- */}
        <div className="rounded-xl border bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Stock by Category (Comparison)
          </h3>

          {chartData.length === 0 ? (
            <p className="text-sm text-gray-500">
              No category stock data found
            </p>
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
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
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

export default SellerStatics;

/* =======================
   Stat Card
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
      <p className="mt-1 text-2xl font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
};
