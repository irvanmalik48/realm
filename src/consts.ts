import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "realm.",
  DESCRIPTION: "Irvan Malik's personal website.",
  EMAIL: "me@irvanma.eu.org",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "A homepage, I guess.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Articles, posts, whatever you call it.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Projects, under construction.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/irvanmalik48",
  },
  {
    NAME: "Telegram",
    HREF: "https://t.me/lappv",
  },
  {
    NAME: "Mastodon",
    HREF: "https://social.gnuweeb.org/@lappland",
  },
  {
    NAME: "Email",
    HREF: `mailto:${SITE.EMAIL}`,
  },
];
