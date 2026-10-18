// The six skills a study task can be tagged with. The database only accepts
// these exact names (see the check rule on the tasks.skill column).
export const SKILLS = [
  "Reading",
  "Writing",
  "Listening",
  "Speaking",
  "Vocabulary",
  "Grammar",
] as const;

export type Skill = (typeof SKILLS)[number];

export function isSkill(value: string): value is Skill {
  return (SKILLS as readonly string[]).includes(value);
}

// How far back the summary looks when counting finished tasks.
const SUMMARY_DAYS = 7;

export type SkillCount = { skill: Skill; count: number; avoiding: boolean };

// Counts the tasks finished in each skill over the last 7 days, and marks the
// skill (or skills, if several tie) with the lowest count as "avoiding".
export function summarizeSkills(
  tasks: { skill: string | null; done: boolean; done_at: string | null }[],
  now: number,
): SkillCount[] {
  const since = now - SUMMARY_DAYS * 24 * 60 * 60 * 1000;

  const counts = SKILLS.map((skill) => ({
    skill,
    count: tasks.filter(
      (t) =>
        t.skill === skill &&
        t.done &&
        t.done_at !== null &&
        new Date(t.done_at).getTime() >= since,
    ).length,
  }));

  const lowest = Math.min(...counts.map((c) => c.count));
  return counts.map((c) => ({ ...c, avoiding: c.count === lowest }));
}
