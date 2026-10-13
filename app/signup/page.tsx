import Link from "next/link";
import AuthForm from "../_lib/AuthForm";
import { signUp } from "../_lib/auth-actions";

export default function SignUpPage() {
  return (
    <main>
      <h1>Sign up</h1>
      <AuthForm
        action={signUp}
        submitLabel="Sign up"
        passwordAutocomplete="new-password"
      />
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
