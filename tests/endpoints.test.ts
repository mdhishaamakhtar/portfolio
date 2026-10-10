/** The files the build generates beside the page. */
import sharp from "sharp";
import { describe, expect, test } from "vitest";
import * as robots from "../src/pages/robots.txt";
import * as llms from "../src/pages/llms.txt";
import * as manifest from "../src/pages/manifest.webmanifest";
import * as og from "../src/pages/og.png";
import * as favicon from "../src/pages/favicon.ico";
import * as appleTouch from "../src/pages/apple-touch-icon.png";
import * as icon512 from "../src/pages/icon-512.png";
import * as portrait from "../src/pages/portrait.jpg";
import { PERSON } from "../src/consts";
import { projects } from "../src/data/profile";
import { renderEndpoint } from "./support/render";

const bytes = async (res: Response) => Buffer.from(await res.arrayBuffer());

describe("robots.txt", () => {
  test("allows everything and points at the sitemap", async () => {
    const res = await renderEndpoint(robots, "/robots.txt");
    const body = await res.text();
    expect(res.headers.get("content-type")).toContain("text/plain");
    expect(body).toContain("User-agent: *\nAllow: /");
    expect(body).toContain("Sitemap: https://hishaam.dev/sitemap-index.xml");
  });
});

describe("llms.txt", () => {
  test("summarises him and every project", async () => {
    const body = await (await renderEndpoint(llms, "/llms.txt")).text();
    expect(body.startsWith(`# ${PERSON.name}`)).toBe(true);
    expect(body).toContain("Harf Studios");
    for (const project of projects) expect(body).toContain(project.name);
  });
});

describe("manifest", () => {
  test("is valid JSON that names its icons", async () => {
    const res = await renderEndpoint(manifest, "/manifest.webmanifest");
    expect(res.headers.get("content-type")).toBe("application/manifest+json");
    const data = await res.json();
    expect(data.name).toBe(PERSON.name);
    expect(data.icons.map((i: { src: string }) => i.src)).toEqual([
      "/favicon.svg",
      "/apple-touch-icon.png",
      "/icon-512.png",
    ]);
  });
});

describe("images", () => {
  test("the social card is a 1200 by 630 PNG", async () => {
    const res = await renderEndpoint(og, "/og.png");
    expect(res.headers.get("content-type")).toBe("image/png");
    const info = await sharp(await bytes(res)).metadata();
    expect([info.format, info.width, info.height]).toEqual(["png", 1200, 630]);
  });

  test("the portrait has a stable address and is a 3:4 JPEG", async () => {
    const res = await renderEndpoint(portrait, "/portrait.jpg");
    const info = await sharp(await bytes(res)).metadata();
    expect([info.format, info.width, info.height]).toEqual(["jpeg", 800, 1067]);
  });

  test("the touch icons are the sizes the manifest promises", async () => {
    for (const [route, path, size] of [
      [appleTouch, "/apple-touch-icon.png", 180],
      [icon512, "/icon-512.png", 512],
    ] as const) {
      const info = await sharp(
        await bytes(await renderEndpoint(route, path)),
      ).metadata();
      expect([info.width, info.height], path).toEqual([size, size]);
    }
  });

  test("favicon.ico is a real ICO holding 16, 32 and 48 px images", async () => {
    const ico = await bytes(await renderEndpoint(favicon, "/favicon.ico"));
    expect(ico.readUInt16LE(0)).toBe(0);
    expect(ico.readUInt16LE(2)).toBe(1);
    expect(ico.readUInt16LE(4)).toBe(3);
    expect([ico[6], ico[22], ico[38]]).toEqual([16, 32, 48]);
    // The first image starts where the directory says, and is a PNG.
    const offset = ico.readUInt32LE(6 + 12);
    expect(ico.subarray(offset + 1, offset + 4).toString()).toBe("PNG");
  });
});
