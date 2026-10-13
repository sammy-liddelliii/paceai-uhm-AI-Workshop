import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Creates a Supabase client for server code (pages, layouts, server actions).
// It reads and writes the sign-in session through the browser's cookies, which
// is how the site remembers who you are between visits.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Pages and layouts are not allowed to change cookies; only server
            // actions and middleware.ts are. Ignoring this is safe because
            // middleware.ts refreshes the session cookie on every request.
          }
        },
      },
    },
  );
}
