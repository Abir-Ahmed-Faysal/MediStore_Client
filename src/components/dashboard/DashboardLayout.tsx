'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LogOut,
  Home,
  FileText,
  MessageSquare,
  Bell,
  User,
} from 'lucide-react';

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: 'user' | 'admin' | 'vendor';
  userName?: string;
  userImage?: string;
}

const getUserMenuItems = (): MenuItem[] => [
  { label: 'Dashboard', href: '/dashboard/user', icon: <Home size={20} /> },
  { label: 'My Orders', href: '/dashboard/user/orders', icon: <ShoppingCart size={20} /> },
  { label: 'Cart', href: '/dashboard/user/cart', icon: <Package size={20} /> },
  { label: 'Wishlist', href: '/dashboard/user/wishlist', icon: <Heart size={20} /> },
  { label: 'Medical Records', href: '/dashboard/user/medical-records', icon: <FileText size={20} /> },
];

const getAdminMenuItems = (): MenuItem[] => [
  { label: 'Dashboard', href: '/dashboard/admin', icon: <Home size={20} /> },
  { label: 'Medicines', href: '/dashboard/admin/medicines', icon: <Package size={20} /> },
  { label: 'Orders', href: '/dashboard/admin/orders', icon: <ShoppingCart size={20} /> },
  { label: 'Users', href: '/dashboard/admin/users', icon: <Users size={20} /> },
  { label: 'Analytics', href: '/dashboard/admin/analytics', icon: <BarChart3 size={20} /> },
  { label: 'Settings', href: '/dashboard/admin/settings', icon: <Settings size={20} /> },
];

const getVendorMenuItems = (): MenuItem[] => [
  { label: 'Dashboard', href: '/dashboard/vendor', icon: <Home size={20} /> },
  { label: 'Products', href: '/dashboard/vendor/products', icon: <Package size={20} /> },
  { label: 'Orders', href: '/dashboard/vendor/orders', icon: <ShoppingCart size={20} /> },
  { label: 'Analytics', href: '/dashboard/vendor/analytics', icon: <BarChart3 size={20} /> },
];

const getMenuItems = (role?: string): MenuItem[] => {
  switch (role) {
    case 'admin':
      return getAdminMenuItems();
    case 'vendor':
      return getVendorMenuItems();
    case 'user':
    default:
      return getUserMenuItems();
  }
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  role = 'user',
  userName = 'User',
  userImage,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = getMenuItems(role);

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">MediStore</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-2">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {role === 'admin' ? 'Admin Dashboard' : role === 'vendor' ? 'Vendor Dashboard' : 'My Dashboard'}
            </h2>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={20} className="text-blue-600" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Import Heart for wishlist icon
import { Heart } from 'lucide-react';
