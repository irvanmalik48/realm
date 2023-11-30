import DefaultLayout from "@/components/layout/default";

export default function CustomNotFound() {
  return (
    <DefaultLayout title="Not Found" description="Page not found.">
      <div className="w-full min-h-screen flex flex-col py-12">
        <section className="w-full max-w-3xl p-5 my-auto mx-auto flex flex-col">
          <h1 className="w-full text-2xl font-bold md:font-semibold text-center">
            404
          </h1>
          <p className="w-full mt-1 dark:text-foreground/70 text-sm text-center">
            The page you're looking for doesn't exist.
          </p>
        </section>
      </div>
    </DefaultLayout>
  );
}
