import type { APIRoute } from "astro";
import { renderSocialImage } from "../lib/social-image";

/** The link-preview card, rendered once at build time. */
export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await renderSocialImage()), {
    headers: { "Content-Type": "image/png" },
  });
