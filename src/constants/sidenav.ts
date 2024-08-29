import {
  BookLock,
  Code,
  Copy,
  Disc3,
  Home,
  Info,
  Pickaxe,
  User,
} from "lucide-react";

export const navLinks = [
  {
    href: "/",
    Icon: Home,
    label: "Homepage",
  },
  {
    href: "/gists",
    Icon: Code,
    label: "Gists",
  },
  {
    href: "/paste",
    Icon: Copy,
    label: "Pastebin",
    disabled: true,
  },
  {
    href: "/recrypt",
    Icon: BookLock,
    label: "Re:Crypt",
    disabled: true,
  },
  {
    href: "/minecraft",
    Icon: Pickaxe,
    label: "Minecraft Server",
    disabled: true,
  },
  {
    href: "/music",
    Icon: Disc3,
    label: "Stream Music",
    disabled: true,
  },
  {
    href: "/about",
    Icon: Info,
    label: "About Me",
  },
  {
    href: "/account",
    Icon: User,
    label: "My Account",
    order: "last",
  },
];
