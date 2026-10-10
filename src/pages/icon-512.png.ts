import type { APIRoute } from "astro";
import { renderIcon } from "../lib/icons";

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await renderIcon(512)), {
    headers: { "Content-Type": "image/png" },
  });
