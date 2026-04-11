import { ShoppingBag, Package, Truck, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Browse Medicines',
    icon: ShoppingBag,
    description: 'Explore medicines from verified sellers with detailed descriptions and prices',
  },
  {
    title: 'Place Order',
    icon: Package,
    description: 'Easy checkout with multiple payment options including Cash on Delivery',
  },
  {
    title: 'Fast Delivery',
    icon: Truck,
    description: 'Track your order in real time and receive medicines at your doorstep',
  },
  {
    title: 'Guaranteed Quality',
    icon: CheckCircle,
    description: 'All medicines are authentic and come with quality guarantees',
  },
];

export function TrustAndProcessSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            How MediStore Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Four simple steps to get quality medicines delivered to your home safely and securely.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent" />
                )}

                {/* Card */}
                <div className="group flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300">
                  {/* Step Number */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-900/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Why Trust MediStore?</h3>
            <p className="text-slate-600 dark:text-slate-400">Industry-leading standards and certifications</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">99.9%</div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Assured Delivery</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">10K+</div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">24/7</div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Customer Support</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">100%</div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Authentic Medicine</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
