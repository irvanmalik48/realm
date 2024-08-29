import DefaultLayout from "@/layouts/Default";
import GenericPageLayout from "@/layouts/GenericPage";

export default function Home() {
  return (
    <DefaultLayout
      title="Dashboard"
      description="Realm's Dashboard"
      url={process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}
      currentPath="home"
    >
      <GenericPageLayout>
        <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          realm.
        </h3>
        <p className="text-xl text-muted-foreground mt-1">
          A place where Irvan Malik (lappland) probably shitpost his projects or
          something idk, go try and judge yourself.
        </p>
      </GenericPageLayout>
    </DefaultLayout>
  );
}
