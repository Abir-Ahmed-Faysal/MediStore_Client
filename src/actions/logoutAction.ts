"use server";
import { authClient } from "@/lib/auth-client";

export async function logout() {
  try {
    const data = await authClient.signOut();
    console.log(data);

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    console.error("Logout failed:", error);

    return {
      success: false,
      message: "Logout failed",
    };
  }
}
