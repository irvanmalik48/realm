export type Site = {
  TITLE: string;
  DESCRIPTION: string;
  EMAIL: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  POSTS_PER_PAGE: number;
  SITEURL: string;
};

export type Link = {
  href: string;
  label: string;
};

export const SITE: Site = {
  TITLE: "realm",
  DESCRIPTION: "Irvan Malik's personal blog.",
  EMAIL: "irvanma@gnuweeb.org",
  NUM_POSTS_ON_HOMEPAGE: 4,
  POSTS_PER_PAGE: 5,
  SITEURL: "https://irvanma.eu.org",
};

export const NAV_LINKS: Link[] = [
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
  { href: "/tags", label: "tags" },
  { href: "/webring", label: "webring" },
];

export const SOCIAL_LINKS: Link[] = [
  { href: "https://github.com/irvanmalik48", label: "GitHub" },
  { href: "https://x.com/irvanmalik48", label: "X (Formerly Twitter)" },
  { href: "irvanma@gnuweeb.org", label: "Email" },
  { href: "/rss.xml", label: "RSS" },
];
