import { Button, Input } from "@base-ui/react";
import { Label } from "@radix-ui/react-label";
import {
  Home,
  Package,
  MapPin,
  Heart,
  LogOut,
  Search,
  Calendar,
  Trash2,
  Plus,
  Edit,
  Badge,
} from "lucide-react";
import Link from "next/link";
import React from "react";

// className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
//                   activeTab === item.id
//                     ? "bg-gray-100 text-gray-900"
//                     : "text-gray-600 hover:bg-gray-50"
//                 }`}

export const ProfileSidebar = ({ children }: { children: React.ReactNode }) => {
  const menuItems = [
    { id: "account", icon: Home, label: "Account Information" },
    { id: "orders", icon: Package, label: "Order Details" },
    { id: "addresses", icon: MapPin, label: "Delivery Address" },
    { id: "wishlist", icon: Heart, label: "Wishlist" },
    { id: "logout", icon: LogOut, label: "Logout" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link href={item.id} key={item.id}>
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        {children}
      </div>
    </div>
  );
};
