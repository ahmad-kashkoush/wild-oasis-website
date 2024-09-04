import { auth } from "@/app/_lib/auth";

/* Customizable middle ware
export function middleware(request) {
    //if you left it this way, you'll have infinite loop of redirecting to /about
    // solution is to use matcher
    return NextResponse.redirect(new URL("/about", request.url));
}
    */
export const middleware = auth;// to get authentication middleware

export const config = {
    matcher: ["/account"],
}