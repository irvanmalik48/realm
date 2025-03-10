import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="w-full max-w-3xl mx-auto p-5 gap-8 flex flex-col justify-center items-center">
      <Logo className="size-24" />
      <p className="text-primary/75 text-sm text-center w-full">
        &copy; 2025 Irvan Malik Azantha. Licensed in RCCL.
      </p>
    </footer>
  );
}
