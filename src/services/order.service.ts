import { env } from "@/env";
import { Order, SingleApiResponse } from "@/types/sellerOrderDetails";
import { SellerOrderServicesPayload } from "@/types/sellerOrderServicesPayload";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export type OrderStatus =
  | "PLACED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  ;
interface MedicineRef {
  id: string;
  title: string;
  price: string;
  stock: number;
}

interface OrderItems {
  id: string;
  orderId: string;
  medicineId: string;
  quantity: number;
  medicineRef: MedicineRef;
}

export interface SellerOrder {
  id: string;
  userId: string;
  address: string;
  totalAmount: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  userRef: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  orderItems: OrderItems[];
}

export interface SellerOrdersResponse {
  success: boolean;
  message: string;
  data: SellerOrder[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}








export async function postOrder(payload: {
  address: string;
  items: { medicineId: string; quantity: number }[];
}) {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to place order");
  }

  return res.json();
}


export const orderService = {


  getUserOrders: async (payload: {
    params: SellerOrderServicesPayload;
  }): Promise<{
    data: SellerOrdersResponse | null;
    error: { message: string } | null;
  }> => {
    try {
      const { status, page } = payload.params;
      const cookieStore = await cookies();

      const url = new URL(`${API_URL}/orders/user`);

      if (status) {
        url.searchParams.append("status", status);
      }

      url.searchParams.append("page", page.toString());

      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      console.log("this is data promise ==>", res, res.ok, cookieStore);

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch orders" },
        };
      }

      const data: SellerOrdersResponse = await res.json();


      return { data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: { message: "Internal server error" },
      };
    }
  },

  getUserOrderDetails: async function (id: string) {

    try {

      const cookieStore = await cookies()

      const res = await fetch(`${API_URL}/orders/user/${id}`,{
        headers: {
          cookie: cookieStore.toString()
        },
        cache: "no-store"
      })

      if (!res.ok) {
        return { data: null, error: { message: "internal error" } }
      }


      const data = await res.json()


      return { data, error: null }

    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "internal error" } }
    }
  },




  getSellerOrders: async (payload: {
    params: SellerOrderServicesPayload;
  }): Promise<{
    data: SellerOrdersResponse | null;
    error: { message: string } | null;
  }> => {
    try {
      const { status, page } = payload.params;
      const cookieStore = await cookies();

      const url = new URL(`${API_URL}/orders/seller`);

      if (status) {
        url.searchParams.append("status", status);
      }

      url.searchParams.append("page", page.toString());

      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      console.log("this is data promise ==>", res, res.ok, cookieStore);

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch orders" },
        };
      }

      const data: SellerOrdersResponse = await res.json();
      console.log("this is data exist ==>", data, cookieStore);

      return { data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: { message: "Internal server error" },
      };
    }
  },


  getSellerOrderDetails: async (id: string) => {
    try {
      const url = new URL(`${API_URL}/orders/seller/${id}`);

      const cookieStore = await cookies()

      console.log("this is the url ", url.toString());

      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch order" },
        };
      }

      const json = (await res.json()) as SingleApiResponse<Order>;


      console.log('data form the the single seller orders details');

      return {
        data: json.data,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: { message: "Internal server error" },
      };
    }
  },








  getAdminOrders: async (payload: {
    params: SellerOrderServicesPayload;
  }): Promise<{
    data: SellerOrdersResponse | null;
    error: { message: string } | null;
  }> => {
    try {
      const { status, page } = payload.params;
      const cookieStore = await cookies();

      const url = new URL(`${API_URL}/orders/admin`);

      if (status) {
        url.searchParams.append("status", status);
      }

      url.searchParams.append("page", page.toString());

      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      console.log("this is data promise ==>", res, res.ok, cookieStore);

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch orders" },
        };
      }

      const data: SellerOrdersResponse = await res.json();
      console.log("this is data exist ==>", data, cookieStore);

      return { data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: { message: "Internal server error" },
      };
    }
  },

  getAdminOrderDetails: async (id: string) => {
    try {
      const url = new URL(`${API_URL}/orders/admin/${id}`);

      const cookieStore = await cookies()

      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch order" },
        };
      }

      const json = (await res.json()) as SingleApiResponse<Order>;


      console.log('data form the the single seller orders details');

      return {
        data: json.data,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: { message: "Internal server error" },
      };
    }
  },








};
