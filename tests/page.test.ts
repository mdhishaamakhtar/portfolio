/**
 * The home page's contract with search engines, link previews and people
 * using assistive technology.
 */
import { beforeAll, describe, expect, test } from "vitest";
import Home from "../src/pages/index.astro";
import NotFound from "../src/pages/404.astro";
import { DESCRIPTION, OG_IMAGE, PERSON, TITLE } from "../src/consts";
import { credo } from "../src/data/profile";
import { renderPage, text } from "./support/render";

let doc: Document;
let html: string;

const meta = (selector: string) =>
  doc.querySelector(selector)?.getAttribute("content");

beforeAll(async () => {
  ({ doc, html } = await renderPage(Home));
});

describe("search and sharing", () => {
  test("has the title, description and canonical URL", () => {
    expect(doc.title).toBe(TITLE);
    expect(meta('meta[name="description"]')).toBe(DESCRIPTION);
    expect(
      doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe("https://hishaam.dev/");
    expect(meta('meta[name="robots"]')).toContain("index, follow");
    expect(doc.documentElement.getAttribute("lang")).toBe("en");
  });

  test("keeps the description within what search results show", () => {
    expect(DESCRIPTION.length).toBeGreaterThan(70);
    expect(DESCRIPTION.length).toBeLessThanOrEqual(200);
    expect(TITLE.length).toBeLessThanOrEqual(65);
  });

  test("points link previews at an absolute, sized social image", () => {
    const image = meta('meta[property="og:image"]');
    expect(image).toBe(`https://hishaam.dev${OG_IMAGE.path}`);
    expect(meta('meta[property="og:image:width"]')).toBe("1200");
    expect(meta('meta[property="og:image:height"]')).toBe("630");
    expect(meta('meta[property="og:image:alt"]')).toBe(OG_IMAGE.alt);
    expect(meta('meta[name="twitter:card"]')).toBe("summary_large_image");
    expect(meta('meta[name="twitter:image"]')).toBe(image);
    expect(meta('meta[property="og:title"]')).toBe(TITLE);
  });

  test("links the icons, manifest and sitemap", () => {
    for (const href of [
      "/favicon.ico",
      "/favicon.svg",
      "/apple-touch-icon.png",
      "/manifest.webmanifest",
      "/sitemap-index.xml",
    ]) {
      expect(doc.querySelector(`link[href="${href}"]`), href).not.toBeNull();
    }
  });

  test("describes him as one connected JSON-LD graph", () => {
    const scripts = [
      ...doc.querySelectorAll('script[type="application/ld+json"]'),
    ];
    expect(scripts).toHaveLength(1);
    const graph = JSON.parse(scripts[0].textContent ?? "")["@graph"] as {
      "@type": string;
      "@id"?: string;
      [key: string]: unknown;
    }[];
    const byType = (type: string) => graph.find((n) => n["@type"] === type);

    const person = byType("Person");
    expect(person?.name).toBe(PERSON.name);
    expect(person?.worksFor).toEqual({ "@id": "https://hishaam.dev/#groww" });
    expect(person?.founder).toEqual({ "@id": "https://hishaam.dev/#harf" });
    expect(person?.sameAs).toContain("https://github.com/mdhishaamakhtar");
    expect(person?.image).toBe("https://hishaam.dev/portrait.jpg");

    expect(byType("ProfilePage")?.mainEntity).toEqual({
      "@id": "https://hishaam.dev/#person",
    });
    expect(byType("ScholarlyArticle")?.identifier).toBe("arXiv:2507.14543");

    // Every @id reference must resolve to a node in the graph.
    const ids = new Set(graph.map((n) => n["@id"]).filter(Boolean));
    const refs = JSON.stringify(graph).match(/\{"@id":"[^"]+"\}/g) ?? [];
    for (const ref of refs) expect(ids).toContain(JSON.parse(ref)["@id"]);
  });
});

describe("structure and accessibility", () => {
  test("has exactly one h1, his name, and headings that never skip a level", () => {
    const h1s = doc.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(text(h1s[0])).toBe(PERSON.name);

    const levels = [...doc.querySelectorAll("h1, h2, h3, h4")].map((h) =>
      Number(h.tagName[1]),
    );
    levels.reduce((prev, level) => {
      expect(level - prev).toBeLessThanOrEqual(1);
      return level;
    });
  });

  test("lets keyboard users skip straight to the content", () => {
    const skip = doc.querySelector('a[href="#main"]');
    expect(skip).not.toBeNull();
    expect(doc.querySelector("main#main")).not.toBeNull();
  });

  test("labels every section by its heading", () => {
    for (const section of doc.querySelectorAll("section")) {
      const id = section.getAttribute("aria-labelledby");
      expect(id, section.id).toBeTruthy();
      expect(doc.getElementById(id!)?.tagName).toBe("H2");
    }
  });

  test("gives every image a description", () => {
    for (const img of doc.querySelectorAll("img")) {
      expect(img.getAttribute("alt")?.trim(), img.outerHTML).toBeTruthy();
    }
  });

  test("marks the Urdu as Urdu, right to left", () => {
    const urdu = doc.querySelector('[lang="ur"]');
    expect(urdu?.getAttribute("dir")).toBe("rtl");
    expect(text(urdu)).toBe("حرف");
  });

  test("never opens a link without protection or leaves one empty", () => {
    for (const a of doc.querySelectorAll("a")) {
      expect(text(a), a.outerHTML).not.toBe("");
      const href = a.getAttribute("href") ?? "";
      expect(href, a.outerHTML).not.toBe("#");
      if (href.startsWith("http")) {
        expect(href, "external links are https").toMatch(/^https:/);
        if (a.getAttribute("target") === "_blank") {
          expect(a.getAttribute("rel")).toContain("noopener");
        }
      }
    }
  });

  test("every in-page link has somewhere to land", () => {
    for (const a of doc.querySelectorAll('a[href^="#"]')) {
      const id = a.getAttribute("href")!.slice(1);
      expect(doc.getElementById(id), `#${id}`).not.toBeNull();
    }
  });
});

describe("what it says", () => {
  test("leads with Groww and Harf", () => {
    const intro = text(doc.querySelector(".lede"));
    expect(intro).toContain("Groww");
    expect(intro).toContain("Harf Studios");
  });

  test("keeps his two lines word for word", () => {
    expect(text(doc.body)).toContain(
      "ideas that question norms and tools that quietly empower.",
    );
    expect(text(doc.body)).toContain(credo.close);
    expect(credo.close).toBe(
      "Above all, I believe engineering should be inclusive by design: thoughtful, humane, and built to serve those most often left out.",
    );
  });

  test("has dropped the old AI-for-addiction framing", () => {
    expect(text(doc.body)).not.toMatch(/addiction/i);
  });

  test("ships the design contract in the markup", () => {
    expect(html).toContain("THESIS:");
  });
});

describe("the 404 page", () => {
  test("tells people where to go and stays out of the index", async () => {
    const page = await renderPage(NotFound, "/nope");
    expect(
      page.doc.querySelector('meta[name="robots"]')?.getAttribute("content"),
    ).toBe("noindex, follow");
    expect(page.doc.querySelector('a[href="/"]')).not.toBeNull();
  });
});
