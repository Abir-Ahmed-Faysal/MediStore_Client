import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full bg-[rgb(90,191,36)] bg-leaner-to-r from-slate-50 to-slate-100 py-20">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Your Trusted Online Medicine Shop
          </h1>

          <p className=" text-white text-lg opacity-90">
            Buy genuine medicines online from verified sellers. Fast delivery,
            secure checkout, and reliable service — all in one place.
          </p>

          <div className="flex gap-4">
            {/* <Button size="lg" className="bg-[rgb(1,126,217)]">
              Shop Medicines
            </Button> */}
            <Link   href={"/medicine"}>
              {" "}
              <Button  size="lg" variant="outline">
                Shop now medicines
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative flex justify-center w-full">
          <Image
            loading="eager"
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
