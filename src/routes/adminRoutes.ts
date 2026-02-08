import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Analytics",
        url: "/admin-dashboard",
      },
      {
        title: "Manage categories",
        url: "/admin-dashboard/category",
      },
      {
        title: "Manage orders",
        url: "/admin-dashboard/order",
      },
      {
        title: "Manage users",
        url: "/admin-dashboard/user",
      },
    ],
  },
];
