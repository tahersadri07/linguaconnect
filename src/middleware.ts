import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Auth-protected routes
    const isDashboard = pathname.startsWith("/dashboard");
    const isAdmin = pathname.startsWith("/admin");

    if (isDashboard || isAdmin) {
        // Check Supabase session cookie
        const token =
            request.cookies.get("sb-access-token")?.value ||
            request.cookies.get("sb-auth-token")?.value;

        if (!token) {
            const signInUrl = new URL("/sign-in", request.url);
            signInUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};
