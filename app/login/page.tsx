import Link from "next/link";
import AuthForm from "../_lib/AuthForm";
import { logIn } from "../_lib/auth-actions";

export default function LogInPage() {
  return (
    <main>
      <h1>Log in</h1>
      <AuthForm
        action={logIn}
        submitLabel="Log in"
        passwordAutocomplete="current-password"
      />
      <p>
        No account yet? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
