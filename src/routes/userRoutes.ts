import { Route } from "@/types";

export const userRoutes: Route[] = [
  {
    title: "My Dashboard",
    items: [
      {
        title: "Profile",
        url: "/dashboard",
      },
      {
        title: "My cart",
        url: "/dashboard/cart",
      },
      {
        title: "My orders",
        url: "/dashboard/my-order",
      },
    ],
  },
];
