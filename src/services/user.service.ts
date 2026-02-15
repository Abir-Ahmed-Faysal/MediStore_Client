import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL


export type UpdateUserPayload = {
  name?: string;
  image?: string;
  phone?: string;
  address?: string;
};




export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
         credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },


getSessionWithRole: async function () {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { data: null, error: { message: "Unauthorized" } };
    }

    const session = await res.json();

    if (!session || !session.user) {
      return { data: null, error: { message: "Session is missing." } };
    }

    const roleRes = await fetch(`${AUTH_URL}/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (roleRes.ok) {
      const roleData = await roleRes.json();

      if (roleData?.role) {
        session.user.role = roleData.role;
      }
    }

    return { data: session, error: null };

  } catch (err) {
    console.error("Session Error:", err);
    return { data: null, error: { message: "Something Went Wrong" } };
  }
},



  getUsers: async function () {
    try {
      const cookieStore = await cookies()

      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/users`, {
        headers: {
          cookie: cookieStore.toString()
        },
        cache: "no-store"
      })

      if (!res.ok) {
        return { data: null, error: { message: "invalid server response" } }
      }

      const json = await res.json()
      return { data: json?.data, error: null }

    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "internal server error" } }
    }
  },


  banUser: async function (id: string) {

    try {
      const cookieStore = await cookies()

      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/users/${id}/ban`, {
        method: "PATCH"
        ,
        headers: {
          cookie: cookieStore.toString()
        },
        cache: "no-store"
      })


     

      if (!res.ok) {
        return { data: null, error: { message: "invalid server response" } }
      }

      const json = await res.json()

     

      return { data: json.data, error: null }

    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "internal server error" } }
    }
  },


  UnBanUser: async function (id: string) {
    try {
      const cookieStore = await cookies()

      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/users/${id}/unban`, {
        method: "PATCH",
        headers: {
          cookie: cookieStore.toString()
        },
        cache: "no-store"
      })

      if (!res.ok) {
        return { data: null, error: { message: "invalid server response" } }
      }

      const json = await res.json()


      return { data: json, error: null }

    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "internal server error" } }
    }
  },

  updateUserData: async function (
    payload: UpdateUserPayload
  ) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${NEXT_PUBLIC_API_URL}/user/update-user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Invalid server response" },
        };
      }
      const json = await res.json();

      return { data: json, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: { message: "Internal server error" },
      };
    }
  }


};
