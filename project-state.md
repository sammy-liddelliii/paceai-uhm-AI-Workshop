# Project state
Last updated: 2026-10-18

## Works
- GitHub repository sammy-liddelliii/paceai-uhm-AI-Workshop exists, default branch main.
- Production site: https://salvatar.vercel.app (Vercel project SALVATAR). Supabase project at https://tmwcyfhdltiitsnsoixb.supabase.co.
- Planning docs: roadmap.md, project-state.md, CLAUDE.md.
- Slice 1 (sign up and log in) is live on the production site. All four done-criteria checks (a)-(d) passed on 2026-10-15.
- On the live site, a person can create an account with an email and a password, and they are signed in straight away.
- Once signed in, the site shows "Signed in as" followed by their email.
- A person can sign out, and a "Log in" link appears where their email was.
- If a person logs in with the wrong password, they see an error message and stay on the log-in page.
- A person who closes the tab and opens the site again is still signed in.
- Slice 2 (tasks that stay) is live on the production site.
- Once signed in, a person can type a study task into the add box and press Add, and it appears in their list.
- A person's tasks are still there after they reload the page or sign out and back in.
- A person can tick a task's Done checkbox, and it stays ticked after a reload.
- A person sees only their own tasks, never another account's.
- Slice 3 (skill tags and the avoided skill) is live on the production site.
- When adding a task, a person must pick one of six skills from a dropdown: Reading, Writing, Listening, Speaking, Vocabulary, or Grammar. If they press Add without picking one, they see "Pick a skill for this task." and no task is added.
- Each task in the list shows the skill it was tagged with.
- Under the add box, a "Finished in the last 7 days" summary shows how many tasks the person finished in each of the six skills over the last 7 days.
- The skill with the lowest count is labeled "Avoiding". If several skills tie for lowest, all of them get the label.
- Tasks added before slice 3 have no skill, so they do not count in the summary.

## Broken or flaky
- package.json has no lint script, so `npm run lint` (listed in CLAUDE.md) does not work. Only dev, build, and start exist.

## Environment notes
- Stack: Next.js (App Router), TypeScript, plain CSS, Supabase, deployed on Vercel.
- Every pushed branch gets a Vercel preview link on its pull request; merging to main deploys the live site.
- Keys and passwords live only in Vercel > SALVATAR > Settings > Environment Variables. Never in chat, prompts, or repository files.
- Supabase client libraries (@supabase/supabase-js and @supabase/ssr) are installed.
- Supabase's built-in email sender has a low hourly limit, so confirmation emails may stop arriving during heavy testing. Space out test sign-ups.
- Only fake names and fake content in the app.

## Next session
- Start Slice 2 (tasks that stay) in a new Claude Code session. It needs a tasks table with row level security; the SQL goes in the pull request for me to run in the Supabase SQL editor.
- Decide: add a lint script to package.json, or remove `npm run lint` from CLAUDE.md (docs session).
