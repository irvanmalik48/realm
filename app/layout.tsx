import { FAB } from "c/FAB";
import { Footer } from "c/Footer";
import "s/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className="bg-neutral-900">
        <FAB />
        {children}
        <Footer />
      </body>
    </html>
  );
}
