import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-xl">
        
        {/* 404 Number */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tight">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 leading-relaxed">
          Sorry, the page you are looking for doesn’t exist or may have been moved.
          Please check the URL or return to the homepage.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto px-6 py-5 text-base">
              Go to Home
            </Button>
          </Link>

          <Link href="/contact">
            <Button variant="outline" className="w-full sm:w-auto px-6 py-5 text-base">
              Contact Support
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
