
import OrdersList from "@/components/modules/user/OrderList";
import { orderService } from "@/services/order.service";

export default async function OrdersPage() {
  const { data: orders, error } = await orderService.getUserOrders();

  if (!orders || error) {
    return (
      <div className="text-center pt-20 text-gray-500">
        <p className="text-lg">No orders found.</p>
      </div>
    );
  }

  return <OrdersList orders={orders as any} />;
}
