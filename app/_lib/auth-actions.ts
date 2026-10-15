"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase-server";

// What a sign-up or log-in form shows after it is submitted.
export type AuthFormState = { error: string | null };

export async function signUp(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    // Supabase's own message, e.g. "Password should be at least 6 characters".
    return { error: error.message };
  }

  // Email confirmation is off in Supabase, so the new account is already
  // signed in. Send them to the home page, which shows "Signed in as".
  redirect("/");
}

export async function logIn(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // Same message for a wrong password and an unknown email, so the page
    // doesn't reveal which emails have accounts.
    return { error: "Wrong email or password. Please try again." };
  }

  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
