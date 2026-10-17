"use client";

import type { Task } from "./task-actions";
import { setTaskDone } from "./task-actions";

// One task in the list, with its Done checkbox. Ticking or unticking the box
// submits the little form around it, which saves the change to the database.
export default function TaskItem({ task }: { task: Task }) {
  return (
    <li className={task.done ? "task done" : "task"}>
      <form action={setTaskDone}>
        <input type="hidden" name="id" value={task.id} />
        {/* The value we want after the click: the opposite of now. */}
        <input type="hidden" name="done" value={String(!task.done)} />
        <label>
          <input
            type="checkbox"
            // key makes React redraw the box if the saved value changes.
            key={String(task.done)}
            defaultChecked={task.done}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
          />
          <span className="visually-hidden">Done: </span>
          <span className="task-text">{task.text}</span>
        </label>
      </form>
    </li>
  );
}
