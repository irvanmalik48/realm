import DefaultLayout from "@/components/layout/default";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CopyIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Bin() {
  const [text, setText] = useState("");
  const [link, setLink] = useState("placeholder");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/paste/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    });

    const data = await res.json();
    console.log(data);

    setLink(`${window.location.origin}/bin/${data.id}`);
    setFinished(true);
  };

  const handleCopyAndClose = () => {
    navigator.clipboard.writeText(link);
    setFinished(false);
    setLoading(false);
    setText("");
  };

  return (
    <DefaultLayout title="Bin" description="Pastebin-like service.">
      <div className="w-full min-h-screen flex flex-col py-24">
        <section className={cn("w-full max-w-3xl relative p-5", "mx-auto")}>
          <h1 className="text-2xl pt-3 pb-1 w-full text-center font-bold dark:font-semibold">
            Realm&apos;s Bin Service
          </h1>
          <p className="text-center text-foreground/50 pb-2">
            Paste your code and share it to others. No sign-ups required.
          </p>
          <form className="grid grid-cols-1 gap-3 my-5" onSubmit={handleSubmit}>
            <Textarea
              placeholder="Paste your code/text/whatever here."
              className="min-h-[368px]"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              <CopyIcon className="w-4 h-4 mr-2" />
              {loading ? "Creating paste..." : "Create Paste"}
            </Button>
          </form>
          <Accordion type="multiple" defaultValue={["tou"]}>
            <AccordionItem value="tou">
              <AccordionTrigger>
                <div className="flex gap-3 items-center">
                  <InfoCircledIcon className="w-5 h-5" />
                  <h2 className="text-lg font-semibold dark:font-medium">
                    Terms of Use and Privacy Policy
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                <p>
                  The Realm&apos;s Bin Service is a pastebin-like service.
                  That&apos;s it really. For the sake of simplicity, I
                  don&apos;t have any plans (or at least for now) to add any
                  features like syntax highlighting, editing, or any other fancy
                  stuffs. Due to the free nature of Vercel KV&apos;s Hobby plan
                  (which I am using to store the pastes), each paste has a
                  maximum size of 1MB. In order to save space, pastes will be
                  expired and deleted after 14 days.
                </p>
                <p className="mt-3">
                  All pastes are publicly accessible and can be viewed by
                  anyone. Please do not paste any sensitive information such as
                  passwords, API keys, or any other confidential data. I am NOT
                  responsible for any data loss or damages caused by using this
                  service. This service is provided as is and may be terminated
                  at any time without prior notice. I may also delete any pastes
                  at my discretion. By using this service, you agree to these
                  terms.
                </p>
                <p className="mt-3">
                  This service uses zero cookies and does not track you in any
                  way, shape, or form. Tho, you might see some traffics being
                  sent anonymously to Vercel for analytics purposes which is
                  totally unrelated to this service (more like just website
                  analytics, really).
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Dialog open={finished}>
            <DialogContent noClose>
              <DialogHeader>
                <DialogTitle>Success!</DialogTitle>
                <DialogDescription>
                  Your paste has been created successfully.
                </DialogDescription>
              </DialogHeader>
              <p>You can share the link below to others:</p>
              <div className="px-3 py-2 text-sm font-mono border border-border rounded-md overflow-x-scroll">
                {link}
              </div>
              <DialogFooter>
                <Button onClick={handleCopyAndClose} className="w-full">
                  Copy and Close Dialog
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </DefaultLayout>
  );
}
