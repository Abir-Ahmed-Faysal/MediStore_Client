import { medicineService } from "@/services/medicine.service";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const revalidate = 10;

export default async function MedicinesPage() {
  const { data, error } = await medicineService.getAllMedicines(
    { page: 1, limit: 15 },
    { revalidate: 10 },
  );

  if (error || !data) {
    return <p className="text-center text-red-500">Failed to load medicines</p>;
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="mb-8 text-3xl font-semibold">All Medicines</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.data.map((medicine) => (
          <Card key={medicine.id}>
            <CardContent className="flex flex-col gap-3 p-4">
              <h3 className="font-medium">{medicine.title}</h3>

              <p className="text-sm text-muted-foreground">
                {medicine.categoryRef.category_name}
              </p>

              <p className="font-semibold">৳ {medicine.price}</p>

              <Link href={`/medicine/${medicine.id}`}>
                <Button size="sm" className="w-full">
                  View details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
