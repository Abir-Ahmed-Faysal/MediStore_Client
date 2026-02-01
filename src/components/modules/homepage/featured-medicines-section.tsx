import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: "৳25",
    inStock: true,
  },
  {
    id: 2,
    name: "Azithromycin",
    price: "৳120",
    inStock: false,
  },
  {
    id: 3,
    name: "Insulin Pen",
    price: "৳850",
    inStock: true,
  },
];

export function FeaturedMedicinesSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-6">

        <h2 className="mb-10 text-center text-3xl font-semibold">
          Featured Medicines
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {medicines.map((medicine) => (
            <Card key={medicine.id}>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-semibold text-lg">
                  {medicine.name}
                </h3>

                <p className="text-muted-foreground">
                  {medicine.price}
                </p>

                <Badge variant={medicine.inStock ? "default" : "destructive"}>
                  {medicine.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </CardContent>

              <CardFooter>
                <Button className="w-full" disabled={!medicine.inStock}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
