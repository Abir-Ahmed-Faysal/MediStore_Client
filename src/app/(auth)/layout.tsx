import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Logo */}
      <Link href="/">
        <div className="relative lg:w-60 lg:h-20 w-40 h-16 mt-6">
          <Image
            src="/images/MediStore.png"
            alt="MediStore"
            fill
            priority
            className="object-contain"
          />
        </div>
      </Link>

      {/* Auth content */}
      <main className="w-full flex-1 flex justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
