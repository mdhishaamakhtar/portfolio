// Writes public/favicon.svg: a brown Cormorant "H" on a mint tile, with the
// bi flag's three colours as a fine rule beneath it. The letter is drawn as a
// path (Satori converts the glyph), so the icon looks the same everywhere,
// with no font to load. Every raster icon is cut from this file at build
// time. Run with `npm run favicon` after changing the design.
import { readFile, writeFile } from "node:fs/promises";
import satori from "satori";

const font = await readFile(
  "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff",
);

const h = (style, children) => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});

const stripes = ["#d60270", "#9b4f96", "#0038a8"];

const svg = await satori(
  h(
    {
      // Satori adds the border outside the box, so the tile is 60 + 2 + 2.
      width: 60,
      height: 60,
      borderRadius: 14,
      background: "#e3fcec",
      // A faint brown edge, so the tile holds its shape on a white tab bar.
      border: "2px solid rgba(127, 85, 57, 0.35)",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Cormorant Garamond",
    },
    [
      h(
        {
          fontSize: 58,
          fontWeight: 700,
          lineHeight: 1,
          color: "#7f5539",
          marginTop: -8,
        },
        "H",
      ),
      h(
        { flexDirection: "column", width: 34, marginTop: 0 },
        stripes.map((color, i) =>
          h({ height: 3, marginTop: i ? 1 : 0, background: color }),
        ),
      ),
    ],
  ),
  {
    width: 64,
    height: 64,
    fonts: [{ name: "Cormorant Garamond", data: font, weight: 700 }],
  },
);

await writeFile("public/favicon.svg", `${svg}\n`);
console.log("wrote public/favicon.svg");
