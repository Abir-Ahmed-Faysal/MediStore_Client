'use client';

import { useState, useEffect, useCallback } from 'react';

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  completedOrders: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface UseDashboardReturn {
  stats: DashboardStats | null;
  chartData: {
    sales: ChartDataPoint[];
    orders: ChartDataPoint[];
    categories: ChartDataPoint[];
  };
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

// Mock data for demonstration
const mockStats: DashboardStats = {
  totalOrders: 1250,
  totalRevenue: 45320,
  totalCustomers: 3421,
  totalProducts: 587,
  pendingOrders: 42,
  completedOrders: 1208,
};

const mockSalesData: ChartDataPoint[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const mockOrdersData: ChartDataPoint[] = [
  { name: 'Mon', value: 240 },
  { name: 'Tue', value: 139 },
  { name: 'Wed', value: 221 },
  { name: 'Thu', value: 250 },
  { name: 'Fri', value: 200 },
  { name: 'Sat', value: 229 },
  { name: 'Sun', value: 200 },
];

const mockCategoriesData: ChartDataPoint[] = [
  { name: 'Pain Relief', value: 35 },
  { name: 'Cold & Flu', value: 25 },
  { name: 'Vitamins', value: 20 },
  { name: 'Antibiotics', value: 15 },
  { name: 'Others', value: 5 },
];

export const useDashboard = (role: 'user' | 'admin' | 'vendor' = 'user'): UseDashboardReturn => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chartData = {
    sales: mockSalesData,
    orders: mockOrdersData,
    categories: mockCategoriesData,
  };

  // Simulate fetching dashboard data
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In production, fetch from API based on role
      // const response = await fetch(`/api/dashboard/${role}`);
      // const data = await response.json();
      // setStats(data);

      // For now, use mock data
      setStats(mockStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [role]);

  // Fetch data on mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return {
    stats,
    chartData,
    isLoading,
    error,
    refreshData,
  };
};

// User-specific stats
export const useUserDashboard = () => {
  const [userStats, setUserStats] = useState({
    recentOrders: 5,
    totalSpent: 2345.50,
    activePresacriptions: 3,
    savedAddresses: 2,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserStats({
        recentOrders: 5,
        totalSpent: 2345.50,
        activePresacriptions: 3,
        savedAddresses: 2,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return { userStats, isLoading };
};

// Admin-specific stats
export const useAdminDashboard = () => {
  const [adminStats, setAdminStats] = useState({
    totalSales: 125430,
    netProfit: 45230,
    totalOrders: 1250,
    totalCustomers: 3421,
    returned: 23,
    cancelled: 12,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAdminStats({
        totalSales: 125430,
        netProfit: 45230,
        totalOrders: 1250,
        totalCustomers: 3421,
        returned: 23,
        cancelled: 12,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return { adminStats, isLoading };
};
