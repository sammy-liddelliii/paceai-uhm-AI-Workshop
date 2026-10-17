import AddTaskForm from "./_lib/AddTaskForm";
import TaskItem from "./_lib/TaskItem";
import { createClient } from "./_lib/supabase-server";
import type { Task } from "./_lib/task-actions";

// Edit this list to update the "This semester" section.
const thisSemester = [
  "Taking an intro programming course",
  "Working through first-year calculus",
  "Joining a hands-on engineering club",
];

export default async function Home() {
  // Signed-in visitors see their study tasks at the top of the page.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let tasks: Task[] = [];
  if (user) {
    // Row level security means this only ever returns the signed-in user's
    // own tasks, even though the query doesn't filter by user.
    const { data } = await supabase
      .from("tasks")
      .select("id, text, done")
      .order("created_at", { ascending: true });
    tasks = data ?? [];
  }

  return (
    <>
      <header className="hero">
        <h1>Sammy Liddell</h1>
        <p className="tagline">
          A freshman at UH Manoa studying computer engineering.
        </p>
      </header>

      <main>
        {user && (
          <section>
            <h2>My study tasks</h2>
            <AddTaskForm />
            {tasks.length === 0 ? (
              <p className="muted">No tasks yet. Add one above.</p>
            ) : (
              <ul className="task-list">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </ul>
            )}
          </section>
        )}

        <section>
          <h2>This semester</h2>
          <ul>
            {thisSemester.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>About</h2>
          <p>
            I&apos;m a freshman at the University of Hawaiʻi at Mānoa, studying
            computer engineering. I&apos;m just getting started and excited to
            learn how hardware and software work together. This site is where
            I&apos;ll share what I&apos;m learning along the way.
          </p>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Sammy Liddell · Built with Claude Code</p>
      </footer>
    </>
  );
}
