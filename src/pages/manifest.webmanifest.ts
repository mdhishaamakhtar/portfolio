import type { APIRoute } from "astro";
import { DESCRIPTION, PERSON, THEME_COLOR } from "../consts";

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: PERSON.name,
        short_name: PERSON.givenName,
        description: DESCRIPTION,
        start_url: "/",
        display: "browser",
        background_color: THEME_COLOR,
        theme_color: THEME_COLOR,
        icons: [
          { src: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
          { src: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
          { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
        ],
      },
      null,
      2,
    ),
    { headers: { "Content-Type": "application/manifest+json" } },
  );
