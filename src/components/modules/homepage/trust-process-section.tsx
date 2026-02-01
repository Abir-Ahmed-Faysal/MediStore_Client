const steps = [
  {
    title: "Browse Medicines",
    icon: "🛒",
    description: "Explore medicines from verified sellers",
  },
  {
    title: "Place Order",
    icon: "📦",
    description: "Simple checkout with Cash on Delivery",
  },
  {
    title: "Fast Delivery",
    icon: "🚚",
    description: "Track your order in real time",
  },
  {
    title: "Review Products",
    icon: "⭐",
    description: "Share feedback after delivery",
  },
];

export function TrustAndProcessSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">

        <h2 className="mb-12 text-center text-3xl font-semibold">
          How MediStore Works
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center space-y-3"
            >
              <span className="text-5xl">{step.icon}</span>
              <h3 className="font-semibold text-lg">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
