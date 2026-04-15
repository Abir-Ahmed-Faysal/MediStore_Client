'use client';

import React from 'react';
import { Users, BarChart3, AlertCircle, CheckCircle } from 'lucide-react';

export default function ManagerDashboard() {
  const managerStats = [
    {
      id: 1,
      label: 'Active Users',
      value: '2,345',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      label: 'Total Orders',
      value: '12,456',
      icon: BarChart3,
      color: 'bg-green-500',
    },
    {
      id: 3,
      label: 'Pending Issues',
      value: 23,
      icon: AlertCircle,
      color: 'bg-red-500',
    },
    {
      id: 4,
      label: 'Completed Tasks',
      value: '98%',
      icon: CheckCircle,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Manager Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Monitor platform performance and manage operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {managerStats.map((stat) => {
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
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-2">Welcome to Manager Dashboard</h2>
        <p className="text-purple-100">
          As a manager, you can monitor platform metrics, manage user activities, and oversee overall operations.
        </p>
      </div>
    </div>
  );
}
