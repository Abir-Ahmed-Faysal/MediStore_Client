import AdminOrdersStatusTable from "@/components/modules/adminDashboard/AdminOrdersTable";
import { orderService } from "@/services/order.service";
import { SellerOrderServicesPayload } from "@/types/sellerOrderServicesPayload";

interface OrderStatusPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

const OrderStatus = async ({ searchParams }: OrderStatusPageProps) => {
  const params = (await searchParams) || {};

  const page = Number(params.page || 1);
  const status = params.status || "";

  const { data, error } = await orderService.getAdminOrders({
    params: { page, status } as SellerOrderServicesPayload,
  });

  if (error) {
    return (
      <div className="rounded-lg border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 p-8 text-center">
        <p className="text-red-700 dark:text-red-400 font-medium">Failed to load orders</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-lg border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 p-8 text-center">
        <p className="text-red-700 dark:text-red-400 font-medium">Failed to load order data</p>
      </div>
    );
  }

  if (data?.data.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No orders found</p>
      </div>
    );
  }

  return (
    <AdminOrdersStatusTable
      orders={data?.data || []}
      pagination={
        data?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 }
      }
    />
  );
};

export default OrderStatus;
