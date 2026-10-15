"use client";

import { useActionState } from "react";
import type { AuthFormState } from "./auth-actions";

type Props = {
  action: (prev: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  submitLabel: string;
  // Browser hint for password managers: "new-password" or "current-password".
  passwordAutocomplete: string;
};

// The email + password form shared by the sign-up and log-in pages.
// useActionState keeps the error message on screen after a failed submit.
export default function AuthForm({
  action,
  submitLabel,
  passwordAutocomplete,
}: Props) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="auth-form">
      <label>
        Email
        <input type="email" name="email" required autoComplete="email" />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          required
          autoComplete={passwordAutocomplete}
        />
      </label>
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending}>
        {pending ? "Please wait…" : submitLabel}
      </button>
    </form>
  );
}
