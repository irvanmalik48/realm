import { CheckIcon, CodeIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import HighlightBin from "@/components/custom/highlight-bin";
import DefaultLayout from "@/components/layout/default";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.text);
    setCopied(true);

    toast({
      title: "Copied!",
      description: "Successfully copied to your clipboard.",
    });

    const timeout = setTimeout(() => {
      setCopied(false);
      clearTimeout(timeout);
    }, 2000);
  };

  return (
    <DefaultLayout title={data.id} description="Your pasted bin.">
      <div className="w-full min-h-screen bg-background text-foreground p-0">
        <div className="w-full flex md:flex-row gap-3 md:gap-0 flex-col justify-center md:justify-between items-center px-5 py-3 border-b border-border">
          <Badge>{data.id}</Badge>
          <div className="grid grid-cols-2 w-full md:w-fit md:grid-cols-none md:flex md:items-center gap-3">
            <Button
              size="sm"
              className="flex items-center gap-2"
              variant="outline"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4" />
                  Copied Bin!
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4" />
                  Copy Bin
                </>
              )}
            </Button>
            <Button asChild size="sm" variant="outline">
              <a
                href={`${
                  process.env.NODE_ENV !== "development"
                    ? "https://irvanma.eu.org"
                    : "http://localhost:3000"
                }/api/paste/get?id=${data.id}&raw=true`}
                className="flex items-center gap-2"
              >
                <CodeIcon className="w-4 h-4" />
                View Raw
              </a>
            </Button>
          </div>
        </div>
        <HighlightBin text={data.text} />
      </div>
    </DefaultLayout>
  );
}
