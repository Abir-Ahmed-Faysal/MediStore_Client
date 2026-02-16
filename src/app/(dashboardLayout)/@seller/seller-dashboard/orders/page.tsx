import SellerOrdersStatusTable from "@/components/modules/sellerDashboard/sellerOrdersTable";
import { orderService } from "@/services/order.service";
import { SellerOrderServicesPayload } from "@/types/sellerOrderServicesPayload";

interface OrderStatusPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

const OrderStatus = async ({ searchParams }: OrderStatusPageProps) => {
  const params = (await searchParams) || {};

  const page = Number(params.page || 1);
  const status = params.status || "";

  const { data, error } = await orderService.getSellerOrders({
    params: { page, status } as SellerOrderServicesPayload,
  });

  if (!data || error) {
<div><h3>internal server error</h3></div>
  }

  const orders = data?.data || [];

  if (orders.length === 0) {
    return (
      <div className="text-center pt-20 text-gray-500">
        <p className="text-lg">No orders found.</p>
      </div>
    );
  }

 
  return (
    <div className="p-4">
      <SellerOrdersStatusTable
        orders={orders}
        pagination={
          data?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 }
        }
      />
    </div>
  );
};

export default OrderStatus;
