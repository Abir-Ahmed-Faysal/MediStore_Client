"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/services/medicine.service";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserRef {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface MedicineRef {
  id: string;
  title: string;
  price: string;
  stock: number;
}

interface OrderItems {
  id: string;
  orderId: string;
  medicineId: string;
  quantity: number;
  medicineRef: MedicineRef;
}

export interface OrdersTableProps {
  id: string;
  userId: string;
  address: string;
  totalAmount: string;
  status: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED";
  createdAt: string;
  updatedAt: string;
  userRef: UserRef;
  orderItems: OrderItems[];
}

const ORDER_STATUS = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"] as const;

const statusColorMap: Record<string, string> = {
  PLACED: "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300",
  PROCESSING: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  SHIPPED: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  DELIVERED: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
};

const statusIconMap: Record<string, string> = {
  PLACED: "📋",
  PROCESSING: "⚙️",
  SHIPPED: "🚚",
  DELIVERED: "✅",
};

export default function AdminOrdersStatusTable({
  orders,
  pagination,
}: {
  orders: OrdersTableProps[];
  pagination: Pagination;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const handleStatusFilter = (status: string) => {
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const showOrderDetails = (id: string) => {
    router.push(`/admin-dashboard/orders/${id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Orders Management</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Track and manage all customer orders</p>
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          <select
            defaultValue={searchParams.get("status") ?? ""}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
          >
            <option value="">All Status</option>
            {ORDER_STATUS.map((status) => (
              <option key={status} value={status}>
                {statusIconMap[status]} {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
            <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/80">
              <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Order ID</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Customer</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Amount</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Date</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Status</TableHead>
              <TableHead className="text-center text-slate-700 dark:text-slate-300 font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">No orders found</p>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <TableCell className="text-slate-900 dark:text-white font-medium font-mono text-sm">
                    {order.id.substring(0, 12)}...
                  </TableCell>
                  <TableCell className="text-slate-900 dark:text-white">
                    <div>
                      <p className="font-medium">{order.userRef?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{order.userRef?.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-900 dark:text-white font-semibold">
                    ৳{parseFloat(order.totalAmount).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300 text-sm">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`border-0 ${
                        statusColorMap[order.status] ??
                        "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {statusIconMap[order.status]} {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => showOrderDetails(order.id)}
                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline ml-1">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Page <span className="font-semibold text-slate-900 dark:text-white">{pagination.page}</span> of{" "}
          <span className="font-semibold text-slate-900 dark:text-white">{pagination.totalPage}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === 1}
            onClick={() => goToPage(pagination.page - 1)}
            className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === pagination.totalPage}
            onClick={() => goToPage(pagination.page + 1)}
            className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
