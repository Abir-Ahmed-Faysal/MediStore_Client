"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/services/medicine.service";
import { UpdateOrderStatusDialogue } from "./updateStatusDialog";
import { Eye } from "lucide-react";

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
  status: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" ;
  createdAt: string;
  updatedAt: string;
  userRef: UserRef;
  orderItems: OrderItems[];
}

const ORDER_STATUS = [
  "PLACED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
] as const;

export default function SellerOrdersStatusTable({
  orders,
  pagination,
}: {
  orders: OrdersTableProps[];
  pagination: Pagination;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  //  server-side status filter only
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

  const showOrderDetails = (id:string) => {
 router.push(`/seller-dashboard/orders/${id}`)


  };

  return (
    <>
      <div className="mb-4">
        <select
          defaultValue={searchParams.get("status") ?? ""}
          onChange={(e) => handleStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="">All Status</option>
          {ORDER_STATUS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.userRef?.name}</TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="text-right flex ">
        <Eye className="w-5 h-5 text-muted-foreground" onClick={()=>showOrderDetails(order?.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <div className="flex items-center justify-center gap-4">
                <button
                  disabled={pagination.page === 1}
                  onClick={() => goToPage(pagination.page - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  ←
                </button>

                <span className="text-sm">
                  Page {pagination.page} of {pagination.totalPage}
                </span>

                <button
                  disabled={pagination.page === pagination.totalPage}
                  onClick={() => goToPage(pagination.page + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  →
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
