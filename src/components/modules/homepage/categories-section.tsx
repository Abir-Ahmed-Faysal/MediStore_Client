import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Pain Relief", icon: "💊" },
  { name: "Antibiotics", icon: "🦠" },
  { name: "Diabetes Care", icon: "🩺" },
  { name: "Heart & BP", icon: "❤️" },
  { name: "Baby Care", icon: "👶" },
  { name: "Personal Care", icon: "🧴" },
];

export function CategoriesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        
        <h2 className="mb-10 text-center text-3xl font-semibold">
          Shop by Category
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="cursor-pointer transition hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                <span className="text-4xl">{category.icon}</span>
                <p className="font-medium">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
