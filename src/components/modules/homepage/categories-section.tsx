import { categoryServices } from "@/services/category.service";
import { CategoryCard } from "./categoryCard";
import { Category } from "@/types/category.type";

export async function CategoriesSection() {
  const { data, error } = await categoryServices.getCategories();

  if (error) {
    return (
      <section className="py-16 text-center text-red-500">
        Failed to load categories.
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="py-16 text-center text-muted-foreground">
        No categories available.
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="mb-10 text-xl lg:text-2xl ">Categories</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {data?.map((category: Category) => (
            <CategoryCard
              key={category.id}
              name={category.category_name}
              icon={category.icon}
             
            />
          ))}
        </div>
      </div>
    </section>
  );
}
