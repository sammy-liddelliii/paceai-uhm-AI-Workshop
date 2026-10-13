import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { createClient } from "./_lib/supabase-server";
import { signOut } from "./_lib/auth-actions";

export const metadata: Metadata = {
  title: "Sammy Liddell",
  description: "A freshman at UH Manoa studying computer engineering.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Look up who is signed in so the bar at the top of every page can say so.
  // getUser() checks with Supabase rather than trusting the cookie alone.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <nav className="auth-bar">
          {user ? (
            <>
              <span>Signed in as {user.email}</span>
              <form action={signOut}>
                <button type="submit" className="link-button">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">Log in</Link>
              <Link href="/signup">Sign up</Link>
            </>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
