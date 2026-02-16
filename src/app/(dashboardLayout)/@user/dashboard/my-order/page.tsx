import OrdersList from "@/components/modules/user/OrderList";
import { orderService } from "@/services/order.service";


export default async function OrdersPage() {
  const { data, error } = await orderService.getUserOrders();

  if (error || !data) {
    return (
      <div>
        <h3>internal server error</h3>
      </div>
    );
  }

  const orders = data || [];

  return <OrdersList orders={orders as any} />;
}
