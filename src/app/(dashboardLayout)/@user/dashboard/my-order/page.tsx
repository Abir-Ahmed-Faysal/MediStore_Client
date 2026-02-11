import OrdersList from "@/components/modules/user/OrderList";
import { orderService } from "@/services/order.service";
import { notFound } from "next/navigation";

export default async function OrdersPage() {
  const { data, error } = await orderService.getUserOrders();

  if (!data || error) {
    notFound()
  }

  const orders = data?.data || [];

  return <OrdersList orders={orders as any} />;
}
