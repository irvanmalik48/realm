import ThemeToggleButton from "./ui/theme-toggle-button";
import { Link } from "next-view-transitions";

export interface FlatNavLinkProps {
  href: string;
  children: React.ReactNode;
}

export interface FlatNavLinkData {
  href: string;
  text: string;
}

export function FlatNavLink({ href, children }: FlatNavLinkProps) {
  return (
    <Link
      href={href}
      className="text-primary/75 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const links: FlatNavLinkData[] = [];

  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-lg w-full">
      <nav className="w-full max-w-3xl mx-auto px-5 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold dark:font-medium text-primary"
        >
          realm.
        </Link>
        <div className="flex gap-5 items-center">
          {links.length > 0 &&
            links.map((link) => (
              <FlatNavLink key={link.href} href={link.href}>
                {link.text}
              </FlatNavLink>
            ))}
          <ThemeToggleButton variant="circle-blur" start="top-right" />
        </div>
      </nav>
    </header>
  );
}
