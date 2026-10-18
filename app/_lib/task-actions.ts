"use server";

import { revalidatePath } from "next/cache";
import { isSkill, type Skill } from "./skills";
import { createClient } from "./supabase-server";

// One row of the tasks table, as the page uses it.
// skill is null for tasks added before skills existed; done_at is when the
// task was last ticked Done (null if it isn't done).
export type Task = {
  id: number;
  text: string;
  done: boolean;
  skill: Skill | null;
  done_at: string | null;
};

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
  // The dropdown already insists on a skill; this catches anything that
  // slips past it, so no task is ever saved without one.
  const skill = String(formData.get("skill") ?? "");
  if (!isSkill(skill)) {
    return { error: "Pick a skill for this task." };
  }

  const supabase = await createClient();
  // user_id is filled in by the database (default auth.uid()), so the browser
  // can't save a task under someone else's account.
  const { error } = await supabase.from("tasks").insert({ text, skill });
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
  // done_at records when the task was finished, for the 7-day skill summary.
  // The time comes from this server, not the browser.
  await supabase
    .from("tasks")
    .update({ done, done_at: done ? new Date().toISOString() : null })
    .eq("id", id);

  revalidatePath("/");
}
