import type { KVArray } from "~/types/definitions";

export const REDIRECT_CONSTANTS: KVArray = [
  // My personal links
  {
    name: "me@ko",
    value: {
      link: "https://keyoxide.org/irvanmalik48@gmail.com",
      provider: "Keyoxide",
    },
  },
  {
    name: "me@twt",
    value: {
      link: "https://twitter.com/irvanmalik48",
      provider: "Twitter",
    },
  },
  {
    name: "me@gh",
    value: {
      link: "https://github.com/irvanmalik48",
      provider: "GitHub",
    },
  },
  {
    name: "me@ig",
    value: {
      link: "https://instagram.com/irvann48_",
      provider: "Instagram",
    },
  },
  {
    name: "me@fb",
    value: {
      link: "https://facebook.com/irvanmalik48",
      provider: "Facebook",
    },
  },
  {
    name: "me@tg",
    value: {
      link: "https://t.me/lapplund",
      provider: "Telegram",
    },
  },

  /*  Redirects that requires ActivityPub verification must be placed below this line
      Do note that you need to fill the `activityPubUrl` field as defined below
      (link can be anything)
  */
  {
    name: "me@gw",
    value: {
      link: "https://social.gnuweeb.org/@lappland",
      provider: "moe.onl",
      activityPubUrl: "https://social.gnuweeb.org/@lappland",
    },
  },
];
