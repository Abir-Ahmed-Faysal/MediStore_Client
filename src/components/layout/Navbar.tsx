"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, User, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { Route } from "@/types";
import { adminRoutes } from "@/routes/adminRoutes";
import { sellerRoute } from "@/routes/sellerRotues";
import { userRoutes } from "@/routes/userRoutes";
import {
  MedicineResponse,
  medicineService,
} from "@/services/medicine.service";
import { MedicineDialog } from "./hompgaeMedicineDialouge";
import { searchMedicine } from "@/actions/navbarMedicineAction";


interface NavbarProps {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SELLER" | "USER";
}

export const Navbar = ({ data }: { data: NavbarProps }) => {
  const [userData, setUserData] = useState<NavbarProps | null>(data);
  const [medicine, setMedicine] = useState<MedicineResponse | null>(null);
  const [open, setOpen] = useState(false);

  /* -------- search handler -------- */
const handleSearchChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const value = e.target.value.trim();

  if (!value) {
    setMedicine(null);
    setOpen(false);
    return;
  }

  try {
    const res = await searchMedicine({ search: value });

    if (res && res.data.length > 0) {
      setMedicine(res.data[0]); 
      setOpen(true);
    } else {
      setMedicine(null);
      setOpen(false);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to search medicine");
  }
};


  /* -------- role based menu -------- */
  let roleContent: Route[] = [];

  switch (userData?.role) {
    case "ADMIN":
      roleContent = adminRoutes;
      break;
    case "SELLER":
      roleContent = sellerRoute;
      break;
    case "USER":
      roleContent = userRoutes;
      break;
  }

  /* -------- logout -------- */
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logout successful");
      setUserData(null);
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <section className="border-b">
        <div className="container mx-auto px-4">
          <nav className="hidden lg:flex items-center justify-between gap-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/MediStore.png"
                alt="MediStore"
                className="h-10 dark:invert"
              />
            </Link>

            {/* Search */}
            <div className="flex flex-1 justify-center items-center px-6">
              <input
                onChange={handleSearchChange}
                type="text"
                placeholder="Search medicines..."
                className="w-full max-w-xl rounded-l-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <div className="bg-[rgb(90,191,36)]  rounded-r-md p-2">
                <Search className="text-white  size-5" />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <ModeToggle />

              {!userData && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login/Register</Link>
                </Button>
              )}

              {userData && (
                <>
                  {userData.role === "USER" && (
                    <Button asChild variant="outline" size="icon">
                      <Link href="/dashboard/cart">
                        <ShoppingCart className="size-4" />
                      </Link>
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <User className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>{userData.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {roleContent.map((route) => (
                        <div key={route.title}>
                          <DropdownMenuLabel className="text-xs text-muted-foreground">
                            {route.title}
                          </DropdownMenuLabel>

                          {route.items.map((item) => (
                            <DropdownMenuItem key={item.title} asChild>
                              <Link href={item.url}>{item.title}</Link>
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuSeparator />
                        </div>
                      ))}

                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={handleLogout}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </nav>
          <div className="flex flex-wrap items-center justify-center gap-6 py-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-[rgb(90,191,36)] transition-colors"
            >
              Home
            </Link>

            <Link
              href="/medicine"
              className="hover:text-[rgb(90,191,36)] transition-colors"
            >
              Medicine
            </Link>

            <Link
              href="/register"
              className="hover:text-[rgb(90,191,36)] transition-colors"
            >
              Become a Seller
            </Link>

            <Link
              href="/"
              className="hover:text-[rgb(90,191,36)] transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Medicine Dialog */}
      {medicine && (
        <MedicineDialog
          open={open}
          onOpenChange={setOpen}
          data={medicine}
        />
      )}
    </>
  );
};
