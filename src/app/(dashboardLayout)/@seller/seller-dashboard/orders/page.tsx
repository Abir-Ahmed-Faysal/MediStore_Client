import MedicineTable from "@/components/modules/sellerDashboard/medicineTable";
import { categoryServices } from "@/services/category.service";
import {
  MedicineResponse,
  medicineService,
  Pagination,
} from "@/services/medicine.service";

type PageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    manufacturer?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
  }>;
};

export interface categories {
    id: string;
    category_name: string;
}

const OrderStatus = async () => {
  const params = (await searchParams) || {};

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 15;
  const skip = (page - 1) * limit;

// const {data,error}=await orderServer.getAllOrders()
const {data,error}={data:[],error:{message:"Error"}}





  return (
    <div>
      <MedicineTable
        categories={allCategory}
        medicines={medicines}
      />
    </div>
  );
};

export default OrderStatus;
