// Everything in this file needs REAL information from 2TG before launch.
// Items flagged `false` are shown only in development (with a DRAFT badge) and hidden on the live site.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const CONFIRMED = {
  // Set to true once the "Why 2TG" texts in src/i18n/dictionary.ts describe what 2TG really does.
  why: false,
  // Set to true once INDICATIVE_MAD in src/data/site.ts holds 2TG's real rates.
  prices: false,
};

const isProd = process.env.NODE_ENV === "production";
/** True when an item should render: confirmed items always, unconfirmed ones only in development. */
export const visible = (confirmed: boolean) => confirmed || !isProd;
export const isDraftMode = !isProd;

export type Testimonial = { name: string; role: string; text: string };
// Add only real, permitted customer quotes, e.g. { name: "Fatima Z.", role: "Agadir", text: "..." }
export const TESTIMONIALS: Testimonial[] = [];

// Real team/work photos: put files in public/images/team and list the paths, e.g. "/images/team/01.jpg".
// When this list is not empty the gallery uses these photos instead of the stock images.
export const TEAM_PHOTOS: string[] = [];
