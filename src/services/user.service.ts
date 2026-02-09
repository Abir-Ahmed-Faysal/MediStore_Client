import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();



      const res = await fetch(`${AUTH_URL}/get-session`, {
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
     console.log("hit the get session =====...>");
    try {
      const cookieStore = await cookies();



      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });


      const session = await res.json();


      if (session?.user === null) {
        return { data: null, error: { message: "Session is missing." } };
      }



      const role: any = await fetch(`${AUTH_URL}/me`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const roleData = await role.json();



      if (roleData?.role) {
        session.user.role = roleData?.role
      }

      console.log("thi i s role data",roleData.role,"this is session data",session ,"from the services");


      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },



  getUsers: async function () {
    try {
      const cookieStore = await cookies()

      const res = await fetch(`${API_URL}/admin/users`, {
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

      const res = await fetch(`${API_URL}/admin/users/${id}/ban`, {
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


  UnBanUser: async function (id: string) {
    try {
      const cookieStore = await cookies()

      const res = await fetch(`${API_URL}/admin/users/${id}/unban`, {
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
  }


};
