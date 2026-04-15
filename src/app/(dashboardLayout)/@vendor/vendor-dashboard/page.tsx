'use client';

import React from 'react';
import { BarChart3, TrendingUp, Package, ShoppingCart } from 'lucide-react';

export default function VendorDashboard() {
  const vendorStats = [
    {
      id: 1,
      label: 'Total Products',
      value: 45,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      label: 'This Month Sales',
      value: '$12,500',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      id: 3,
      label: 'Total Orders',
      value: 128,
      icon: ShoppingCart,
      color: 'bg-purple-500',
    },
    {
      id: 4,
      label: 'Avg Rating',
      value: '4.8/5',
      icon: BarChart3,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Vendor Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage your products, orders, and sales
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {vendorStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-2">Welcome to Vendor Dashboard</h2>
        <p className="text-blue-100">
          As a vendor, you can manage your product inventory, track sales, and handle customer orders efficiently.
        </p>
      </div>
    </div>
  );
}
