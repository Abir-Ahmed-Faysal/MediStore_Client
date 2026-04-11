import { Users, Package, TrendingUp, Award } from "lucide-react";

export function StatisticsSection() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
      description: "Trusted by thousands of patients",
    },
    {
      icon: Package,
      value: "10K+",
      label: "Medicines Available",
      description: "Wide range of pharmaceutical products",
    },
    {
      icon: TrendingUp,
      value: "1M+",
      label: "Orders Delivered",
      description: "Fast and reliable delivery service",
    },
    {
      icon: Award,
      value: "4.8/5",
      label: "Customer Rating",
      description: "Highly rated by our customers",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Why Choose Us
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our platform is trusted by millions for quality medicines and excellent service.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow hover:scale-105 transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
