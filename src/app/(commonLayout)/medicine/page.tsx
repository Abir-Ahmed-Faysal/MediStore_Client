import { medicineService } from "@/services/medicine.service";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/cart";
import { Button } from "@/components/ui/button";
import MedicineFilters from "@/components/modules/medicine/medicineFilter";
import Pagination from "@/components/modules/medicine/paginaition";

export const revalidate = 10;

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

export default async function MedicinesPage({ searchParams }: PageProps) {
 
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 15;
  const skip = (page - 1) * limit;

  const { data, error } = await medicineService.getAllMedicines(
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
  );

  if (error || !data) {
    return (
      <p className="py-20 text-center text-red-500">Failed to load medicines</p>
    );
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="mb-6 text-3xl font-semibold">All Medicines</h1>

      {/* 🔍 Filters */}
      <MedicineFilters />

      {/* 🧾 Medicine Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.data.map((medicine) => (
          <Card key={medicine.id} className="transition hover:shadow-lg">
            <CardContent className="flex h-full flex-col gap-3 p-4">
              <h3 className="line-clamp-2 font-medium">{medicine.title}</h3>

              <p className="text-sm text-muted-foreground">
                {medicine.categoryRef.category_name}
              </p>

              <p className="text-sm text-muted-foreground">
                {medicine.manufacturer}
              </p>

              <p className="mt-auto font-semibold text-primary">
                ৳ {medicine.price}
              </p>

              <Link href={`/medicine/${medicine.id}`}>
                <Button size="sm" className="mt-2 w-full">
                  View details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 📄 Pagination */}
      <Pagination
        page={data.pagination.page}
        totalPage={data.pagination.totalPage}
      />
    </section>
  );
}
