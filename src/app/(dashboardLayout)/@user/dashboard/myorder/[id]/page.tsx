import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CancelOrderButton } from "@/components/modules/order/cancelOrderButton";

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
  createdAt: Date;
  items: {
    medicineId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order: Order = {
    _id: id,
    status: "DELIVERED",
    totalAmount: 850,
    createdAt: new Date(),
    items: [
      { medicineId: "M1", name: "Napa", price: 60, quantity: 2 },
      { medicineId: "M2", name: "Seclo", price: 80, quantity: 1 },
      { medicineId: "M3", name: "Antacid", price: 50, quantity: 3 },
    ],
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-2">Order #{order._id}</h1>

      <p className="text-sm text-gray-500 mb-4">
        {order.createdAt.toDateString()}
      </p>

      <div className="space-y-2 text-sm">
        {order.items.map((item) => (
          <div key={item.medicineId} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>৳{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="border-t my-4" />

      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold">Total: ৳{order.totalAmount}</p>
        <Badge>{order.status}</Badge>
      </div>

      <CancelOrderButton
        orderId={order?._id}
        status={order?.status}
      ></CancelOrderButton>
    </div>
  );
}
