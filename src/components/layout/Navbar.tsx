"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ModeToggle } from "./ModeToggle";
import { logout } from "@/actions/logoutAction";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export type UserDataType = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    cart: {
      title: string;
      url: string;
    };
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  data?: {
    session: any;
    user: UserDataType;
  };
}

const Navbar = ({
  data,
  logo = {
    url: "/",
    src: "./images/MediStore.png",
    alt: "logo",
    title: "MediStore",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Medicines", url: "/medicine" },
    { title: "My order", url: "/orders" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    cart: { title: "Cart", url: "/cart" },
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const existUserData = data?.user?.email;

  const [userData, setUserData] = useState(existUserData);

  const handleLogout = async () => {
    const logOut = await authClient.signOut();
    if (logOut) {
      toast.success("logout successful");
      setUserData(undefined);
      return;
    }
    if (!logout) {
      toast.error("login failed");
    }
  };

  const deskTab = userData ? (
    <div className="flex gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href={auth.cart.url}>{auth.cart.title}</Link>
      </Button>

      <Button variant="outline" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href={auth.login.url}>{auth.login.title}</Link>
      </Button>
      <Button asChild size="sm">
        <Link href={auth.signup.url}>{auth.signup.title}</Link>
      </Button>
    </div>
  );

  return (
    <section className={cn(className)}>
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-16 dark:invert"
                alt={logo.alt}
              />
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-2">
            <ModeToggle />
            {deskTab}
          </div>
        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url}>
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url}>
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {userData ? (
                      <>
                        <Button asChild variant="outline">
                          <Link href={auth.cart.url}>{auth.cart.title}</Link>
                        </Button>
                        <Button variant="outline" onClick={handleLogout}>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild>
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => (
  <NavigationMenuItem key={item.title}>
    <NavigationMenuLink
      asChild
      className="group inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
    >
      <Link href={item.url}>{item.title}</Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
);

const renderMobileMenuItem = (item: MenuItem) => (
  <Link key={item.title} href={item.url} className="text-md font-semibold">
    {item.title}
  </Link>
);

export { Navbar };
