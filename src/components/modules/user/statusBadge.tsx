import { OrderStatus } from "@/types/userOrders";

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const colorClasses: Record<OrderStatus, string> = {
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
