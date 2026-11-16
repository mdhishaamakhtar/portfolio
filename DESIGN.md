# Design

hishaam.dev is a single page on mint with warm brown headings and green links. The hierarchy is simple: headings are serif, body is sans. Cormorant Garamond sets the name, the introduction under it, and the names of sections, jobs and projects. Ysabeau Office sets everything that is read at length. Christian Thalmann drew both faces on the same Garamond skeleton, so they share their proportions.

## Palette

| Token             | Value                         | Use                                           |
| ----------------- | ----------------------------- | --------------------------------------------- |
| `--bg`            | `#e3fcec`                     | Page background (mint)                        |
| `--brown`         | `#7f5539`                     | Name, section and entry names                 |
| `--green`         | `#386641`                     | Links                                         |
| `--green-deep`    | `#24502f`                     | Link hover                                    |
| `--ink`           | `#2d2d2d`                     | Body text and emphasis                        |
| `--quiet`         | `#66594e`                     | Notes: dates, stacks, secondary lines         |
| `--hairline`      | brown at 28%                  | The rule above each section and the colophon  |
| `--hairline-soft` | brown at 14%                  | The rule between entries in Work and Projects |
| `--bi-1..3`       | `#d60270` `#9b4f96` `#0038a8` | The bi-flag rule under the name               |

Light only.

## Type

- **Cormorant Garamond** 500 and 600, with italics, through the `.serif` class. Old-style figures.
  - Name: `min(4.5rem, 100cqi / 7.8)`, 500, tracking -0.02em, one line. It fills the line on a phone and stops at 72px on a wide screen. The 7.8 is the name's width in ems; measure it again if the name, weight or tracking changes.
  - Introduction (`.lede`): `clamp(1.375rem, 1.15rem + 1vw, 1.75rem)`, 500, line height 1.35, ink, at most 32ch a line. One plain sentence; it supports the name and does not compete with it.
  - Section names: `clamp(1.75rem, 1.4rem + 1.4vw, 2.125rem)`, 500 italic, brown.
  - Entry names: `clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem)`, 600, brown. Project taglines sit under them in italic.
  - Not for running text. About and Contact are body, so they are in the sans.
- **Ysabeau Office** 400 and 600, with a 400 italic (a separate font entry, `--font-sans-italic`, used only by About's quoted line), for everything that is read at length: About, the work and project descriptions, the lists, the notes, Contact. It keeps Garamond's small x-height, so body text is `clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)` (18px on phones, 20px on laptops) at line height 1.55. Notes are 0.875em in the quiet colour. About's first paragraph is 1.3em, with its quoted line in brown italic.
- **Noto Nastaliq Urdu** for the single word حرف beside Harf Studios.

## Layout

Three columns on a page up to 76rem wide: a rail, the body, and notes.

- **Rail** (`--rail`, 12 to 16.5rem, from 62rem up): the portrait, and each section's name, which stays in view (`position: sticky`) while its section scrolls past.
- **Body:** everything to read starts on one vertical line, the content's left edge, from the name to the email address. Running text stops at 70ch.
- **Notes** (`--notes`, 13.5rem, from 40rem up): roles and dates, links, stacks, where an article appeared. Names are plain text; an entry's links live in its notes.
- Below 62rem the rail folds away and section names sit above their content. Below 40rem the notes fold under the body (for a job, between its name and its story).
- **Row of sections:** from 62rem up, the main sections as a plain row that starts on the content's edge and stays at the top of the window (`position: sticky`, 3.75rem tall, `--bar`). The page fades out under it through a short mint gradient, with no rule. The current section is deep green and underlined (`aria-current`). Section names in the rail and jumps stop below it. Phones and tablets have no navigation: a menu button was tried there, alone in a top bar and then on the bi rule's line, and the owner dropped it both times as not belonging.
- **Opening:** the portrait fills the rail (3:4, 0.5rem corners, a hairline edge and a soft brown shadow). Beside it: the name, the bi rule, the introduction and the links. From 62rem up that block is exactly as tall as the photo: the top of the name's capitals is level with the photo's top edge, the links stand on its bottom edge, and the introduction is centred in the space between. The name is pulled left by 0.04em so the M's stem, not its serif, sits on the content's edge. On a tablet the portrait moves to the right at 12rem. On a phone the name and bi rule run full width, the photo (6.5rem) stands beside the introduction, and the links run full width beneath.
- **Sections:** a hairline across the page, then the name and content, `clamp(3.5rem, 8vw, 6rem)` apart.
- **Work and Projects:** entries separated by a soft hairline.
- **Writing, Elsewhere, Certifications, Test Scores:** rows of a title (600) and, where there is one, a line about it, with a note beside.
- **Education:** the degree only, set as an entry like a job: the school as the name, the degree beneath, the year and grade in the notes.
- **Contact:** a sentence, then the email address on its own line at the same size.
- **Order:** About, Education, Work, Projects, Research, Writing, Certifications, Test Scores, Elsewhere, Contact.

## Details

- **Bullets:** a 0.625rem by 1px brown dash. From 62rem up it hangs in the gap beside the rail, so the text stays on the content's edge; the owner tried it inside the margin and preferred it hanging. On smaller screens the dash starts on the edge and the text is indented 1.375rem.
- **Links:** green with a solid green underline (1px, offset 0.2em), deep green on hover and on tap, instantly. The list of sections at the top is ink, underlined on hover.
- **Bi rule:** three 2px stripes, 3.25rem wide, beside "Bi, and proud of it." in italic Cormorant under the name.
- **Colophon:** italic Cormorant in the quiet colour; the © line first, the disclaimer last.
- **404:** his name, a serif heading and the colophon.

## Motion

Almost none: no entrance effects and no smooth scrolling. Two things move, both in answer to the reader.

- **Jumping to a section** from the list at the top. An instant jump gives no sense of having travelled, and scrolling the whole way smears the page past. So the page cuts to 200px short of the section and eases the rest into place over 450ms with a strong ease-out (`1 - (1 - t)^5`), from the direction it came. Any wheel, touch, key or press takes over at once. With reduced motion it is a plain jump. The script is at the foot of `index.astro`.
- **The list's underline** fades in over 150ms, on hover and when its section becomes the current one. Two IntersectionObservers do the watching, so nothing runs while the page scrolls.

## Social Card and Icons

- **OG card** (`/og.png`, 1200×630): the intro on mint, with the brown name over two lines, the bi rule with its line, the intro sentence, the URL as a green link, and the portrait on the right with rounded corners and a soft shadow.
- **Favicon:** a brown Cormorant "H" on a mint tile with a faint brown edge and the bi stripes beneath. It is drawn as paths, and every raster icon is cut from it.

## Rejected Directions

Don't revisit these:

- A Mughal album page (arches, gold flecks, manuscript ruling).
- An engineering computation pad (grid paper, title block, mono labels).
- Dark mode, and an all-green palette without the brown.
- Atkinson Hyperlegible Next and Inclusive Sans for body text: both draw every zero with a slash, which made the dates and figures read as technical.
- Setting About in the serif. Running text is sans; the serif is for headings, names and the introduction.
- The opening sentence as a 72px headline with the name as a small masthead: it read as a cliché and too big.
- A menu on phones, whether alone in a top bar or on the bi rule's line.
- An oversized email address in Contact.
