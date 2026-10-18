"use client";

import { useActionState } from "react";
import { SKILLS } from "./skills";
import { addTask } from "./task-actions";

// The "add box" above the task list, with a dropdown to pick the task's skill.
// React clears the form after each submit; useActionState keeps an error
// message on screen if saving failed.
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
      <label htmlFor="new-task-skill" className="visually-hidden">
        Skill
      </label>
      <select
        id="new-task-skill"
        name="skill"
        required
        defaultValue=""
        // Without a skill the browser refuses to submit and shows this
        // message, so the typed text is kept and no task is added.
        onInvalid={(e) =>
          e.currentTarget.setCustomValidity("Pick a skill for this task.")
        }
        onChange={(e) => e.currentTarget.setCustomValidity("")}
      >
        <option value="" disabled>
          Skill…
        </option>
        {SKILLS.map((skill) => (
          <option key={skill} value={skill}>
            {skill}
          </option>
        ))}
      </select>
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
