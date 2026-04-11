import { categoryServices } from '@/services/category.service';
import { CategoryCard } from './categoryCard';
import { Category } from '@/types/category.type';

export async function CategoriesSection() {
  const { data, error } = await categoryServices.getCategories();

  if (error) {
    return (
      <section className="py-16 text-center text-red-500">
        <div className="container mx-auto px-4 md:px-6">
          <p>Failed to load categories. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="py-16 text-center text-muted-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <p>No categories available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Browse by Category
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Find medicines organized by category for easy browsing and quick access to what you need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
