type ResultProp = {
  id: string;
  text: string;
};

export async function getServerSideProps({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const res = await fetch(
    `${
      process.env.NODE_ENV !== "development"
        ? "https://irvanma.eu.org"
        : "http://localhost:3000"
    }/api/paste/get?id=${params.id}`
  );
  const data: ResultProp = await res.json();

  return { props: { data } };
}

export default function PasteBin({ data }: { data: ResultProp }) {
  return (
    <div className="w-full bg-background text-foreground px-5 py-3 overflow-auto font-mono whitespace-pre">
      {data.text}
    </div>
  );
}
