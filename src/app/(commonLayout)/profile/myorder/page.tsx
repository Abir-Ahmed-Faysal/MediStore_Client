"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";

type OrderStatus =
  | "PLACED"
  | "CANCELLED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED";

type Order = {
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

export default function OrdersPage() {
  const orders: Order[] = [
    {
      _id: "1023",
      status: "DELIVERED",
      totalAmount: 850,
      items: [
        { medicineId: "M1", name: "Napa", price: 60, quantity: 2 },
        { medicineId: "M2", name: "Seclo", price: 80, quantity: 1 },
      ],
    },
  ];

  return (
    <div className="max-w-md mx-auto space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white border rounded-lg p-5 shadow-sm"
        >
          <h3 className="font-semibold text-lg mb-3">
            Order #{order._id}
          </h3>

          <div className="space-y-2 text-sm">
            {order.items.map((item) => (
              <div
                key={item.medicineId}
                className="flex justify-between"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  {item.name} × {item.quantity}
                </div>
                ৳{item.price * item.quantity}
              </div>
            ))}
          </div>

          <div className="border-t my-4" />

          <div className="flex justify-between items-center">
            <p className="font-semibold">
              Total: ৳{order.totalAmount}
            </p>
            <Badge>{order.status}</Badge>
          </div>

          <Link href={`/profile/myorder/${order._id}`}>
            <Button variant="outline" className="w-full mt-4">
              See Details
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
