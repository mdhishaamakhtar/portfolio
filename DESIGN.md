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
| `--hairline`   | brown at 22%                  | Rules under section headings, the colophon   |
| `--bi-1..3`    | `#d60270` `#9b4f96` `#0038a8` | The bi-flag rule under the name              |

Light only. Every text colour clears WCAG AA on mint.

## Type

- **Cormorant Garamond** 500 (body, name, section headings) and 600 (entry titles), with italics for section headings, dates, taglines and the quoted line in About. Old-style figures.
- **Noto Nastaliq Urdu** for the single word حرف beside Harf Studios.
- Body: `clamp(1.1875rem, 1rem + 0.65vw, 1.40625rem)`, about 19px on phones and 22.5px on laptops, line height 1.5.
- Name: set to the measure. One line at every width, sized as `100cqi / 7.8` so it is exactly as wide as the column (about 43px on a phone, 94px on a laptop), weight 500, tracking -0.02em. The 7.8 is the name's width in ems; measure it again if the name, weight or tracking changes.
- Section headings: `clamp(1.875rem, 5vw, 2.5rem)`, weight 500, italic, brown, with a hairline beneath. Italic makes them a different voice from the upright entry titles, not only a larger one.
- Item titles: `clamp(1.25rem, 3vw, 1.5rem)`, weight 600, brown.

## Layout

- One centred column exactly as wide as the measure, side padding `clamp(1.25rem, 5vw, 2rem)`.
- **Measure:** everything stops at `--measure` (68ch, about 75 characters of Cormorant a line): the name, the intro, every section and the colophon.
- **Intro:** the name runs the full column. On phones the bi rule follows, then the lede with the photo beside it, then the links. From 34rem up the photo stands beside everything under the name, at `clamp(8.5rem, 18vw, 11.5rem)`: its top meets the bi rule's line, its bottom meets the links, and the lede is centred between. 3:4 crop, 0.5rem corners, a hairline edge and a soft brown shadow.
- **Sections:** heading stacked above content, `clamp(3.5rem, 9vw, 5.5rem)` above each.
- **Work entries:** title, roles with dates right-aligned, summary, dash bullets, its links on the right of the title row (the company's domain when it has no others).
- **Contact:** the email address is set large (2.25rem, shrinking to stay on one line on a phone), since it is the page's last action. The page opens on the name and closes on the address.
- **Lists** (writing, elsewhere, education): a bold or linked first line, then a quiet second line.

## Details

- **Bullets:** a 0.625rem by 1px brown dash at x-height, 0.5rem between items. From 48rem up the dash hangs in the margin, so every line of text starts at the column's edge; on phones the text is indented 1.5rem instead.
- **Links:** always green text with a solid green underline (1px, or 0.05em at large sizes, offset 0.2em); never brown, never ink. Titles are plain text; an entry's links sit on the right of its title row, above the dates, and go deep green on hover (fine pointers only) and on tap, instantly. Item links get a taller hit area through padding with a matching negative margin.
- **Bi rule:** three 2px stripes, 3.5rem wide, beside "Bi, and proud of it." in italic at `clamp(1.0625rem, 0.95rem + 0.4vw, 1.25rem)`.
- **Colophon:** 1rem italic quiet text; the © line first, the disclaimer last.
- **404:** his name in brown, the brown heading, and the colophon, all on the same measure.

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
