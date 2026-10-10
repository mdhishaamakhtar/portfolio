export const SITE_URL = "https://hishaam.dev";
export const SITE_HOST = "hishaam.dev";

export const PERSON = {
  name: "Md Hishaam Akhtar",
  shortName: "Hishaam Akhtar",
  givenName: "Hishaam",
  familyName: "Akhtar",
  urdu: "ہشام",
  email: "hishaamakhtar2001.mha@gmail.com",
  jobTitle: "Software Development Engineer 2",
  hometown: "Calcutta",
  basedIn: "Bangalore",
} as const;

export const TITLE = "Md Hishaam Akhtar · Backend engineer, co-founder of Harf";

export const DESCRIPTION =
  "Hishaam Akhtar builds high-scale backend systems at Groww and co-founded Harf Studios, which makes Urdu fun for everyone. His projects, research, writing, and how to reach him.";

export const OG_IMAGE = {
  path: "/og.png",
  width: 1200,
  height: 630,
  alt: "Md Hishaam Akhtar: backend engineer at Groww and co-founder of Harf Studios, beside a portrait of him laughing, on mint green.",
} as const;

// Mint is the page's own colour; the browser chrome should match it.
export const THEME_COLOR = "#e3fcec";

export const LINKS = {
  github: "https://github.com/mdhishaamakhtar",
  linkedin: "https://www.linkedin.com/in/mdhishaamakhtar/",
  medium: "https://medium.com/@mdhishaamakhtar",
  resume:
    "https://drive.google.com/file/d/1buO4Mpqaz2X_eIvL3d_SbLNTm8y1eBe5/view?usp=sharing",
  email: `mailto:${PERSON.email}`,
} as const;

export const HARF = {
  name: "Harf Studios",
  url: "https://harfstudios.fun",
  book: "https://harfstudios.fun/books/dars-volume-one",
  lyrics: "https://harfstudios.fun/lyrics",
  instagram: "https://www.instagram.com/harf.studios/",
  youtube: "https://www.youtube.com/@harfstudios-c1r",
  cofounder: "Vaniya Adeeb",
  cofounderUrl: "https://www.instagram.com/vaniyaadeeb/",
  founded: "2026",
} as const;

export const GROWW = {
  name: "Groww",
  url: "https://groww.in",
} as const;
