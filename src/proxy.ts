import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { userService } from "./services/user.service"
import { Role } from "./constants/roles"

export async function proxy(request: NextRequest) {

   const { pathname } = request.nextUrl

    const {data}= await userService.getSessionWithRole()

    const role= "USER"

    
    // const role = data?.role



    // // not logged in
    // if (!role) {
    //     return NextResponse.redirect(new URL("/login", request.url))
    // }

    // // admin trying to access user dashboard
    // if (role === Role.admin && pathname.startsWith("/dashboard")) {
    //     return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    // }

    // // seller trying to access user/admin dashboard
    // if (role === Role.seller && pathname.startsWith("/dashboard")) {
    //     return NextResponse.redirect(new URL("/seller-dashboard", request.url))
    // }

    // // non-admin accessing admin dashboard
    // if (role !== Role.admin && pathname.startsWith("/admin-dashboard")) {
    //     return NextResponse.redirect(new URL("/dashboard", request.url))
    // }

    // // non-seller accessing seller dashboard
    // if (role !== Role.seller && pathname.startsWith("/seller-dashboard")) {
    //     return NextResponse.redirect(new URL("/dashboard", request.url))
    // }

    return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/seller-dashboard/:path*",
  ],
}
