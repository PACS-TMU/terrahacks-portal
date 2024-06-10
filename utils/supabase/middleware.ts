import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { Session } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value,
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value: "",
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      },
    );

    // Refresh session if expired
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Redirect to login if no session exists and the path isn't already '/login'
      if (request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/signup' && request.nextUrl.pathname !== '/forgot-password') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } else {
      // Redirect to home if session exists and the path is '/login'
      if (request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};

export const config = {
  matcher: ['/((?!_next/static|favicon.ico).*)'],
};
