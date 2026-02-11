"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export type OrderStatus =
  | "PLACED"
  | "CANCELLED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED";

export type Order = {
  _id: string;
  status: OrderStatus;
  totalAmount: number;
  items: {
    medicineId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export default function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>

      {orders?.length!==0 &&
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Order #{order._id}
              </h3>
              <StatusBadge status={order.status} />
            </div>

            {/* Items List */}
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div
                  key={item.medicineId}
                  className="flex justify-between items-center py-3"
                >
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-medium text-gray-700">
                      {item.name} × {item.quantity}
                    </span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    ৳{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <p className="text-lg font-semibold text-gray-800">
                Total: ৳{order.totalAmount}
              </p>
              <Link href={`/dashboard/my-order/${order._id}`}>
                <Button variant="outline" className="px-5 py-2">
                  See Details
                </Button>
              </Link>
            </div>
          </div>
        ))}

      {orders?.length === 0 && (
        <div className="text-center pt-20 text-gray-500">
          <p className="text-lg">No orders found.</p>
        </div>
      )}
    </div>
  );
}

/* ---------------- Status Badge Component ---------------- */

function StatusBadge({ status }: { status: OrderStatus }) {
  const colorClasses = {
    PLACED: "bg-gray-100 text-gray-800",
    PROCESSING: "bg-yellow-100 text-yellow-800",
    SHIPPED: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`uppercase px-3 py-1 rounded-full text-sm font-medium ${colorClasses[status]}`}
    >
      {status}
    </span>
  );
}
