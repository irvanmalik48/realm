import { type LayoutProps, useLocation } from "rakkasjs";
import Footer from "src/components/Footer";
import NavRail from "src/components/NavRail";
import Sidebar from "src/components/Sidebar";
import "src/styles/globals.css";

export default function RootLayout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div id="REALM" className="flex w-full h-screen scroll-smooth">
      <NavRail />
      <Sidebar />
      <main
        className="bg-neutral-900 min-h-screen w-full overflow-y-scroll scrollbar-thin scrollbar-track-neutral-700 scrollbar-thumb-neutral-500"
      >
        <section className="bg-neutral-800 border-b border-neutral-700 bg-opacity-50 py-3 sticky top-0 z-50 backdrop-blur-md">
          <div className="px-4">
            <p className="text-neutral-200 text-xs font-mono font-bold">
              {(location.pending != null) ? "Loading..." : location.current.pathname}
            </p>
          </div>
        </section>
        {children}
        <Footer />
      </main>
    </div>
  );
}
