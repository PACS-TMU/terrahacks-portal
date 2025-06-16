// server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

/**
 * Creates a Supabase client in a Server Component context.
 * Only supports reading cookies (no setting/removing).
 */
export const createClient = () => {
  const cookieStore = (cookies() as unknown as UnsafeUnwrappedCookies);

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // Writing cookies is not allowed in Server Components
      },
    }
  );
};
