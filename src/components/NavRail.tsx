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

export default function NavRail(props: any) {
  return (
    <nav
      id={props.id}
      className="bg-neutral-800 box-border h-fit md:h-full fixed md:sticky md:top-0 bottom-0 py-3 px-4 md:px-3 md:py-3 w-full md:w-fit flex md:flex-col justify-center md:justify-between border-t md:border-t-0 md:border-r border-neutral-700 z-50"
    >
      <div className="flex flex-row justify-between md:justify-center w-full md:w-fit md:flex-col gap-3">
        <a
          href="/"
          className={`group nav-item ${props.path === "/" ? "nav-item-active" : ""
            }`}
        >
          <Home size={18} />
          <p className="nav-item-label">Home</p>
        </a>
        <a
          href="/posts"
          className={`group nav-item ${props.path === "/posts" ? "nav-item-active" : ""
            }`}
        >
          <Newspaper size={18} />
          <p className="nav-item-label">Posts</p>
        </a>
        <a
          href="/lyrics"
          className={`group nav-item ${props.path === "/lyrics" ? "nav-item-active" : ""
            }`}
        >
          <ListMusic size={18} />
          <p className="nav-item-label">Song Lyrics</p>
        </a>
        <a
          href="/about"
          className={`group nav-item ${props.path === "/about" ? "nav-item-active" : ""
            }`}
        >
          <Info size={18} />
          <p className="nav-item-label">About</p>
        </a>
        <a
          href="/creed"
          className={`group nav-item ${props.path === "/creed" ? "nav-item-active" : ""
            }`}
        >
          <Scale size={18} />
          <p className="nav-item-label">Journalist's Creed</p>
        </a>
        <a
          href="/oath"
          className={`group nav-item ${props.path === "/oath" ? "nav-item-active" : ""
            }`}
        >
          <Code2 size={18} />
          <p className="nav-item-label">Programmer's Oath</p>
        </a>
      </div>
      <div className="hidden md:flex flex-col gap-3">
        <a
          href="https://linkedin.com/in/irvanmalik48"
          className={`group nav-item`}
        >
          <Linkedin size={18} />
          <p className="nav-item-label">LinkedIn</p>
        </a>
        <a href="https://twitter.com/irvanmalik48" className={`group nav-item`}>
          <Twitter size={18} />
          <p className="nav-item-label">Twitter</p>
        </a>
        <a href="https://github.com/irvanmalik48" className={`group nav-item`}>
          <Github size={18} />
          <p className="nav-item-label">GitHub</p>
        </a>
        <a href="mailto:irvanmalik48@gmail.com" className={`group nav-item`}>
          <AtSign size={18} />
          <p className="nav-item-label">Email</p>
        </a>
      </div>
    </nav>
  );
}
