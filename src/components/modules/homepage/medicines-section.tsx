import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MedicineResponse, medicineService } from '@/services/medicine.service';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';

export async function MedicinesSection() {
  const { data, error } = await medicineService.getAllMedicines({ limit: 12 });

  if (error) {
    return (
      <section className="py-16 text-center text-red-500">
        <div className="container mx-auto px-4 md:px-6">
          <p>Failed to load medicines. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-6 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Featured Medicines</h2>
          <p className="text-center text-muted-foreground">No medicines available at the moment.</p>
        </div>
      </section>
    );
  }

  const medicines: MedicineResponse[] = data.data;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Featured Medicines</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Popular medicines and bestsellers from our verified sellers
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/explore">View All</Link>
            </Button>
          </div>
        </div>

        {/* Medicines Grid */}
        <div
          className="
            grid gap-6
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-6
          "
        >
          {medicines.map((medicine) => {
            const inStock = medicine.stock > 0;
            const discount = Math.floor(Math.random() * 30) + 5; // Random 5-30% discount for demo

            return (
              <Link key={medicine.id} href={`/medicine/${medicine.id}`} className="group block h-full">
                <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 border-0 bg-white dark:bg-slate-800/50">
                  {/* ================= IMAGE ================= */}
                  <div className="relative aspect-square bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                    <img
                      src={medicine.image}
                      alt={medicine.title}
                      className="object-contain p-2 w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Featured Tag */}
                    {medicine.isFeatured && (
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span className="rounded-full bg-linear-to-r from-emerald-500 to-emerald-600 px-2 py-1 text-xs font-semibold text-white flex items-center gap-1">
                          ⭐ Featured
                        </span>
                      </div>
                    )}

                    {/* Discount Tag */}
                    {inStock && (
                      <div className="absolute top-2 right-2">
                        <span className="rounded-full bg-red-500 text-white px-2 py-1 text-xs font-bold">-{discount}%</span>
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button className="absolute bottom-2 right-2 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart className="w-4 h-4 text-red-500" fill="none" />
                    </button>

                    {/* Out of Stock Overlay */}
                    {!inStock && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                        <p className="text-white font-semibold text-center">Out of Stock</p>
                      </div>
                    )}
                  </div>

                  {/* ================= CONTENT ================= */}
                  <CardContent className="p-3 space-y-2 flex-1">
                    <h3 className="font-semibold text-sm line-clamp-2 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {medicine.title}
                    </h3>

                    {/* Price Section */}
                    <div className="flex items-baseline gap-2">
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">৳ {Math.floor(Number(medicine.price) * (1 - discount / 100))}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-through">৳ {medicine.price}</p>
                    </div>

                    {/* Stock Status */}
                    <Badge
                      variant={inStock ? 'default' : 'destructive'}
                      className={`text-xs ${inStock ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}`}
                    >
                      {inStock ? '✓ In Stock' : 'Out of Stock'}
                    </Badge>
                  </CardContent>

                  {/* ================= FOOTER ================= */}
                  <CardFooter className="p-3 border-t border-slate-100 dark:border-slate-700">
                    <Button
                      size="sm"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                      disabled={!inStock}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
