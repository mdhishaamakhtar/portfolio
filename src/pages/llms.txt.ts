import type { APIRoute } from "astro";
import { DESCRIPTION, HARF, LINKS, PERSON, SITE_URL } from "../consts";
import { projects, research, work, writing } from "../data/profile";

/**
 * llms.txt: a plain-text map of the site for language models and agents
 * (https://llmstxt.org). Built from the same data as the page, so the two
 * cannot drift apart.
 */
export const GET: APIRoute = () => {
  const lines = [
    `# ${PERSON.name}`,
    "",
    `> ${DESCRIPTION}`,
    "",
    `Website: ${SITE_URL}/`,
    `Email: ${PERSON.email}`,
    `GitHub: ${LINKS.github}`,
    `LinkedIn: ${LINKS.linkedin}`,
    "",
    "## Harf Studios",
    "",
    `- [Harf Studios](${HARF.url}): Co-founded with ${HARF.cofounder} in ${HARF.founded}. Short videos, song lyrics read line by line, and Dars, Volume One, a first book of Urdu.`,
    "",
    "## Work",
    "",
    ...work.map(
      (job) =>
        `- [${job.company}](${job.href}): ${job.roles.map((r) => `${r.title} (${r.start} to ${r.end})`).join("; ")}. ${job.summary}`,
    ),
    "",
    "## Projects",
    "",
    ...projects.map(
      (p) =>
        `- [${p.name}](${p.links[0]?.href ?? SITE_URL}): ${p.tagline}. ${p.description}`,
    ),
    "",
    "## Research",
    "",
    `- [${research.title}](${research.arxiv.href}): ${research.summary}`,
    "",
    "## Writing",
    "",
    ...writing.map((a) => `- [${a.title}](${a.href}): ${a.note}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
