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

## Broken or flaky
- No task features exist yet: no adding, saving, or completing tasks.
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
