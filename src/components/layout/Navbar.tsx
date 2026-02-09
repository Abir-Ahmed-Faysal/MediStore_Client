"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

interface NavbarProps {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SELLER" | "USER";
}

/* ================= COMPONENT ================= */

export const Navbar = ({ data }: { data: NavbarProps }) => {
  const [userData, setUserData] = useState<NavbarProps | null>(data);

  console.log(userData, "<...=== form the user");

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
    default:
      roleContent = [];
  }

  /* -------- logout -------- */
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logout successful");
      setUserData(null);
    } catch (error) {
      toast.success("Logout failed");
    }
  };

  return (
    <>
      <section className="border-b">
        <div className="container mx-auto px-4">
          {/* ================= DESKTOP ================= */}
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
            <div className="flex flex-1 justify-center px-6">
              <input
                type="text"
                placeholder="Search medicines..."
                className="w-full max-w-xl rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <ModeToggle />

              {!userData && (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/login">Login</Link>
                  </Button>
                </>
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
                        className="text-red-500 hover:text-red-600"
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

          {/* ================= MOBILE ================= */}
          <div className="flex items-center justify-between py-3 lg:hidden">
            <Link href="/">
              <img
                src="/images/MediStore.png"
                className="h-8 dark:invert"
                alt="logo"
              />
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>MediStore</SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-4">
                  <input
                    placeholder="Search medicines..."
                    className="rounded-md border px-4 py-2"
                  />

                  {!userData && (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Register</Link>
                      </Button>
                    </>
                  )}

                  {userData && (
                    <>
                      {roleContent.flatMap((r) =>
                        r.items.map((item) => (
                          <Button key={item.title} asChild variant="ghost">
                            <Link href={item.url}>{item.title}</Link>
                          </Button>
                        )),
                      )}

                      <Button variant="outline" onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      {/* ================= USER SECONDARY NAV ================= */}
      {userData?.role === "USER" && (
        <div className="border-b">
          <div className="container mx-auto flex justify-center gap-8 py-3 text-sm font-medium">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/medicine" className="hover:text-primary">
              Medicines
            </Link>
            <Link href="/about" className="hover:text-primary">
              About Us
            </Link>
            <Link href="/follow" className="hover:text-primary">
              Follow Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
