"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase-server";

// One row of the tasks table, as the page uses it.
export type Task = { id: number; text: string; done: boolean };

// What the add-task form shows after it is submitted.
export type AddTaskState = { error: string | null };

// Longest task text we accept. The add box and the database use the same
// limit. (A "use server" file may only export functions, hence a plain const.)
const MAX_TASK_LENGTH = 200;

export async function addTask(
  _prev: AddTaskState,
  formData: FormData,
): Promise<AddTaskState> {
  const text = String(formData.get("text") ?? "").trim();
  if (text === "") {
    return { error: "Type a task first." };
  }
  if (text.length > MAX_TASK_LENGTH) {
    return { error: `Keep tasks under ${MAX_TASK_LENGTH} characters.` };
  }

  const supabase = await createClient();
  // user_id is filled in by the database (default auth.uid()), so the browser
  // can't save a task under someone else's account.
  const { error } = await supabase.from("tasks").insert({ text });
  if (error) {
    return { error: "Couldn't save that task. Are you still signed in?" };
  }

  // Re-render the home page so the new task shows up in the list.
  revalidatePath("/");
  return { error: null };
}

export async function setTaskDone(formData: FormData) {
  const id = Number(formData.get("id"));
  const done = formData.get("done") === "true";

  const supabase = await createClient();
  // Row level security only lets this update touch the signed-in user's own
  // rows, so a made-up id belonging to someone else changes nothing.
  await supabase.from("tasks").update({ done }).eq("id", id);

  revalidatePath("/");
}
