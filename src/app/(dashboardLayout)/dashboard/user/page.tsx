'use client';

import React from 'react';
import { ShoppingCart, Heart, FileText, MapPin, Package, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { OverviewGrid } from '@/components/dashboard/OverviewCard';
import { BarChartComponent, DonutChartComponent } from '@/components/dashboard/Chart';
import { DashboardTable } from '@/components/dashboard/DashboardTable';
import { useUserDashboard } from '@/hooks/useDashboard';

export default function UserDashboardPage() {
  const { userStats } = useUserDashboard();

  const overviewCards = [
    {
      title: 'Recent Orders',
      value: userStats.recentOrders,
      subtitle: 'orders placed',
      icon: ShoppingCart,
      color: 'blue' as const,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Total Spent',
      value: `$${userStats.totalSpent.toFixed(2)}`,
      subtitle: 'all time',
      icon: Package,
      color: 'green' as const,
    },
    {
      title: 'Active Prescriptions',
      value: userStats.activePresacriptions,
      subtitle: 'ongoing',
      icon: FileText,
      color: 'purple' as const,
    },
    {
      title: 'Saved Addresses',
      value: userStats.savedAddresses,
      subtitle: 'on file',
      icon: MapPin,
      color: 'yellow' as const,
    },
  ];

  // Sample order history data
  const orderHistoryColumns = [
    { key: 'id', label: 'Order ID', width: '15%' },
    { key: 'date', label: 'Date', width: '20%' },
    { key: 'status', label: 'Status', width: '15%', render: (status: string) => (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === 'Delivered' ? 'bg-green-100 text-green-700' :
        status === 'Processing' ? 'bg-blue-100 text-blue-700' :
        status === 'Cancelled' ? 'bg-red-100 text-red-700' :
        'bg-yellow-100 text-yellow-700'
      }`}>
        {status}
      </span>
    ) },
    { key: 'total', label: 'Total', width: '15%', render: (total: number) => `$${total.toFixed(2)}` },
    { key: 'items', label: 'Items', width: '20%' },
  ];

  const orderHistoryData = [
    { id: '#ORD-001', date: '2024-04-10', status: 'Delivered', total: 125.50, items: '3 items' },
    { id: '#ORD-002', date: '2024-04-08', status: 'Processing', total: 89.99, items: '2 items' },
    { id: '#ORD-003', date: '2024-04-05', status: 'Delivered', total: 234.45, items: '5 items' },
    { id: '#ORD-004', date: '2024-04-01', status: 'Cancelled', total: 45.00, items: '1 item' },
  ];

  // Spending by category
  const spendingData = [
    { name: 'Pain Relief', value: 450 },
    { name: 'Cold & Flu', value: 320 },
    { name: 'Vitamins', value: 280 },
    { name: 'Antibiotics', value: 215 },
    { name: 'Others', value: 180 },
  ];

  // Order timeline
  const orderTimelineColumns = [
    { key: 'month', label: 'Month', width: '20%' },
    { key: 'orders', label: 'Orders', width: '20%' },
    { key: 'totalSpent', label: 'Total Spent', width: '20%', render: (val: number) => `$${val}` },
    { key: 'status', label: 'Status', width: '40%' },
  ];

  const orderTimelineData = [
    { month: 'March 2024', orders: 5, totalSpent: 1200, status: '✓ Completed' },
    { month: 'February 2024', orders: 3, totalSpent: 89.99, status: '✓ Completed' },
    { month: 'January 2024', orders: 4, totalSpent: 450.75, status: '✓ Completed' },
    { month: 'December 2023', orders: 2, totalSpent: 234.50, status: '✓ Completed' },
  ];

  return (
    <DashboardLayout role="user" userName="Ahmed Faysal" userImage="/avatar.jpg">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Ahmed! 👋</h1>
        <p className="text-gray-600 mt-2">Here's your health and shopping summary</p>
      </div>

      {/* Overview Cards */}
      <OverviewGrid cards={overviewCards} columns={4} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Spending by Category */}
        <DonutChartComponent
          data={spendingData}
          title="Spending by Category"
          height={300}
        />

        {/* Order Timeline */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h3>
          <DashboardTable
            columns={orderTimelineColumns}
            data={orderTimelineData}
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <DashboardTable
          title="Recent Orders"
          columns={orderHistoryColumns}
          data={orderHistoryData}
          onRowClick={(row) => console.log('Order clicked:', row)}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingCart className="text-blue-600" size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Continue Shopping</h3>
              <p className="text-sm text-gray-600">Browse more medicines</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <Heart className="text-red-600" size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">My Wishlist</h3>
              <p className="text-sm text-gray-600">View saved items</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FileText className="text-purple-600" size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Prescriptions</h3>
              <p className="text-sm text-gray-600">View medical records</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
