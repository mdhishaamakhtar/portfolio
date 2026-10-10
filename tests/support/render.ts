import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { Window } from "happy-dom";

/**
 * Renders pages and endpoints through Astro's own pipeline, so assertions
 * run against the same HTML, headers and bytes the build writes to disk.
 */

export const SITE = "https://hishaam.dev";

type Component = Parameters<AstroContainer["renderToResponse"]>[0];

let container: Promise<AstroContainer> | undefined;
const getContainer = () => (container ??= AstroContainer.create());

export async function renderPage(page: Component, path = "/") {
  const res = await (
    await getContainer()
  ).renderToResponse(page, {
    request: new Request(new URL(path, SITE)),
    partial: false,
  });
  const html = await res.text();
  return { status: res.status, html, doc: parse(html) };
}

/** An endpoint module, imported with `import * as route`. */
export async function renderEndpoint(
  route: Record<string, unknown>,
  path: string,
) {
  return (await getContainer()).renderToResponse(
    route as unknown as Component,
    {
      request: new Request(new URL(path, SITE)),
      routeType: "endpoint",
    },
  );
}

/** Parsed, never executed: no scripts run and nothing loads. */
export function parse(html: string): Document {
  const window = new Window({ url: SITE });
  return new window.DOMParser().parseFromString(
    html,
    "text/html",
  ) as unknown as Document;
}

export const text = (el: Element | null | undefined) =>
  (el?.textContent ?? "").replace(/\s+/g, " ").trim();
