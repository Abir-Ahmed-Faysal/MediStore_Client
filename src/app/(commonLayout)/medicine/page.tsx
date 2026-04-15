import { medicineService } from "@/services/medicine.service";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/cart";
import { Button } from "@/components/ui/button";
import MedicineFilters from "@/components/modules/medicine/medicineFilter";
import Pagination from "@/components/modules/medicine/paginaition";

export const revalidate = 10;

type PageProps = {
  searchParams: Promise<{
    search?: string;
    image?: string;
    category?: string;
    manufacturer?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
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
      sortBy: params.sortBy,
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
      <h1 className="mb-6 text-xl md:text-2xl font-semibold">All Medicines</h1>

      {/* 🔍 Filters */}
      <MedicineFilters />

      {/* 🧾 Medicine Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.data.map((medicine) => (
          <Card
            key={medicine.id}
            className="group overflow-hidden rounded-xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={medicine.image}
                alt={medicine.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <CardContent className="flex h-full flex-col gap-2 p-4">
              {/* Category */}
              <span className="w-fit rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {medicine.categoryRef.category_name}
              </span>

              {/* Title */}
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                {medicine.title}
              </h3>

              {/* Manufacturer */}
              <p className="text-xs text-muted-foreground">
                By {medicine.manufacturer}
              </p>

              {/* Price */}
              <p className="mt-auto text-lg font-bold text-primary">
                ৳ {medicine.price}
              </p>

              {/* Action */}
              <Link href={`/medicine/${medicine.id}`} className="mt-2">
                <Button
                  size="sm"
                  className="w-full bg-[rgb(90,191,36)] font-medium hover:bg-[rgb(76,170,30)]"
                >
                  View Details
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
