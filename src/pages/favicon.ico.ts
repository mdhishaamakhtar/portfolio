import type { APIRoute } from "astro";
import { renderIcon, toIco } from "../lib/icons";

export const GET: APIRoute = async () => {
  const sizes = [16, 32, 48];
  const images = await Promise.all(
    sizes.map(async (size) => ({ size, png: await renderIcon(size) })),
  );
  return new Response(new Uint8Array(toIco(images)), {
    headers: { "Content-Type": "image/x-icon" },
  });
};
