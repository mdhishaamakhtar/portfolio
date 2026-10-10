import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

/** The favicon SVG is the single source; every raster icon is cut from it. */
export async function renderIcon(size: number): Promise<Buffer> {
  const svg = await readFile(join(process.cwd(), "public/favicon.svg"));
  return sharp(svg, { density: Math.max(72, (size / 64) * 72) })
    .resize(size, size)
    .png()
    .toBuffer();
}

/**
 * Wraps PNGs in an ICO container. Every browser since Vista-era IE reads
 * PNG-in-ICO, and it saves pulling in a dependency for twenty lines.
 */
export function toIco(images: { size: number; png: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const entries: Buffer[] = [];
  let offset = 6 + images.length * 16;
  for (const { size, png } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}
