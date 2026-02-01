import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-slate-50 to-slate-100 py-20">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-2 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Your Trusted Online Medicine Shop
          </h1>

          <p className="text-muted-foreground text-lg">
            Buy genuine medicines online from verified sellers. Fast delivery,
            secure checkout, and reliable service — all in one place.
          </p>

          <div className="flex gap-4">
            <Button size="lg">
              Shop Medicines
            </Button>
            <Button size="lg" variant="outline">
              Become a Seller
            </Button>
          </div>
        </div>

        {/* Right Illustration */}
<div className="relative flex justify-center w-full">
  <Image   loading="eager"
    src="/images/medistorebd_hero.jpg"
    alt="Online Medicine Store"
    className="object-contain"
    width={1200} // image original width
    height={800} // image original height
    sizes="(max-width: 640px) 100vw, 
           (max-width: 768px) 75vw, 
           (max-width: 1024px) 50vw, 
           33vw"
  />
</div>

      </div>
    </section>
  );
}
