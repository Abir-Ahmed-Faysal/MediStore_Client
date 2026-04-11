'use client';

import React from 'react';
import { Package, ShoppingCart, Users, TrendingUp, AlertCircle, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { OverviewGrid } from '@/components/dashboard/OverviewCard';
import { BarChartComponent, LineChartComponent, DonutChartComponent } from '@/components/dashboard/Chart';
import { DashboardTable } from '@/components/dashboard/DashboardTable';
import { useAdminDashboard } from '@/hooks/useDashboard';

export default function AdminDashboardPage() {
  const { adminStats } = useAdminDashboard();

  const overviewCards = [
    {
      title: 'Total Sales',
      value: `$${adminStats.totalSales.toLocaleString()}`,
      subtitle: 'all time',
      icon: TrendingUp,
      color: 'green' as const,
      trend: { value: 23, isPositive: true },
    },
    {
      title: 'Net Profit',
      value: `$${adminStats.netProfit.toLocaleString()}`,
      subtitle: 'revenue',
      icon: Package,
      color: 'blue' as const,
      trend: { value: 15, isPositive: true },
    },
    {
      title: 'Total Orders',
      value: adminStats.totalOrders.toLocaleString(),
      subtitle: 'processed',
      icon: ShoppingCart,
      color: 'purple' as const,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Total Customers',
      value: adminStats.totalCustomers.toLocaleString(),
      subtitle: 'registered',
      icon: Users,
      color: 'yellow' as const,
      trend: { value: 12, isPositive: true },
    },
  ];

  // Sales data
  const salesData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
  ];

  // Top medicines
  const topMedicinesColumns = [
    { key: 'name', label: 'Medicine Name', width: '25%' },
    { key: 'sold', label: 'Units Sold', width: '15%' },
    { key: 'revenue', label: 'Revenue', width: '15%', render: (val: number) => `$${val.toFixed(2)}` },
    { key: 'status', label: 'Status', width: '45%', render: (status: string) => (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === 'In Stock' ? 'bg-green-100 text-green-700' :
        status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
        'bg-red-100 text-red-700'
      }`}>
        {status}
      </span>
    ) },
  ];

  const topMedicinesData = [
    { name: 'Paracetamol 500mg', sold: 1250, revenue: 3750, status: 'In Stock' },
    { name: 'Ibuprofen 200mg', sold: 980, revenue: 2940, status: 'In Stock' },
    { name: 'Aspirin 100mg', sold: 750, revenue: 1500, status: 'Low Stock' },
    { name: 'Cough Syrup 200ml', sold: 450, revenue: 1350, status: 'In Stock' },
    { name: 'Antihistamine 10mg', sold: 320, revenue: 960, status: 'Out of Stock' },
  ];

  // Recent orders
  const recentOrdersColumns = [
    { key: 'orderId', label: 'Order ID', width: '15%' },
    { key: 'customer', label: 'Customer', width: '20%' },
    { key: 'amount', label: 'Amount', width: '15%', render: (val: number) => `$${val.toFixed(2)}` },
    { key: 'status', label: 'Status', width: '20%', render: (status: string) => (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === 'Completed' ? 'bg-green-100 text-green-700' :
        status === 'Processing' ? 'bg-blue-100 text-blue-700' :
        'bg-yellow-100 text-yellow-700'
      }`}>
        {status}
      </span>
    ) },
    { key: 'date', label: 'Date', width: '30%' },
  ];

  const recentOrdersData = [
    { orderId: '#ORD-1250', customer: 'John Doe', amount: 245.50, status: 'Completed', date: '2024-04-10 10:30 AM' },
    { orderId: '#ORD-1249', customer: 'Jane Smith', amount: 89.99, status: 'Processing', date: '2024-04-10 09:15 AM' },
    { orderId: '#ORD-1248', customer: 'Mike Johnson', amount: 324.75, status: 'Completed', date: '2024-04-10 08:45 AM' },
    { orderId: '#ORD-1247', customer: 'Sarah Wilson', amount: 156.20, status: 'Processing', date: '2024-04-10 07:20 AM' },
  ];

  // Order status distribution
  const orderStatusData = [
    { name: 'Completed', value: 1208 },
    { name: 'Processing', value: 42 },
    { name: 'Cancelled', value: 12 },
    { name: 'Returned', value: 23 },
  ];

  return (
    <DashboardLayout role="admin" userName="Admin User" userImage="/admin-avatar.jpg">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard 📊</h1>
        <p className="text-gray-600 mt-2">Monitor sales, orders, and platform performance</p>
      </div>

      {/* Overview Cards */}
      <OverviewGrid cards={overviewCards} columns={4} />

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertCircle className="text-red-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-red-900">Low Stock Alert</h3>
            <p className="text-sm text-red-700 mt-1">23 medicines have low stock levels</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-start gap-4">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Clock className="text-yellow-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-yellow-900">Pending Orders</h3>
            <p className="text-sm text-yellow-700 mt-1">42 orders awaiting processing</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Sales Chart */}
        <LineChartComponent
          data={salesData}
          dataKey="sales"
          title="Sales Trend (Last 6 Months)"
          height={300}
        />

        {/* Order Status Distribution */}
        <DonutChartComponent
          data={orderStatusData}
          title="Order Status Distribution"
          height={300}
        />
      </div>

      {/* Revenue Chart */}
      <div className="mt-8">
        <BarChartComponent
          data={salesData}
          dataKey="revenue"
          title="Revenue Trend (Last 6 Months)"
          height={300}
        />
      </div>

      {/* Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <DashboardTable
          title="Top Selling Medicines"
          columns={topMedicinesColumns}
          data={topMedicinesData}
          onRowClick={(row) => console.log('Medicine clicked:', row)}
        />

        <DashboardTable
          title="Recent Orders"
          columns={recentOrdersColumns}
          data={recentOrdersData}
          onRowClick={(row) => console.log('Order clicked:', row)}
        />
      </div>

      {/* Admin Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition text-center">
          <div className="p-3 bg-blue-50 rounded-lg mx-auto mb-4 w-fit">
            <Package className="text-blue-600" size={28} />
          </div>
          <h3 className="font-semibold text-gray-900">Manage Medicines</h3>
          <p className="text-xs text-gray-600 mt-1">587 products</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition text-center">
          <div className="p-3 bg-green-50 rounded-lg mx-auto mb-4 w-fit">
            <ShoppingCart className="text-green-600" size={28} />
          </div>
          <h3 className="font-semibold text-gray-900">View Orders</h3>
          <p className="text-xs text-gray-600 mt-1">1,250 total</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition text-center">
          <div className="p-3 bg-purple-50 rounded-lg mx-auto mb-4 w-fit">
            <Users className="text-purple-600" size={28} />
          </div>
          <h3 className="font-semibold text-gray-900">Manage Users</h3>
          <p className="text-xs text-gray-600 mt-1">3,421 users</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition text-center">
          <div className="p-3 bg-yellow-50 rounded-lg mx-auto mb-4 w-fit">
            <TrendingUp className="text-yellow-600" size={28} />
          </div>
          <h3 className="font-semibold text-gray-900">Analytics</h3>
          <p className="text-xs text-gray-600 mt-1">View reports</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
