# Design

hishaam.dev is a single page in the spirit of the site it replaced: mint ground, warm brown headings, green links, Cormorant Garamond throughout. It should feel simple and elegant, and read like a person, not a template.

## Palette

| Token          | Value                         | Use                                          |
| -------------- | ----------------------------- | -------------------------------------------- |
| `--bg`         | `#e3fcec`                     | Page background (mint)                       |
| `--brown`      | `#7f5539`                     | Name, section headings, item titles, bullets |
| `--green`      | `#386641`                     | Links                                        |
| `--green-deep` | `#24502f`                     | Link hover                                   |
| `--ink`        | `#2d2d2d`                     | Body text and emphasis                       |
| `--quiet`      | `#66594e`                     | Dates, stacks, secondary lines               |
| `--hairline`   | brown at 22%                  | The colophon rule                            |
| `--bi-1..3`    | `#d60270` `#9b4f96` `#0038a8` | The bi-flag rule under the name              |

Light only. Every text colour clears WCAG AA on mint.

## Type

- **Cormorant Garamond** 500 (body) and 600 (name, headings, titles), with italics for dates, taglines and the quoted line in About. Old-style figures.
- **Noto Nastaliq Urdu** for the single word حرف beside Harf Studios.
- Body: `clamp(1.125rem, 0.95rem + 0.6vw, 1.3125rem)`, about 18px on phones and 21px on laptops, line height 1.6.
- Name: `clamp(2.375rem, 7vw, 3.5rem)`, weight 600, tracking -0.02em, one line from 48rem up.
- Section headings: `clamp(1.375rem, 3vw, 1.75rem)`, weight 600, brown.
- Item titles: `clamp(1.25rem, 3vw, 1.5rem)`, weight 600, brown.

## Layout

- One column, max 66rem, side padding `clamp(1.25rem, 5vw, 2rem)`.
- **Intro:** on phones the photo sits beside the name, and the line and links run full width beneath. From 34rem up the photo spans the whole intro, centred against it, at `clamp(8.5rem, 18vw, 11.5rem)`, with a 3:4 crop, 0.75rem corners and a soft shadow.
- **Sections:** heading stacked above content, `clamp(2.5rem, 6vw, 3.5rem)` above each.
- **Work entries:** title (linked), roles with dates right-aligned, summary, dash bullets, inline links.
- **Lists** (writing, elsewhere, education): a bold or linked first line, then a quiet second line.

## Details

- **Bullets:** a 0.625rem by 1px brown dash at x-height, with a 1.5rem indent and 0.5rem between items.
- **Links:** green, 1px underline at 35% opacity that goes solid on hover, instantly (hover only on fine pointers).
- **Bi rule:** three 2px stripes, 3.5rem wide, beside "Bi, and proud of it." in italic.

## Motion

None. No entrance effects, hover transitions or smooth scrolling: the page is still, on purpose.

## Social Card and Icons

- **OG card** (`/og.png`, 1200×630): the intro on mint, with the brown name over two lines, the bi rule with its line, the intro sentence, the URL as a green link, and the portrait on the right with rounded corners and a soft shadow.
- **Favicon:** a brown Cormorant "H" on a mint tile with a faint brown edge and the bi stripes beneath. It is drawn as paths, and every raster icon is cut from it.

## Rejected Directions

Don't revisit these:

- A Mughal album page (arches, gold flecks, manuscript ruling).
- An engineering computation pad (grid paper, title block, mono labels).
- Dark mode, and an all-green palette without the brown.
