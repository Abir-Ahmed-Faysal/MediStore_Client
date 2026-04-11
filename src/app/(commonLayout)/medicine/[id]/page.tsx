import { ImageGallery, ProductInfo } from "@/components/modules/medicine/ImageGallery";
import { ProductSpecifications, Tabs } from "@/components/modules/medicine/ProductSpecifications";
import { RelatedProducts } from "@/components/modules/medicine/RelatedProducts";
import { AddToCart } from "@/components/modules/medicine/addToCart";
import ReviewSection from "@/components/modules/medicine/reviewSection";
import { medicineService } from "@/services/medicine.service";
import { userService } from "@/services/user.service";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface MedicineDetailsProps {
  id: string;
}

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<MedicineDetailsProps>;
}) {
  const { id } = await params;

  const { data, error } = await medicineService.getMedicineById(id);

  if (error || !data) {
    return (
      <section className="container mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-red-600 font-medium">Medicine not found</p>
        </div>
      </section>
    );
  }

  const { data: session } = await userService.getSessionWithRole();
  const user = session?.user;
  const price = Number(data.price);

  // Fetch related medicines from the same category
  const { data: relatedMedicinesData } = await medicineService.getAllMedicines({
    category: data.categoryRef?.category_name,
    limit: 10,
  });

  const relatedMedicines = (relatedMedicinesData?.data || []).map(medicine => ({
    ...medicine,
    price: Number(medicine.price),
  }));

  // Product object for components
  const product = {
    id: data.id,
    title: data.title,
    image: data.image,
    images: [data.image], // Fallback to single image
    price: price,
    originalPrice: price,
    stock: data.stock,
    rating: 4.5, // Default rating
    reviews: data.reviews || [],
    isFeatured: false,
    manufacturer: data.manufacturer,
    description: data.description,
    category: data.categoryRef?.category_name || "Medicine",
    categoryId: data.categoryRef?.id,
  };

  const tabsContent = [
    {
      id: "specifications",
      label: "Specifications",
      content: (
        <ProductSpecifications
          manufacturer={data.manufacturer}
          price={price}
          stock={data.stock}
        />
      ),
    },
    {
      id: "description",
      label: "About",
      content: (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.description}
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Manufactured by</h4>
              <p className="text-slate-600 dark:text-slate-400">{data.manufacturer}</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="min-h-screen bg-white dark:bg-slate-950">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link href="/explore" className="text-blue-600 dark:text-blue-400 hover:underline">
              Medicines
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-400 truncate">{data.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-12">
          {/* Gallery Section (Left) */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <ImageGallery product={product} />
            </div>
          </div>

          {/* Product Info Section (Right) */}
          <div className="lg:col-span-2">
            <ProductInfo
              product={product}
              onAddToCart={() => {
                // Callback handled by AddToCart component
              }}
            />

            {/* Add to Cart */}
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <AddToCart
                user={user}
                id={data.id}
                title={data.title}
                price={price}
                stock={data.stock}
                disabled={data.stock === 0}
              />
            </div>
          </div>
        </div>

        {/* Tabs Section - Specifications & Description */}
        <div className="mb-12 border-t border-slate-200 dark:border-slate-800 pt-8">
          <Tabs tabs={tabsContent} />
        </div>

        {/* Reviews Section */}
        <div className="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-8">
          <ReviewSection
            medicineId={data?.id}
            reviews={data?.reviews}
          />
        </div>

        {/* Related Products Section */}
        {relatedMedicines && relatedMedicines.length > 1 && (
          <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
            <RelatedProducts
              products={relatedMedicines}
              currentProductId={data.id}
              categoryName={data.categoryRef?.category_name || "Related"}
            />
          </div>
        )}
      </div>
    </section>
  );
}
