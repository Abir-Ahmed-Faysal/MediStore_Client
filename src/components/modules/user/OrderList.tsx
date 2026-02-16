"use client";

import { Button } from "@/components/ui/button";
import  StatusBadge from "@/components/modules/user/statusBadge";
import { Order } from "@/types/userOrders";
import { Check } from "lucide-react";
import Link from "next/link";

export default function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Order #{order.id.slice(0, 8)}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100">
              {order.orderItems.map((item) => {
                const price = parseFloat(item.medicineRef.price);
                const subtotal = price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">
                          {item.medicineRef.title} × {item.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.medicineRef.manufacturer}
                        </p>
                      </div>
                    </div>

                    <span className="text-gray-900 font-semibold">
                      ৳{subtotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <p className="text-lg font-semibold text-gray-800">
                Total: ৳{parseFloat(order.totalAmount).toFixed(2)}
              </p>

              {/* <Link href={`/dashboard/my-order`}></Link> */}
                <Button variant="outline" className="px-5 py-2">
                  See Details
                </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center pt-20 text-gray-500">
          <p className="text-lg">No orders found.</p>
        </div>
      )}
    </div>
  );
}
