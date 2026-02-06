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

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        {error.message}
      </div>
    );
  }

  return (
    <div className="p-4">
  

    
      <SellerOrdersStatusTable
        orders={data?.data || []}
        pagination={
          data?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 }
        }
      />
    </div>
  );
};

export default OrderStatus;
