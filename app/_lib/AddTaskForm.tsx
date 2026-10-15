"use client";

import { useActionState } from "react";
import { addTask } from "./task-actions";

// The "add box" above the task list. React clears the text box after each
// submit; useActionState keeps an error message on screen if saving failed.
export default function AddTaskForm() {
  const [state, formAction, pending] = useActionState(addTask, {
    error: null,
  });

  return (
    <form action={formAction} className="add-task">
      <label htmlFor="new-task" className="visually-hidden">
        New task
      </label>
      <input
        id="new-task"
        name="text"
        required
        maxLength={200} // same limit as task-actions.ts and the database
        placeholder="e.g. Read one news article"
        autoComplete="off"
      />
      <button type="submit" disabled={pending}>
        {pending ? "Adding…" : "Add"}
      </button>
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
