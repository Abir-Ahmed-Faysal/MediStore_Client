import { Route } from "@/types";

export const sellerRoute: Route[] = [
    {
        title: "Product Management",
        items: [
            {
                title: "Analytics",
                url: "/seller-dashboard",
            },
            {
                title: "Manage medicines",
                url: "/seller-dashboard/medicine",
            },
            {
                title: "Manage orders",
                url: "/seller-dashboard/orders",
            },
        ],
    },
];
