

export interface AdminStatisticsData {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalCustomers: number
  totalSellers: number
  totalMedicines: number
  totalRevenue: number
  thisMonthRevenue: number
  topCategories: TopCategory[]
}

export interface TopCategory {
  id: string
  category_name: string
  _count: CategoryCount
}

export interface CategoryCount {
  medicines: number
}
