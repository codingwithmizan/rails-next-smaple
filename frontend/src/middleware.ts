import { NextResponse, type NextRequest } from "next/server";
import { auth, signOut } from "@/auth";

export const middleware = async (req: NextRequest) => {
  const session = await auth();
  const publicRoutes = ["/login", "/signup", "/about"];

  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!session?.user) {
    await signOut({ redirect: false });
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
