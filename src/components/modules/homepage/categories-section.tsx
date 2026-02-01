import { Card, CardContent } from "@/components/ui/card";
import { categoryServices } from "@/services/category.service";

// Optional default icons map, যদি API তে icon না থাকে
const defaultIcons: Record<string, string> = {
  "Pain Relief": "💊",
  "Antibiotics": "🦠",
  "Diabetes Care": "🩺",
  "Heart & BP": "❤️",
  "Baby Care": "👶",
  "Personal Care": "🧴",
};

export const revalidate = 10; 

export async function CategoriesSection() {
  try {
    // API call with ISR cache
    const { data } = await categoryServices.getCategories(); 


    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-center text-3xl font-semibold">
            Shop by Category
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {data.map((category: { id: string; category_name: string }) => (
              <Card
                key={category.id}
                className="cursor-pointer transition hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <span className="text-4xl">
                    {defaultIcons[category.category_name] || "📦"}
                  </span>
                  <p className="font-medium">{category.category_name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (err) {
    console.error("Failed to load categories:", err);
    return (
      <section className="py-16 text-center text-red-500">
        Failed to load categories.
      </section>
    );
  }
}
