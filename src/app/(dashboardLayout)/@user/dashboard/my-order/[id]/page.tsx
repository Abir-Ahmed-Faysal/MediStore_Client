import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CancelOrderButton } from "@/components/modules/order/cancelOrderButton";
import { orderService } from "@/services/order.service";

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
  createdAt: string; 
  items: {
    medicineId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

const statusColorMap: Record<OrderStatus, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await orderService.getUserOrderDetails(id);

  if (!data?.data || error) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-muted-foreground">
        Order not found
      </div>
    );
  }

  const order:Order = data.data;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-sm border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Order #{order._id}
          </h1>
          <p className="text-sm text-muted-foreground">
            Placed on {new Date(order.createdAt).toDateString()}
          </p>
        </div>

        <Badge className={`capitalize ${statusColorMap[order.status]}`}>
          {order.status}
        </Badge>
      </div>

      <Separator />

      {/* Items */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          Order Items
        </h2>

        <div className="space-y-2">
          {order.items.map((item) => (
            <div
              key={item.medicineId}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground">
                  ৳{item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ৳{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Summary */}
      <div className="flex justify-between items-center">
        <p className="text-base font-semibold">Total Amount</p>
        <p className="text-lg font-bold">৳{order.totalAmount}</p>
      </div>

      {/* Actions */}
      <div className="pt-2">
        <CancelOrderButton
          orderId={order._id}
          status={order.status}
        />
      </div>
    </div>
  );
}
