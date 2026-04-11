import { Role } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * BFF Pattern - Backend For Frontend
 * Handles session validation, role-based routing, and graceful error handling
 * 
 * Rules:
 * 1. Authenticated users cannot access auth pages
 * 2. Public routes are always accessible
 * 3. Unauthenticated users cannot access protected routes
 * 4. Role-based redirect enforcement
 */

async function getSessionIfValid(request: NextRequest) {
  try {
    // Extract session token from better-auth
    // Handle both production (__Secure- prefix) and dev (no prefix)
    const sessionToken = 
      request.cookies.get("__Secure-better-auth.session_token")?.value ||
      request.cookies.get("better-auth.session_token")?.value;
    
    if (!sessionToken) {
      return { isValid: false, data: null };
    }

    // Attempt to fetch session data
    const { data, error } = await userService.getSessionWithRole();
    
    if (error || !data?.user || !data.user.role) {
      return { isValid: false, data: null };
    }

    return { isValid: true, data };
  } catch (err) {
    console.error("Session validation error:", err);
    return { isValid: false, data: null };
  }
}

function isAuthRoute(pathname: string): boolean {
  return ["/login", "/register", "/forgot-password"].some(route => 
    pathname.startsWith(route)
  );
}

function getRouteOwner(pathname: string): string | null {
  // Admin routes
  if (pathname.startsWith("/admin-dashboard")) return "admin";
  // Seller routes
  if (pathname.startsWith("/seller-dashboard")) return "seller";
  // User dashboard routes
  if (pathname.startsWith("/dashboard")) return "user";
  // Public routes
  return null;
}

function getRoleType(role: string): "admin" | "seller" | "user" | null {
  if (role === Role.admin) return "admin";
  if (role === Role.seller) return "seller";
  if (role === Role.user) return "user";
  return null;
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname, search } = request.nextUrl;

    // ----------------------------
    // 1️⃣ Get and validate session
    // ----------------------------
    const { isValid, data } = await getSessionIfValid(request);
    const userRole = data?.user?.role ? getRoleType(data.user.role) : null;
    const isAuthenticated = isValid && userRole;

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // ----------------------------
    // Rule 1: Authenticated users should not access auth routes
    // ----------------------------
    if (isAuth && isAuthenticated) {
      // Redirect to default dashboard for their role
      const defaultRoute = userRole === "admin" ? "/admin-dashboard" : 
                          userRole === "seller" ? "/seller-dashboard" : 
                          "/dashboard";
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }

    // ----------------------------
    // Rule 2: Public routes are always accessible
    // ----------------------------
    if (routeOwner === null) {
      return NextResponse.next();
    }

    // ----------------------------
    // Rule 3: Handle unauthenticated access to protected routes
    // ----------------------------
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      const pathWithQuery = `${pathname}${search}`;
      loginUrl.searchParams.set("redirect", pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    // ----------------------------
    // Rule 4: Role-based route authorization
    // ----------------------------
    if (routeOwner !== userRole && routeOwner !== "common") {
      // User trying to access wrong dashboard
      const defaultRoute = userRole === "admin" ? "/admin-dashboard" : 
                          userRole === "seller" ? "/seller-dashboard" : 
                          "/dashboard";
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    // Match all routes except static assets and API
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
