import { ArrowDownRight } from "lucide-react";
import { Button } from "./ui/button";
import { GoogleForms } from "./logos/google-forms";
import { RealmStylized } from "./realm-stylized";

export function Footer() {
  const usefulLinks = [
    { href: "https://gnuweeb.org", text: "GNU/Weeb" },
    { href: "https://webri.ng/webring/chads", text: "Webring" },
    { href: "https://helluvaos.com/", text: "HelluvaOS" },
    {
      href: "https://rwhu.helluvaos.com/",
      text: "RWHU",
    },
    { href: "#", text: "Lycoris" },
    { href: "https://mcmap.irvanma.eu.org", text: "Realm's BlueMap" },
  ];

  const socials = [
    { href: "https://linkedin.com/in/irvanmalik48", text: "LinkedIn" },
    { href: "https://x.com/irvanmalik48", text: "X (formerly Twitter)" },
    { href: "https://social.gnuweeb.org/@lappland", text: "Mastodon" },
    { href: "https://discord.com/users/652539226990051338", text: "Discord" },
    { href: "https://t.me/lappv", text: "Telegram" },
    { href: "https://t.me/lappvi", text: "Telegram (2nd)" },
  ];

  return (
    <footer className="relative w-full min-h-[85vh] border-t border-border max-w-full mb-30 md:mb-0 mx-auto p-5 gap-8 flex flex-col items-center">
      <div className="w-full md:grid-cols-2 grid grid-cols-1 gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <p className="text-2xl font-bold text-primary">realm</p>
            <p className="text-sm text-muted-foreground">/relm/</p>
          </div>
          <p className="w-full lg:w-3/4 xl:w-1/2 text-lg">
            A <span className="font-bold">realm</span> is a community or
            territory over which a sovereign rules. The term is commonly used to
            describe a monarchical or dynastic state. It may also be a
            subdivision within an empire, if it has its own hierarch.
          </p>
          <div className="w-full lg:w-3/4 xl:w-1/2 px-5 pt-3 pb-5 flex flex-col gap-3 border border-border rounded-md">
            <p className="text-lg font-bold text-primary flex gap-3 items-center">
              <ArrowDownRight className="size-6" />
              <span>Contact</span>
            </p>
            <p>
              If you have any questions, suggestions, or just want to say hi,
              feel free to fill out the contact form below. I&apos;ll try to
              respond as soon as possible.
            </p>
            <p className="text-sm text-muted-foreground">
              (I&apos;m too lazy to implement my own form system, so I&apos;m
              using Google Forms for now)
            </p>
            <Button variant={"secondary"} asChild>
              <a
                href="https://forms.gle/FjepjDkk3kM5DiFt9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center gap-2">
                  <GoogleForms className="size-4" />
                  Fill out the form here
                  <span className="sr-only">Contact form for realm</span>
                </span>
              </a>
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div className="flex flex-col gap-2">
            <p className="lg:text-xl font-bold md:mb-5 text-primary">
              Questionable Links
            </p>
            <div className="flex flex-col gap-1">
              {usefulLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-primary/75 md:text-2xl lg:text-4xl hover:text-primary transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="lg:text-xl font-bold md:mb-5 text-primary">Socials</p>
            <div className="flex flex-col gap-1">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className="text-primary/75 hover:text-primary transition-colors"
                >
                  {social.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-primary/75 text-center md:text-start text-sm w-full md:pb-40 lg:pb-55 xl:pb-70">
        &copy; 2025 Irvan Malik Azantha. Licensed in RCCL.
      </p>
      <RealmStylized className="hidden md:block w-full absolute inset-x-0 bottom-0" />
    </footer>
  );
}
