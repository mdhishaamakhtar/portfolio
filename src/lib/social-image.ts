import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import sharp from "sharp";
import { OG_IMAGE, SITE_HOST } from "../consts";
import { hero } from "../data/profile";

/*
 * Satori cannot read CSS variables, so the light palette from global.css is
 * repeated here by value. Change one, change the other.
 */
export const PALETTE = {
  bg: "#e3fcec",
  ink: "#2d2d2d",
  brown: "#7f5539",
  quiet: "#66594e",
  green: "#386641",
  bi: ["#d60270", "#9b4f96", "#0038a8"],
} as const;

const { width: W, height: H } = OG_IMAGE;
const root = process.cwd();

/** Where the portrait sits on the card. */
export const PORTRAIT = {
  left: 828,
  top: 105,
  width: 300,
  height: 400,
  radius: 22,
};

// Satori reads WOFF, not the WOFF2 the site serves, so the card loads the
// static instances from @fontsource.
function font(file: string) {
  return readFile(
    join(root, "node_modules/@fontsource/cormorant-garamond/files", file),
  );
}

type Style = Record<string, string | number>;

const h = (type: string, style: Style, children?: unknown) => ({
  type,
  props: { style: { display: "flex", ...style }, children },
});

/** The portrait with rounded corners, cropped the way the page crops it. */
async function portrait() {
  const { width, height, radius } = PORTRAIT;
  const mask = Buffer.from(
    `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></svg>`,
  );
  return sharp(join(root, "src/assets/portrait.png"))
    .resize(width, height, { fit: "cover", position: "attention" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

export async function renderSocialImage(): Promise<Buffer> {
  const [serif600, serif500, serifItalic, photo] = await Promise.all([
    font("cormorant-garamond-latin-600-normal.woff"),
    font("cormorant-garamond-latin-500-normal.woff"),
    font("cormorant-garamond-latin-500-italic.woff"),
    portrait(),
  ]);

  const p = PORTRAIT;
  const tree = h(
    "div",
    {
      position: "relative",
      width: W,
      height: H,
      background: PALETTE.bg,
      fontFamily: "Cormorant Garamond",
      color: PALETTE.ink,
    },
    [
      // A soft shadow under where the portrait will land.
      h("div", {
        position: "absolute",
        left: p.left,
        top: p.top,
        width: p.width,
        height: p.height,
        borderRadius: p.radius,
        background: PALETTE.bg,
        boxShadow: "0 24px 48px -20px rgba(45,45,45,0.4)",
      }),
      h(
        "div",
        {
          position: "absolute",
          left: 96,
          top: 90,
          width: 660,
          height: 450,
          flexDirection: "column",
          justifyContent: "space-between",
        },
        [
          h("div", { flexDirection: "column" }, [
            h(
              "div",
              {
                flexDirection: "column",
                fontSize: 96,
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: -2,
                color: PALETTE.brown,
              },
              [h("span", {}, "Md Hishaam"), h("span", {}, "Akhtar")],
            ),
            h("div", { alignItems: "center", marginTop: 26 }, [
              h(
                "div",
                { flexDirection: "column", width: 84, marginRight: 18 },
                PALETTE.bi.map((color, i) =>
                  h("div", {
                    height: 3,
                    marginTop: i === 0 ? 0 : 3,
                    background: color,
                  }),
                ),
              ),
              h(
                "div",
                {
                  fontFamily: "Cormorant Italic",
                  fontSize: 28,
                  color: PALETTE.quiet,
                },
                "Bi, and proud of it.",
              ),
            ]),
          ]),
          h(
            "div",
            {
              fontSize: 33,
              fontWeight: 500,
              lineHeight: 1.32,
              color: PALETTE.ink,
              width: 545,
            },
            hero.lede,
          ),
          h(
            "div",
            {
              fontSize: 28,
              fontWeight: 500,
              color: PALETTE.green,
              textDecoration: "underline",
            },
            SITE_HOST,
          ),
        ],
      ),
    ],
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: W,
    height: H,
    fonts: [
      {
        name: "Cormorant Garamond",
        data: serif600,
        weight: 600,
        style: "normal",
      },
      {
        name: "Cormorant Garamond",
        data: serif500,
        weight: 500,
        style: "normal",
      },
      // Its own family name: Satori matches faces by weight and would
      // otherwise set upright text in this italic.
      {
        name: "Cormorant Italic",
        data: serifItalic,
        weight: 500,
        style: "normal",
      },
    ],
  });

  const card = new Resvg(svg, { fitTo: { mode: "width", value: W } })
    .render()
    .asPng();

  return sharp(card)
    .composite([{ input: photo, left: p.left, top: p.top }])
    .png()
    .toBuffer();
}
