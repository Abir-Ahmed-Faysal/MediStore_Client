'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart, LogOut, Home, LogIn, UserPlus, Settings, Heart, Bell } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ModeToggle } from './ModeToggle';
import { authClient } from '@/lib/auth-client';
import { Route } from '@/types';
import { adminRoutes } from '@/routes/adminRoutes';
import { sellerRoute } from '@/routes/sellerRotues';
import { userRoutes } from '@/routes/userRoutes';
import { MedicineResponse } from '@/services/medicine.service';
import { MedicineDialog } from './hompgaeMedicineDialouge';
import { searchMedicine } from '@/actions/navbarMedicineAction';

interface NavbarProps {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SELLER' | 'USER';
}

export const Navbar = ({ data }: { data: NavbarProps }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [medicine, setMedicine] = useState<MedicineResponse | null>(null);
  const [open, setOpen] = useState(false);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      toast.error('Failed to search medicine');
    }
  };

  let roleContent: Route[] = [];
  switch (data?.role) {
    case 'ADMIN':
      roleContent = adminRoutes;
      break;
    case 'SELLER':
      roleContent = sellerRoute;
      break;
    case 'USER':
      roleContent = userRoutes;
      break;
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success('Logout successful');
      window.location.reload();
    } catch {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Medicines', href: '/explore' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/95 dark:border-slate-800">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <Image
                src="/images/MediStore.png"
                alt="MediStore"
                width={32}
                height={32}
                className="dark:invert transition-transform group-hover:scale-105"
                priority
              />
              <span className="font-bold text-lg hidden lg:inline text-slate-900 dark:text-white">MediStore</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  onChange={handleSearchChange}
                  type="text"
                  placeholder="Search medicines..."
                  aria-label="Search for medicines by name or category"
                  className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-900 dark:border-slate-700 dark:text-white transition-all"
                />
                <button
                  aria-label="Submit search"
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <ModeToggle />

              {!data ? (
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/auth/login" className="flex items-center gap-1">
                      <LogIn className="w-4 h-4" />
                      <span className="hidden sm:inline">Login</span>
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/auth/register" className="flex items-center gap-1">
                      <UserPlus className="w-4 h-4" />
                      <span className="hidden sm:inline">Sign Up</span>
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  {data.role === 'USER' && (
                    <Button asChild variant="ghost" size="icon">
                      <Link href="/dashboard/cart" title="Shopping Cart">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="sr-only">Cart</span>
                      </Link>
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        aria-label={`User menu for ${data.name}`}
                        aria-haspopup="true"
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-semibold">
                          {data.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{data.name}</span>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>{data.name}</DropdownMenuLabel>
                      <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">{data.email}</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {roleContent.map((route) => (
                        <div key={route.title}>
                          <DropdownMenuLabel className="text-xs text-muted-foreground">{route.title}</DropdownMenuLabel>

                          {route.items.map((item) => (
                            <DropdownMenuItem key={item.title} asChild>
                              <Link href={item.url}>{item.title}</Link>
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuSeparator />
                        </div>
                      ))}

                      <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between h-14">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image src="/images/MediStore.png" alt="MediStore" width={28} height={28} className="dark:invert" />
            </Link>

            <div className="flex items-center gap-2">
              <ModeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden pb-4 border-t border-slate-200 dark:border-slate-700">
              {/* Mobile Search */}
              <div className="py-3 px-2">
                <input
                  onChange={handleSearchChange}
                  type="text"
                  placeholder="Search medicines..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                />
              </div>

              {/* Mobile Links */}
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth */}
              <div className="border-t border-slate-200 dark:border-slate-700 py-2 mt-2 space-y-1">
                {!data ? (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    {roleContent.map((route) => (
                      <div key={route.title} className="border-t border-slate-100 dark:border-slate-800 pt-2 mt-2">
                        <h3 className="px-4 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">{route.title}</h3>
                        {route.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.url}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors border-t border-slate-200 dark:border-slate-700 mt-2 pt-2">
                      <LogOut className="inline w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Medicine Dialog */}
      {medicine && <MedicineDialog open={open} onOpenChange={setOpen} data={medicine} />}
    </>
  );
};
