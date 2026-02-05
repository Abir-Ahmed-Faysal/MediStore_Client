"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Package, MapPin, Heart, LogOut, Menu, X } from "lucide-react";

const menuItems = [
  { id: "", icon: Home, label: "Account Information" },
  { id: "orders", icon: Package, label: "Order Details" },
  { id: "addresses", icon: MapPin, label: "Delivery Address" },
  { id: "wishlist", icon: Heart, label: "Wishlist" },
  { id: "logout", icon: LogOut, label: "Logout" },
];

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------------- Mobile Header ---------------- */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b sticky top-0 z-40">
        <h2 className="font-semibold text-lg">My Profile</h2>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* ---------------- Mobile Drawer ---------------- */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Menu</h3>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={`/profile/${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* ---------------- Desktop / Tablet Layout ---------------- */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-6 h-[calc(100vh-120px)] bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={`/profile/${item.id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow-sm p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
