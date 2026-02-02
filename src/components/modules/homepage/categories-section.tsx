import { categoryServices } from "@/services/category.service";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryCard } from "./categoryCard";

// Optional default icons
const defaultIcons: Record<string, string> = {
  "Pain Relief": "💊",
  Antibiotics: "🦠",
  "Diabetes Care": "🩺",
  "Heart & BP": "❤️",
  "Baby Care": "👶",
  "Personal Care": "🧴",
};

export const revalidate = 10;

export async function CategoriesSection() {
  try {
    const { data } = await categoryServices.getCategories();

    // 🔹 limit to 6
    const categories = data.slice(0, 6);

    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold">
            Shop by Category
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map(
              (category: { id: string; category_name: string }) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.category_name}
                  icon={defaultIcons[category.category_name]}
                />
              )
            )}
          </div>

          {/* 🔹 See more button */}
          <div className="mt-10 text-center">
            <Link href="/medicines">
              <Button variant="outline">See all medicines</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to load categories:", error);
    return (
      <section className="py-16 text-center text-red-500">
        Failed to load categories.
      </section>
    );
  }
}
