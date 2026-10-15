# Project state
Last updated: 2026-10-13

## Works
- GitHub repository sammy-liddelliii/paceai-uhm-AI-Workshop exists, default branch main.
- A Vercel project named SALVATAR and a Supabase project at https://tmwcyfhdltiitsnsoixb.supabase.co exist, per my project notes. Not checked this session.
- Planning docs added: roadmap.md, project-state.md, CLAUDE.md.

## Broken or flaky
- No features exist yet: no sign-up, no tasks.
- Unknown whether the repository already contains a Next.js app. The first Slice 1 session checks and reports before changing anything.
- The URL recorded as the live site (https://paceai-uhm-ai-workshop-git-claude-amazing-br-a128d4-sammyl-9193.vercel.app) looks like a preview of one branch, not the production site. Confirm the production URL in Vercel > SALVATAR > Settings > Domains.

## Environment notes
- Stack: Next.js (App Router), TypeScript, plain CSS, Supabase, deployed on Vercel.
- Every pushed branch gets a Vercel preview link on its pull request; merging to main deploys the live site.
- Keys and passwords live only in Vercel > SALVATAR > Settings > Environment Variables. Never in chat, prompts, or repository files.
- Slice 1 will need the Supabase project URL and public key set there as environment variables; exact names to confirm when Slice 1 starts.
- Supabase's built-in email sender has a low hourly limit, so confirmation emails may stop arriving during heavy testing. Space out test sign-ups.
- Only fake names and fake content in the app.

## Next session
- Start Slice 1 (sign up and log in) in a new Claude Code session.
- Decide when asked: approve adding the Supabase client libraries (@supabase/supabase-js and @supabase/ssr).
- Confirm the production URL and update the project instructions.
