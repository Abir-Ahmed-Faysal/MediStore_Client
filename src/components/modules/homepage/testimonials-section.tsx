import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content:
        "MediStore made it so easy to get my prescriptions delivered. Fast delivery and excellent customer service!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Dr. Ahmad Hassan",
      role: "Healthcare Professional",
      content:
        "A reliable platform for patients to access quality medicines. The inventory is always well-stocked.",
      rating: 5,
      avatar: "AH",
    },
    {
      name: "Emma Williams",
      role: "Regular Customer",
      content:
        "I've been using MediStore for over a year now. Never disappointed with their service and pricing.",
      rating: 5,
      avatar: "EW",
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content:
        "The app is user-friendly and the medicines arrive in perfect condition. Highly recommended!",
      rating: 5,
      avatar: "MC",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            What Our Customers Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Read testimonials from satisfied customers who trust MediStore for their healthcare needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 dark:text-slate-300 mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
