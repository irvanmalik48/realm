import {
  Home,
  Newspaper,
  Info,
  Linkedin,
  Twitter,
  Github,
  AtSign,
  ListMusic,
  Scale,
  Code2,
} from "lucide-react";
import { StyledLink } from "rakkasjs";

export default function NavRail() {
  return (
    <nav className="bg-neutral-800 h-screen sticky top-0 p-3 w-fit flex flex-col justify-between border-r border-neutral-700 z-50">
      <div className="flex flex-col gap-3">
        <StyledLink
          href="/"
          className="group nav-item"
          activeClass="nav-item-active"
        >
          <Home size={18} />
          <p className="nav-item-label">
            Home
          </p>
        </StyledLink>
        <StyledLink
          href="/posts"
          className="group nav-item"
          activeClass="nav-item-active"
        >
          <Newspaper size={18} />
          <p className="nav-item-label">
            Posts
          </p>
        </StyledLink>
        <StyledLink
          href="/lyrics"
          className="group nav-item"
          activeClass="nav-item-active"
        >
          <ListMusic size={18} />
          <p className="nav-item-label">
            Song Lyrics
          </p>
        </StyledLink>
        <StyledLink
          href="/about"
          className="group nav-item"
          activeClass="nav-item-active"
        >
          <Info size={18} />
          <p className="nav-item-label">
            About
          </p>
        </StyledLink>
        <StyledLink
          href="/creed"
          className="group nav-item"
          activeClass="nav-item-active"
        >
          <Scale size={18} />
          <p className="nav-item-label">
            Journalist's Creed
          </p>
        </StyledLink>
        <StyledLink
          href="/oath"
          className="group nav-item"
          activeClass="nav-item-active"
        >
          <Code2 size={18} />
          <p className="nav-item-label">
            Programmer's Oath
          </p>
        </StyledLink>
      </div>
      <div className="flex flex-col gap-3">
        <a
          href="https://linkedin.com/in/irvanmalik48"
          className="group nav-item"
        >
          <Linkedin size={18} />
          <p className="nav-item-label">
            LinkedIn
          </p>
        </a>
        <a
          href="https://twitter.com/irvanmalik48"
          className="group nav-item"
        >
          <Twitter size={18} />
          <p className="nav-item-label">
            Twitter
          </p>
        </a>
        <a
          href="https://github.com/irvanmalik48"
          className="group nav-item"
        >
          <Github size={18} />
          <p className="nav-item-label">
            GitHub
          </p>
        </a>
        <a
          href="mailto:irvanmalik48@gmail.com"
          className="group nav-item"
        >
          <AtSign size={18} />
          <p className="nav-item-label">
            Email
          </p>
        </a>
      </div>
    </nav>
  );
}
