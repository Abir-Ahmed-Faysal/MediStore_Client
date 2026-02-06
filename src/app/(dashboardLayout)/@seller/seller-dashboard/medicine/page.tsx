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

const page = async ({ searchParams }: PageProps) => {
  const params = (await searchParams) || {};

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 15;
  const skip = (page - 1) * limit;

  const [data, categories] = await Promise.all([
    medicineService.getAllMedicines(
      {
        search: params.search,
        category: params.category,
        manufacturer: params.manufacturer,
        minPrice: Number(params.minPrice),
        maxPrice: Number(params.maxPrice),
        page,
        limit,
        skip,
      },
      { revalidate: 10 },
    ),
    categoryServices.getCategories(),
  ]);

  const allCategory: categories []= categories?.data?.data || [];
  const medicines: MedicineResponse[] = data?.data?.data || [];
  const pagination: Pagination = data?.data?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 1,
  };

  return (
    <div>
      <MedicineTable
        categories={allCategory}
        medicines={medicines}
        pagination={pagination}
      />
    </div>
  );
};

export default page;
