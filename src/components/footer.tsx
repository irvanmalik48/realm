import { RealmMoe } from "./realm-moe";

export function Footer() {
  return (
    <footer className="w-full max-w-3xl mb-30 md:mb-0 mx-auto p-5 gap-8 flex flex-col justify-center items-center">
      <RealmMoe className="md:h-64 hover:scale-120 transition-all" />
      <p className="text-primary/75 text-sm text-center w-full">
        &copy; 2025 Irvan Malik Azantha. Licensed in RCCL.
      </p>
    </footer>
  );
}
