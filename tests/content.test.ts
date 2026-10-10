/** Invariants over the page's data, so a typo can't ship a broken entry. */
import { describe, expect, test } from "vitest";
import {
  credentials,
  projects,
  research,
  work,
  writing,
} from "../src/data/profile";

const isHttps = (href: string) => {
  const url = new URL(href);
  return url.protocol === "https:";
};

describe("work", () => {
  test("lists Harf first, then Groww", () => {
    expect(work.map((j) => j.company).slice(0, 2)).toEqual([
      "Harf Studios",
      "Groww",
    ]);
  });

  test("every role has a title and a start", () => {
    for (const job of work) {
      expect(job.roles.length, job.company).toBeGreaterThan(0);
      for (const role of job.roles) {
        expect(role.title).toBeTruthy();
        expect(role.start).toBeTruthy();
      }
    }
  });
});

describe("projects", () => {
  test("have unique names", () => {
    const names = projects.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  test("each links somewhere real, over https", () => {
    for (const project of projects) {
      expect(project.links.length, project.name).toBeGreaterThan(0);
      for (const link of project.links) {
        expect(isHttps(link.href), link.href).toBe(true);
        expect(["Live", "Code"]).toContain(link.label);
      }
    }
  });

  test("say what they are in a sentence or two, not a paragraph", () => {
    for (const project of projects) {
      expect(project.description.length, project.name).toBeLessThan(320);
      expect(project.stack.length, project.name).toBeGreaterThan(0);
    }
  });
});

describe("links elsewhere", () => {
  test("are all https", () => {
    const hrefs = [
      research.arxiv.href,
      ...writing.map((a) => a.href),
      ...credentials.flatMap((c) => (c.href ? [c.href] : [])),
      ...work.flatMap((j) => [j.href, ...(j.links ?? []).map((l) => l.href)]),
    ];
    for (const href of hrefs) expect(isHttps(href), href).toBe(true);
  });
});

describe("the copy", () => {
  test("doesn't lean on em dashes", () => {
    const all = JSON.stringify({ work, projects, research, writing });
    expect(all).not.toContain("—");
  });
});
