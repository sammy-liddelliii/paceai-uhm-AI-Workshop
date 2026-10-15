# SALVATAR

A study task list for language learners: sign in, add study tasks tagged by skill, see which skill you have been avoiding. Repository: sammy-liddelliii/paceai-uhm-AI-Workshop.

## Stack
- Next.js with the App Router, TypeScript
- Plain CSS (no Tailwind, no CSS-in-JS libraries)
- Supabase for sign-in and the database
- Deployed on Vercel. Every pushed branch gets a preview link on its pull request; merging to main deploys the live site.

## Commands
Run from the repository root. These exist only once package.json exists; if one is missing, say so instead of adding it.
- `npm install` installs the dependencies already listed in package.json
- `npm run dev` runs the site locally
- `npm run build` checks the site builds the way Vercel will build it; run it before every push
- `npm run lint` checks code style

## Never
- Add a dependency without asking first.
- Edit .env or any environment variable.
- Change auth configuration without saying what is changing and why.
- Create new top-level folders. If work seems to need one, stop and ask me.
- Add a new library, service, or account without asking first.
- Merge a pull request. Push the branch, open a draft pull request, and stop.
- Edit roadmap.md, project-state.md, or CLAUDE.md during feature work. Only a separate docs session edits them.
- Put passwords, API keys, or connection strings in code, prompts, or any file in the repository.
- Use real personal data. Fake names and fake content only.
- Work on anything outside the slice marked ACTIVE.

## Conventions
- One pull request per slice or smaller. Its description lists the slice's done-criteria and says how to check each one on the Vercel preview link.
- Explain every change in plain language in the pull request description, not only in code, so I can explain it at a live session.
- Every database table holding user data has row level security turned on, so each user can read and change only their own rows.
- Database changes: put the SQL in the pull request description with a plain-language note on what it does. I run it myself in the Supabase SQL editor.
- Read environment variables by name only; never hard-code their values.
- Prefer simple, readable code over clever code; comment anything non-obvious.

## Current focus
See roadmap.md, work only on the slice marked ACTIVE.
