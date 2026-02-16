import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MedicineResponse, medicineService } from "@/services/medicine.service";
import Link from "next/link";

export async function MedicinesSection() {
  const { data, error } = await medicineService.getAllMedicines({ limit: 24 });

  
  if (error) {
    return (
      <section className="py-16 text-center text-red-500">
        Failed to load categories.
      </section>
    );
  }



  if (!data?.data || data.data.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-10  text-xl lg:text-2xl">
            Featured Medicines
          </h2>
          <p className="text-center text-muted-foreground">
            No medicine available
          </p>
        </div>
      </section>
    );
  }

  const medicines: MedicineResponse[] = data.data;

  return (
    <section className=" py-16">
      
      <div className="container mx-auto px-6">
        <h2 className="mb-10  text-xl lg:text-2xl">
          Featured Medicines
        </h2>

        <div
          className="
            grid gap-6
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {medicines.map((medicine) => {
            const inStock = medicine.stock > 0;

            return (
               
                  <Link
  key={medicine.id}
  href={`/medicine/${medicine.id}`}
  className="block"
>
  <Card className="group overflow-hidden flex flex-col">

    {/* ================= IMAGE ================= */}
    <div className="relative aspect-square bg-white">
      <img
        src={medicine.image}
        alt={medicine.title}
        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 35vw,
               (max-width: 1200px) 23vw,
               11vw"
      />

      {medicine.isFeatured && (
        <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-xs text-white">
          Featured
        </span>
      )}
    </div>

    {/* ================= CONTENT ================= */}
    <CardContent className="p-3 space-y-1 flex-1">
      <h3 className="font-semibold text-sm line-clamp-2">
        {medicine.title}
      </h3>

      <p className="text-sm text-muted-foreground">
        ৳ {medicine.price}
      </p>

      <Badge
        variant={inStock ? "default" : "destructive"}
        className={inStock ? "bg-green-500 hover:bg-green-600" : ""}
      >
        {inStock ? "In Stock" : "Out of Stock"}
      </Badge>
    </CardContent>

  </Card>
</Link>

             
            );
          })}
        </div>
      </div>
    </section>
  );
}
