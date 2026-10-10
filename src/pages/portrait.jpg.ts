import { join } from "node:path";
import type { APIRoute } from "astro";
import sharp from "sharp";

/**
 * The portrait at a stable address, for structured data and anything else
 * that links to a picture of him. Hashed asset URLs change every build.
 */
export const GET: APIRoute = async () => {
  const jpg = await sharp(join(process.cwd(), "src/assets/portrait.png"))
    .resize(800, 1067, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpg), {
    headers: { "Content-Type": "image/jpeg" },
  });
};
