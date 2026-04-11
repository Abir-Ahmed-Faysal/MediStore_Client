import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-20 md:py-32 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Trusted by thousands</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
                Your Trusted <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">Online Medicine</span> Shop
              </h1>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg">
                Buy genuine medicines safely online from verified sellers. Get fast delivery, secure checkout, and 24/7 customer support.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/explore">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-12 px-6">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-600 h-12 px-6">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">10,000+</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Medicines Available</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">100%</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Genuine Products</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">24h</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative flex justify-center items-center">
            {/* Background shape */}
            <div className="absolute w-full h-full bg-gradient-to-t from-emerald-100 dark:from-emerald-900/20 to-transparent rounded-3xl blur-2xl" />

            {/* Image */}
            <div className="relative w-full aspect-square flex items-center justify-center">
              <Image
                loading="eager"
                src="/images/medistorebd_hero.jpg"
                alt="Online Medicine Store - MediStore"
                className="object-contain drop-shadow-2xl"
                width={500}
                height={500}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-8 left-4 md:left-0 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-4 max-w-xs border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <span className="text-xl">✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Free Shipping</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">On orders above ৳500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
